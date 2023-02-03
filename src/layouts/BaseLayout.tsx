import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useSubscribe, useToast } from '@hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import userSlice, { update } from '@source/features/user/userSlice';

type Props = {
  children: React.ReactNode;
};

export const BaseLayout: React.FC<Props> = ({ children }: Props) => {
  const toast = useToast();
  const user: any = useSelector<RootState>((state) => state.userSlice.user as any);
  const dispatch = useDispatch<StoreDispatch>();
  useSubscribe('publish/notifications.SEND_NOTIFICATION', (payload) => {
    toast(payload.type, payload.message);
    const { userReceive } = payload;
    dispatch(
      update({
        ...user,
        friends: [...user.friends, userReceive],
      }),
    );
  });
  return (
    <div>
      <ToastContainer newestOnTop={true} limit={5} />
      {children}
    </div>
  );
};
