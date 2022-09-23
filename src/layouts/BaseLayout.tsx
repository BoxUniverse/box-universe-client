import React from 'react';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

export const BaseLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div>
      <ToastContainer newestOnTop={true} limit={5} />
      {children}
    </div>
  );
};
