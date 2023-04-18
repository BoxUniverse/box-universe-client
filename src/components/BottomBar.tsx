import React from 'react';
import Link from 'next/link';
import { ItemSidebar } from '@src/components/index';

import {
  IoChatboxOutline,
  IoExitOutline,
  IoHomeOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import logo from '@images/logo.png';
import Image from 'next/image';
import { updateModal } from '@features/app';
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '@stores/app';

type Props = {
  page: string;
};
const BottomBar = ({ page }: Props) => {
  const dispatch = useDispatch<StoreDispatch>();
  return (
    <div
      className={
        'fixed h-20 bottom-0 w-full left-0 border border-gray-500  z-50 flex flex-row justify-between items-center rounded-tl-xl rounded-tr-xl backdrop-blur-lg'
      }>
      <div
        className={
          'left flex flex-row justify-between gap-2 w-4/12 h-20 items-center pl-2 rounded-tl-xl'
        }>
        <div className="cursor-pointer">
          <Link href="/chat" passHref>
            <ItemSidebar>
              <IoChatboxOutline
                size={25}
                className={`${page === 'chat' ? 'text-purple-500' : 'text-white'}`}
              />
            </ItemSidebar>
          </Link>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            page === 'home'
              ? dispatch(
                  updateModal({
                    name: 'modalListFriend',
                    isOpen: true,
                  } as any),
                )
              : dispatch(
                  updateModal({
                    name: 'modalListConversation',
                    isOpen: true,
                  } as any),
                );
          }}>
          <ItemSidebar>
            <IoPeopleOutline size={25} className="text-white" />
          </ItemSidebar>
        </div>

        <div className="cursor-pointer">
          <Link href="/notifications" passHref>
            <ItemSidebar>
              <IoNotificationsOutline size={25} className="text-white" />
            </ItemSidebar>
          </Link>
        </div>
      </div>

      <div className={'center flex items-center justify-center -translate-y-1/2 w-4/12'}>
        <Link href="/" passHref>
          <div
            className={
              'rounded-full  w-20 h-20 flex justify-center border-4 items-center bg-purple-500 cursor-pointer box-border'
            }>
            <Image src={logo.src} className="" alt="logo" width={60} height={60} />
          </div>
        </Link>
      </div>

      <div
        className={
          'right flex flex-row justify-between gap-2 w-4/12  h-20 items-center pr-2 rounded-tr-xl'
        }>
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(
              updateModal({
                name: 'modalListRequest',
                isOpen: true,
              } as any),
            );
          }}>
          <ItemSidebar>
            <IoPersonAddOutline size={25} className="text-white" />
          </ItemSidebar>
        </div>
        <div className="cursor-pointer">
          <Link href="/settings" passHref>
            <ItemSidebar>
              <IoSettingsOutline
                size={25}
                className={`${page === 'settings' ? 'text-purple-500' : 'text-white'}`}
              />
            </ItemSidebar>
          </Link>
        </div>
        <div className="cursor-pointer">
          <Link href="/logout" passHref>
            <ItemSidebar>
              <IoExitOutline size={25} className="text-white" />
            </ItemSidebar>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
