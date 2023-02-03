import React from 'react';
import { Avatar, Badge } from '@mui/material';
import avatar from '@images/logo.png';
import { IoBanOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

type Props = {
  info: any;
};
const Friend = ({ info }: Props) => {
  const router = useRouter();
  const seeProfile = () => {
    router.push(`/profile/${info.id}`);
  };

  return (
    <div className="friend mt-7 mb-3 flex flex-row items-center text-white">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        color="success"
        variant="dot">
        <Avatar alt="Remy Sharp" src={info.avatar} />
      </Badge>
      <div
        className="text-white ml-5 w-32 whitespace-nowrap overflow-hidden cursor-pointer "
        onClick={seeProfile}>
        {info.name.length > 10 ? `${info.name.slice(0, 10)} .............` : info.name}
      </div>
      <div className="relative">
        <IoChatbubbleEllipsesOutline size={25} className="text-purple-500 ml-10 cursor-pointer" />
        <IoChatbubbleEllipsesOutline
          size={25}
          className="text-purple-500 ml-10 cursor-pointer absolute blur-sm top-0"
        />
      </div>

      <div className="relative">
        <IoBanOutline size={25} className="text-red-500 ml-3 cursor-pointer" />
        <IoBanOutline
          size={25}
          className="text-red-500 ml-3 cursor-pointer absolute blur-sm top-0"
        />
      </div>
    </div>
  );
};

export default Friend;
