import React, { useEffect, useState } from 'react';
import { Avatar, Badge } from '@mui/material';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import Link from 'next/link';
import acceptRequest from '@mutations/acceptRequest.graphql';
import rejectRequest from '@mutations/rejectRequest.graphql';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import usePublish from '@hooks/usePublish';
import { useToast } from '@hooks';

import useSubscribe from '@hooks/useSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import { update } from '@source/features/user/userSlice';
import getProfile from '@queries/getProfile.graphql';

type Request = {
  userRequest: {
    avatar: string;
    name: string;
    id: string;
  };
  userReceive: {
    id: string;
  };
};

type Props = {
  data: Request;
};

const Request = ({ data }: Props) => {
  const [isRemove, setRemove] = useState<boolean>(false);
  const [requestor, setRequestor] = useState<any>({});

  let [aRequest, { error: aError, data: aData }] = useMutation(acceptRequest);

  let [rRequest, { error: rError, data: rData }] = useMutation(rejectRequest);
  const publish = usePublish();

  const dispatch = useDispatch<StoreDispatch>();
  // // const [_getProfile, { data: profile }] = useLazyQuery(getProfile);
  const user = useSelector<RootState>((state) => state.userSlice.user) as any;

  const handleRejectRequest = () => {
    // NOTE: mutation reject request
    rRequest({
      variables: {
        request: {
          userRequest: data.userRequest.id,
          userReceive: data.userReceive.id,
        },
      },
    });

    setRemove(true);
  };
  useEffect(() => {
    if (aData) {
      publish('subscribe/notifications.SEND_NOTIFICATION', {
        request: { ...aData.acceptRequest, type: 'accepted' },
      });
      const { userRequest } = aData.acceptRequest;
      console.log('aData', aData);

      const requestor = {
        id: userRequest.id,
        name: userRequest.name,
        avatar: userRequest.avatar,
      };

      dispatch(
        update({
          ...user,
          friends: [...user.friends, { ...requestor }],
        }),
      );
    }
  }, [aData]);
  if (rData) {
    publish('subscribe/notifications.SEND_NOTIFICATION', {
      request: { ...rData.rejectRequest, type: 'rejected' },
    });
    // publish('subscribe/notifications.SEND_NOTIFICATION', { ...aData });
  }

  const handleAcceptRequest = () => {
    // NOTE: mutation accept request
    aRequest({
      variables: {
        request: {
          userRequest: data.userRequest.id,
          userReceive: data.userReceive.id,
        },
      },
    });
    // TODO: emit event to userRequest and show notification

    // dispatch(update({}));
    setRemove(true);
  };

  return (
    !isRemove && (
      <div className="friend mt-7 mb-3 flex flex-row justify-center items-center text-white w-full">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          color="success"
          variant="dot">
          <Avatar alt={data.userRequest.name} src={data.userRequest.avatar} />
        </Badge>
        <Link className="text-white ml-5 w-52" href={`/profile/${data.userRequest.id}`}>
          {data.userRequest.name}
        </Link>
        <div className="relative" onClick={handleAcceptRequest}>
          <IoCheckmarkOutline size={25} className="text-green-500 ml-10 cursor-pointer" />
          <IoCheckmarkOutline
            size={25}
            className="text-green-500 ml-10 cursor-pointer absolute blur-sm top-0"
          />
        </div>
        <div className="relative" onClick={handleRejectRequest}>
          <IoCloseOutline size={25} className="text-red-500 ml-3 cursor-pointer" />
          <IoCloseOutline
            size={25}
            className="text-red-500 ml-3 cursor-pointer absolute blur-sm top-0"
          />
        </div>
      </div>
    )
  );
};

export default Request;
