import { useSocket } from '@contexts/SocketContext';
import { useEffect } from 'react';

type FunctionHandler = (...args: any) => any;

const useSubscribe = (eventName: string, handler: FunctionHandler) => {
  const socket = useSocket();

  useEffect(() => {
    socket?.on(eventName, handler);

    return () => {
      socket?.off(eventName, handler);
    };
  }, [eventName, handler, socket]);
};

export default useSubscribe;
