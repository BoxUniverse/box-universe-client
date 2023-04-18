import { useMutation } from '@apollo/client';
import { Input } from '@components';
import { usePublish, useToast } from '@hooks';
import { Avatar, Badge, Tooltip } from '@mui/material';
import { update } from '@src/features/user/userSlice';
import { UNFRIEND, UPLOAD_AVATAR } from '@src/graphql';
import { RootState, StoreDispatch } from '@stores/app';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  IoBanSharp,
  IoCallOutline,
  IoCopyOutline,
  IoImagesOutline,
  IoMailOutline,
  IoPersonAdd,
  IoPersonOutline,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  data: any;
  me: boolean;
};

const ProfileInformation = ({ data, me }: Props) => {
  const toast = useToast();
  const inputFileRef = useRef<HTMLInputElement>();
  const [upload, { loading }] = useMutation(UPLOAD_AVATAR);
  const [isFriend, setFriend] = useState(false);

  const user = useSelector<RootState>((state) => state.userSlice.user) as any;

  useEffect(() => {
    const { friends } = user;
    const status = friends?.some((friend) => friend.id === data.id);
    setFriend(status);
  }, [user, data]);

  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [unfriend, { data: resultUnfriend }] = useMutation(UNFRIEND);

  const dispatch = useDispatch<StoreDispatch>();
  const { data: session } = useSession();

  const publish = usePublish();

  const requestAddFriend = () => {
    publish('subscribe/requests.SEND_REQUEST', {
      friendId: data.id,
      userId: session?.user?._id,
    });
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
  useEffect(() => {
    if (resultUnfriend) {
      setFriend(false);

      const updatedFriends = user.friends.filter((friend) => friend.id !== data.id);
      dispatch(
        update({
          ...user,
          friends: [...updatedFriends],
        }),
      );
      toast('success', `You was unfriend ${data.name} !!`);
      publish('subscribe/profiles.unfriend', {
        friendId: data.id,
        userId: session?.user?._id,
      });
    }
  }, [resultUnfriend]);
  const handleBlock = () => {
    void unfriend({
      variables: {
        friend: {
          userId: session?.user?._id,
          friendId: data.id,
        },
      },
    });
  };

  const handleChangeInputFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    const id = session.user._id;
    const reader = new FileReader();

    upload({
      variables: {
        file: file,
        id,
      },
      // errorPolicy: 'all',copy
    });

    reader.onload = (event) => {
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
          <>
            <Tooltip title={!me ? (isFriend ? 'Block' : 'Add Friend') : 'Change Avatar'}>
              <div
                className="w-10 p-2.5 h-10 rounded-full bg-purple-500 border-2 flex items-center justify-center"
                onClick={!me ? (isFriend ? handleBlock : requestAddFriend) : handleChangeAvatar}>
                {!me ? (
                  <>
                    {!isFriend ? (
                      <IoPersonAdd size={20} className="text-lg w-full h-full cursor-pointer" />
                    ) : (
                      <IoBanSharp size={20} className="text-lg w-full h-full cursor-pointer" />
                    )}
                  </>
                ) : (
                  <>
                    <IoImagesOutline className="text-lg w-full h-full cursor-pointer" size={20} />
                  </>
                )}
              </div>
            </Tooltip>
          </>
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
          <>
            <IoCopyOutline
              size={20}
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(data.name.toUpperCase());
                toast('success', 'Copy successfull');
              }}
            />
          </>
        </Tooltip>
      </div>

      <div className="divider h-0.5 mt-5 text-purple-500 bg-purple-500 w-full hidden sm:block "></div>
      <div className="form-information mt-10  sm:mt-0 pt-5 [&>div.group-form]:pb-5 w-full flex flex-col justify-center items-center 2xl:w-4/12">
        <div className="group-form flex flex-col justify-center gap-2">
          <label className="uppercase">name</label>
          <Input
            border="purple"
            value={data.name}
            width="w-72"
            height="h-12"
            disabled
            icons={<IoPersonOutline color="white" size={20} />}
          />
        </div>
        <div className="group-form flex flex-col justify-center gap-2">
          <label className="uppercase">email</label>
          <Input
            border="purple"
            value={data.email}
            width="w-72"
            height="h-12"
            disabled
            icons={<IoMailOutline color="white" size={20} />}
          />
        </div>
        <div className="group-form flex flex-col justify-center gap-2">
          <label className="uppercase">Phone number</label>
          <Input
            border="purple"
            value={data.email}
            width="w-72"
            height="h-12"
            disabled
            icons={<IoCallOutline color="white" size={20} />}
          />
        </div>
      </div>
    </div>
  );
};
export default React.memo(ProfileInformation);
