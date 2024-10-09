import React, { useState } from 'react';
import useWebSocketSubscription from './useWebSocketSubscription';

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);

  useWebSocketSubscription('chat', (value) => {
    setMessages((prevMessages) => [...prevMessages, value]);
  });

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebSocketComponent;
