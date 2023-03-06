import { useSocket } from '@contexts';

// WARNING: subscribe multiple event
const usePublish = (): ((...args: any) => any) => {
  const socket = useSocket();

  return (eventName: string, payload: unknown) => {
    socket.emit(eventName, payload);
  };
};
export default usePublish

