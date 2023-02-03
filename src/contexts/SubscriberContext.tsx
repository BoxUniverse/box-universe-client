import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const SubscriberContext = createContext<{ data: unknown }>({
  data: {},
});

type Props = {
  children: ReactNode;
  _data: unknown;
};

export const SubscriberProvider = ({ children }: Props, data: unknown) => {
  const [_data, setData] = useState<unknown>({ data });

  useEffect(() => {
    setData(_data);
  }, [_data]);
  return (
    <SubscriberContext.Provider value={{ data: _data }}>{children}</SubscriberContext.Provider>
  );
};
export const useSocket = () => useContext(SubscriberContext);
