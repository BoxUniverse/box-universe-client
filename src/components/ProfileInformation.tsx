import { Avatar, Badge, Tooltip } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  IoCallOutline,
  IoCopyOutline,
  IoImagesOutline,
  IoMailOutline,
  IoPersonAdd,
  IoPersonOutline,
} from 'react-icons/io5';
import Input from '@components/Input';
import useToast from '@hooks/useToast';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import uploadAvatar from '@mutations/uploadAvatar.graphql';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import { update } from '@features/user/userSlice';

import queryMe from '@queries/me.graphql';

type Props = {
  data: any;
  me: boolean;
};

const ProfileInformation = ({ data, me }: Props) => {
  const toast = useToast();
  const inputFileRef = useRef<HTMLInputElement>();
  const [upload, { data: _file, error, loading }] = useMutation(uploadAvatar);
  const [isUpdate, setUpdate] = useState<boolean>(false);

  const user = useSelector<RootState>((state) => state.userSlice.user) as any;

  const [avatar, setAvatar] = useState<string>(user.avatar);
  // alert(avatar);

  const dispatch = useDispatch<StoreDispatch>();
  const { data: session } = useSession();

  const handleAddFriend = () => {
    alert('x');
  };

  useEffect(() => {
    if (loading) {
      dispatch(
        update({
          ...data,
          avatar: avatar,
        }),
      );
    }
  }, [avatar]);

  const handleChangeAvatar = () => {
    inputFileRef.current.click();
  };

  const handleChangeInputFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const id = session.user._id;
    const reader = new FileReader();

    upload({
      variables: {
        file,
        id,
      },
      errorPolicy: 'all',
    });

    reader.onload = (event) => {
      console.log(event.target.result);
      setAvatar(() => event.target.result.toString());
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex justify-center flex-col items-center">
      <input
        type="file"
        name="avatar"
        id="avatar"
        className="hidden"
        ref={inputFileRef}
        accept=".png,.jpg,.jpeg"
        onChange={handleChangeInputFile}
      />
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Tooltip title={!me ? 'Add friend' : 'Change Avatar'}>
            <div
              className="w-10 p-2.5 h-10 rounded-full bg-purple-500 border-2 flex items-center justify-center"
              onClick={!me ? handleAddFriend : handleChangeAvatar}>
              {!me ? (
                <IoPersonAdd size={20} className="text-lg w-full h-full cursor-pointer" />
              ) : (
                <IoImagesOutline className="text-lg w-full h-full cursor-pointer" size={20} />
              )}
            </div>
          </Tooltip>
        }>
        <Avatar
          alt="Travis Howard"
          className="border-2"
          src={!me ? data.avatar : avatar}
          sx={{ width: 100, height: 100 }}
        />
      </Badge>

      <div className="flex flex-row justify-center items-center mt-5 ">
        <span className="text-xl text-purple-500 font-bold mr-2 select-none">
          {data?.name?.toUpperCase()}
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
