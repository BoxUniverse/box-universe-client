import React, { useEffect, useState } from 'react';
import Request from '@components/Request';
import queryRequest from '@queries/getRequests.graphql';
import { useQuery } from '@apollo/client';
import useSubscribe from '@hooks/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import { update } from '@features/user/requestSlice';
import { useToast } from '@hooks';

const ListRequest = () => {
  // const [listRequests, setListRequests] = useState<Array<any>>([]);
  const listRequests = useSelector<RootState>((state) => state.requestSlice.friendRequest) as any;
  const user: any = useSelector<RootState>((state) => state.userSlice.user);
  const dispatch = useDispatch<StoreDispatch>();

  const toast = useToast();
  useSubscribe('publish/requests.SEND_REQUEST', (payload) => {
    toast('success', payload.message);
    const { id, email, avatar, name } = payload.userRequest;
    const newRequest = {
      _id: payload._id,
      userRequest: {
        id,
        email,
        avatar,
        name,
      },
      userReceive: {
        id: payload.userReceive,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      isPending: true,
      isAccept: false,
      isReject: false,
    };
    console.log(newRequest);

    dispatch(update([...listRequests, newRequest]));
  });
  const { data, error } = useQuery(queryRequest, {
    variables: {
      request: {
        isPending: true,
        isAccept: false,
        isReject: false,
      },
    },
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      // setListRequests(requests);
      dispatch(update(data.getRequests));
    }
  }, [data]);

  // const listRequests =
  // if (error) {
  //   console.log(error);
  // }
  // if (data) {
  //   console.log(data);
  // }
  //
  return (
    <div className="fixed top-1/6 right-3 z-30 ml-24 h-3/6 px-3 backdrop-blur-md  rounded-xl hidden lg:block">
      <div className="ml-2">
        <div className="uppercase text-xl border-b pb-3  w-24 whitespace-nowrap h-11">
          <span className="text-white">Request</span>
        </div>
      </div>
      <div className="list-friends h-full overflow-scroll">
        {listRequests?.map((request) => (
          <Request key={request._id} data={request} />
        ))}
      </div>
    </div>
  );
};
export default ListRequest;
