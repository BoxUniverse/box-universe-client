import React from 'react';
import logo from '@images/logo.png';
import Image from 'next/image';
import { SearchBar } from '@components/SearchBar';

type Props = {
  page: string;
};
export const Topbar = (props: Props) => {
  const { page } = props;
  return (
    <div className="fixed text-white left-2 top-0 h-1/6 w-full flex flex-row justify-between pr-5  before:absolute before:backdrop-blur-md before:top-0 before:left-0 before:-z-10 before:w-full before:h-full z-50">
      <div className="flex flex-row">
        <div className="flex  w-20 h-full justify-center items-center ">
          <Image src={logo.src} alt="logo" width={80} height={80} layout="intrinsic" />
        </div>
        <div className="flex items-center tracking-widest uppercase ml-2 text-lg font-bold">
          <span className="text-purple-500 pl-2 bg-white rounded-l-md">Box</span>
          <span className="text-white bg-purple-500 pr-2 rounded-r-md">Universe</span>
        </div>
      </div>
      <div className="flex items-center ">
        <span className="tracking-widest text-xl uppercase">{page}</span>
      </div>
      <SearchBar />
    </div>
  );
};
