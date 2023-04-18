import { useSocket } from '@contexts';

type RequiredPayloadNotification = {
  type: 'newsfeed' | 'message';
  message: any;
  action: string;
};
type ReceiverNotification = 'post' | 'conversation';
type PayloadNotification = Required<RequiredPayloadNotification> &
  Partial<Record<ReceiverNotification, string>>;

const useNotification = () => {
  const socket = useSocket();

  return {
    notify: (nameNotification: string, payload: PayloadNotification) => {
      socket.emit(nameNotification, payload);
    },
  };
};

export default useNotification;
