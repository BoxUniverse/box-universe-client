import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { getSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const getSocket = async () => {
  const session = await getSession();

  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    query: {
      session: session?.user?._id,
    },
  });

  socket.on('connect', () => {
    setCookie('socket', socket.id);
  });
  socket.on('disconnect', () => {});
  return socket;
};

export const SocketContext = createContext<any>(async () => {
  return await getSocket();
});
type Props = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket>(null);

  const _getSocket = async () => {
    setSocket(await getSocket());
  };

  useEffect(() => {
    _getSocket();
  }, []);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
export const useSocket = () => useContext(SocketContext);
