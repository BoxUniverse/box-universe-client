import { Avatar, Badge, Tooltip } from '@mui/material';

import avatar from '@images/logo.png';
import React from 'react';
import {
  IoCallOutline,
  IoCopyOutline,
  IoMailOutline,
  IoPersonAdd,
  IoPersonOutline,
} from 'react-icons/io5';
import Input from '@components/Input';
import useToast from '@hooks/useToast';

type Props = {
  data: any;
  me: boolean;
};

const ProfileInformation = ({ data, me }: Props) => {
  const toast = useToast();
  return (
    <div className="flex justify-center flex-col items-center">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          !me && (
            <IoPersonAdd
              size={20}
              className="text-lg w-9 p-2.5 h-9 rounded-full bg-purple-500 cursor-pointer"
            />
          )
        }>
        <Avatar alt="Travis Howard" src={avatar.src} sx={{ width: 80, height: 80 }} />
      </Badge>

      <div className="flex flex-row justify-center items-center mt-5 ">
        <span className="text-xl text-purple-500 font-bold mr-2 select-none">
          {data.name.toUpperCase()}
        </span>
        <Tooltip title="Copy name">
          <IoCopyOutline
            size={20}
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(data.name.toUpperCase());
              toast('success', 'Copy successfull');
            }}
          />
        </Tooltip>
      </div>

      <div className="divider h-0.5 mt-5 text-purple-500 bg-purple-500 w-full"></div>
      <div className="form-information pt-5 [&>div.group-form]:pb-5">
        <div className="group-form flex flex-col justify-center">
          <label className="uppercase">name</label>
          <Input
            value={data.name}
            width="w-full"
            height="h-12"
            disabled
            icons={
              <IoPersonOutline
                color="white"
                className="absolute top-1/2 transform -translate-y-1/2 ml-3 "
                size={20}
              />
            }
          />
        </div>
        <div className="group-form flex flex-col justify-center">
          <label className="uppercase">email</label>
          <Input
            value={data.email}
            width="w-full"
            height="h-12"
            disabled
            icons={
              <IoMailOutline
                color="white"
                className="absolute top-1/2 transform -translate-y-1/2 ml-3 "
                size={20}
              />
            }
          />
        </div>
        <div className="group-form flex flex-col justify-center">
          <label className="uppercase">Phone number</label>
          <Input
            value={data.email}
            width="w-full"
            height="h-12"
            disabled
            icons={
              <IoCallOutline
                color="white"
                className="absolute top-1/2 transform -translate-y-1/2 ml-3 "
                size={20}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
export default React.memo(ProfileInformation);
