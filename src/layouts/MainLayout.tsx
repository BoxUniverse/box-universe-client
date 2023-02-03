import React, { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import { useRouter } from 'next/router';
import { Topbar } from '@components/Topbar';
import bg from '@images/bg.png';
import ListFriend from '@components/ListFriend';
import ListRequest from '@components/ListRequest';
import { changePage } from '@features/app/appSlice';
import ListFriendChat from '@components/ListFriendChat';
import Image from 'next/image';
import Sidebar from '@components/Sidebar';
import { BaseLayout } from '@layouts/BaseLayout';
import { useSession } from 'next-auth/react';
import { useLazyQuery } from '@apollo/client';

import _getProfile from '@queries/getProfile.graphql';
import { update } from '@source/features/user/userSlice';
import useSubscribe from '@hooks/useSubscribe';
type Props = {
  children: ReactNode;
};
const MainLayout = (props: Props) => {
  const router = useRouter();
  const page = useSelector<RootState>((state) => state.appSlice.page) as string;
  const dispatch = useDispatch<StoreDispatch>();

  const user = useSelector<RootState>((state) => state.userSlice.user) as any;
  const { children } = props;

  useEffect(() => {
    const [, name] = router.pathname.split('/');
    if (name === '') dispatch(changePage('home'));
    else dispatch(changePage(name));
  });
  useSubscribe('publish/profiles.unfriend', (payload) => {
    const updatedFriend = user.friends.filter((friend) => friend.id !== payload.friendId);
    dispatch(
      update({
        ...user,
        friends: [...updatedFriend],
      }),
    );
  });

  const { data: session, status } = useSession();

  const [getProfile, { data, error }] = useLazyQuery(_getProfile);

  useEffect(() => {
    if (session?.user) {
      getProfile({
        variables: {
          profileInput: {
            id: session.user._id,
          },
        },
      });
    }
  }, [session, getProfile]);

  useEffect(() => {
    if (data) dispatch(update(data.getProfile));
  }, [data]);

  return (
    <>
      <BaseLayout>
        <Image
          id="bg"
          className="fixed top-0 left-0 min-w-full min-h-full"
          src={bg.src}
          alt=""
          fill
        />
        <div className="wrapLayout flex h-full w-full">
          <Topbar page={page} />
          <Sidebar page={page} />
          {page === 'home' && <ListFriend />}
          {page === 'profile' && <ListFriend />}
          {page === 'chat' && <ListFriendChat />}
          <div className="mainContent w-full  text-white h-5/6 absolute bottom-0">
            <div className="ml-24  h-full mt-0 flex flex-row">
              <div className="w-full flex justify-center">
                <div className="w-6/12">{children}</div>
              </div>
            </div>
          </div>
          {page === 'home' && <ListRequest />}
          {page === 'profile' && <ListRequest />}
        </div>
      </BaseLayout>
    </>
  );
};
export default React.memo(MainLayout);
