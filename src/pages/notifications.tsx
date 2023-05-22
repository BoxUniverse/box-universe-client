import React, { ReactElement, useEffect } from 'react';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from './_app';
import withAuth from '@middlewares/auth';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFICATIONS } from '@queries';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/app';
import { GetServerSideProps } from 'next';
import attachToken from '@src/injection/attachToken';
import { Notification } from '@components';
import { COMMENT_ADDED } from '@src/graphql';
import { useSubscribe } from '@hooks';

const Notifications: NextPageWithLayout = () => {
  const user: any = useSelector<RootState>((state) => state.userSlice.user);
  const { data, error, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      profile: user.id,
    },
  });
  useSubscribe('notifications.SEND_NOTIFICATION', (payload) => {
    alert('income');
    refetch({
      profile: user.id,
    }).then((result) => console.log(result));
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);
  return (
    <div className={'h-full'}>
      <div>
        <div className={'uppercase w-16 border-b pb-2 font-semibold text-xl '}>newsfeed</div>
        <div className={'flex flex-col mt-3 overflow-scroll h-80'}>
          {data?.getNotifications?.map((notification) => (
            <Notification key={notification._id} info={notification} />
          ))}
        </div>
      </div>
      <div>
        <div className={'uppercase w-16 border-b pb-2 font-semibold text-xl mt-3 '}>
          conversations
        </div>
        <div className={'flex flex-col mt-3 overflow-scroll h-80 '}>
          {data?.getNotifications?.map((notification) => (
            <Notification key={notification._id} info={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

Notifications.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = attachToken(() => ({
  props: {},
}));

export default Notifications;
