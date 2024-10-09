import { create } from 'zustand';

const useWebSocketStore = create((set) => ({
  subscribers: {},
  socket: null,
  connect: () => {
    const socket = new WebSocket('ws://localhost:8080/web');
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      useWebSocketStore.getState().dispatchMessage(message);
    };
    set({ socket });
  },
  sendMessage: (message) => {
    const { socket } = useWebSocketStore.getState();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  },
  addSubscriber: (type, callback) => set((state) => {
    const newSubscribers = { ...state.subscribers };
    if (!newSubscribers[type]) {
      newSubscribers[type] = [];
    }
    newSubscribers[type].push(callback);
    return { subscribers: newSubscribers };
  }),
  removeSubscriber: (type, callback) => set((state) => {
    const newSubscribers = { ...state.subscribers };
    if (newSubscribers[type]) {
      newSubscribers[type] = newSubscribers[type].filter(cb => cb !== callback);
    }
    return { subscribers: newSubscribers };
  }),
  dispatchMessage: (message) => set((state) => {
    const { type, value } = message;
    if (state.subscribers[type]) {
      state.subscribers[type].forEach(callback => callback(value));
    }
  }),
}));

// Ensure WebSocket connection is established
if (!useWebSocketStore.getState().socket) {
  useWebSocketStore.getState().connect();
}

export default useWebSocketStore;
