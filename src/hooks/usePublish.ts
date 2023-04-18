import { useSocket } from '@contexts';

type OptionsNotification = {
  notificationName?: string;
  payloadNotification?: any;
  // eventName: string;
  // payloadPublish: string;
};

// WARNING: subscribe multiple event
const usePublish = (): ((eventName, payload, options?: OptionsNotification) => any) => {
  const socket = useSocket();

  return (eventName, payload, options?: OptionsNotification) => {
    socket.emit(eventName, payload);
    if (options?.notificationName) {
      socket.emit(options?.notificationName, options?.payloadNotification);
    }
  };
};
export default usePublish;
