import { BottomBar, ItemSidebar } from '@components';
import { usePublish } from '@hooks';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import {
  IoChatboxOutline,
  IoExitOutline,
  IoHomeOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { Tooltip } from '@mui/material';

type Props = {
  page: string;
};

const Sidebar = (props: Props) => {
  const { page } = props;
  const publish = usePublish();

  const logout = () => {
    publish('logout', null, {});
    signOut({ callbackUrl: '/auth/login', redirect: true });
  };
  return (
    <>
      <div className="justify-center items-center h-5/6 fixed bottom-1 xs:left-1 lg:left-2 left-0 z-50 w-20 hidden sm:flex">
        <div className="w-20 h-full flex flex-col justify-between sidebar sidebar-blur backdrop-blur-lg rounded-xl">
          <div>
            <div
              className={`item flex justify-center relative items-center ${
                page === 'home' && 'active'
              } `}>
              <div className="rounded-full p-3 glass-blur cursor-pointer icon-item">
                <Tooltip title="Home" placement={'right-end'} arrow>
                  <Link href="/" passHref>
                    <ItemSidebar>
                      <IoHomeOutline size={20} className="text-white" />
                    </ItemSidebar>
                  </Link>
                </Tooltip>
              </div>
              <div className="dot rounded-full w-1 h-1  bg-green-500 absolute right-2 top-1/2" />
            </div>
            <div
              className={`item flex justify-center relative items-center ${
                page === 'chat' && 'active'
              } `}>
              <div className="rounded-full p-3 glass-blur cursor-pointer icon-item">
                <Tooltip title="Chat" placement={'right-end'} arrow>
                  <Link href="/chat" passHref>
                    <ItemSidebar>
                      <IoChatboxOutline size={20} className="text-white" />
                    </ItemSidebar>
                  </Link>
                </Tooltip>
              </div>
              <div className="dot rounded-full w-1 h-1  bg-green-500 absolute right-2 top-1/2" />
            </div>
            <div
              className={`item flex justify-center relative items-center ${
                page === 'notifications' && 'active'
              } `}>
              <div className="rounded-full p-3 glass-blur cursor-pointer icon-item">
                <Tooltip title="Notification" placement={'right-end'} arrow>
                  <Link href="/notifications" passHref>
                    <ItemSidebar>
                      <IoNotificationsOutline size={20} className="text-white" />
                    </ItemSidebar>
                  </Link>
                </Tooltip>
              </div>
              <div className="dot rounded-full w-1 h-1  bg-green-500 absolute right-2 top-1/2" />
            </div>
          </div>
          <div>
            <div
              className={`item flex justify-center relative items-center ${
                page === 'settings' && 'active'
              } `}>
              <div className="rounded-full p-3 glass-blur cursor-pointer icon-item">
                <Tooltip title="Settings" placement={'right-end'} arrow>
                  <Link href="/settings" passHref>
                    <ItemSidebar>
                      <IoSettingsOutline size={20} className="text-white" />
                    </ItemSidebar>
                  </Link>
                </Tooltip>
              </div>
              <div className="dot rounded-full w-1 h-1  bg-green-500 absolute right-2 top-1/2" />
            </div>

            <Tooltip title="Sign out" placement={'right-end'} arrow>
              <div className="item flex justify-center relative items-center ">
                <button
                  onClick={() => {
                    logout();
                  }}>
                  <div className="rounded-full p-3 glass-blur cursor-pointer icon-item">
                    <ItemSidebar>
                      <IoExitOutline size={20} className="text-white" />
                    </ItemSidebar>
                  </div>
                </button>
                <div className="dot rounded-full w-1 h-1  bg-green-500 absolute right-2 top-1/2" />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={'flex sm:hidden'}>
        <BottomBar page={page} />
      </div>
    </>
  );
};

export default React.memo(Sidebar);
