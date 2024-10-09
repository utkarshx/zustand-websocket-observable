import { useEffect } from 'react';
import useWebSocketStore from './websocket';

function useWebSocketSubscription(type, callback) {
  useEffect(() => {
    useWebSocketStore.getState().addSubscriber(type, callback);

    return () => {
      useWebSocketStore.getState().removeSubscriber(type, callback);
    };
  }, [type, callback]);
}

export default useWebSocketSubscription;
