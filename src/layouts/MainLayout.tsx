import { useLazyQuery, useQuery } from '@apollo/client';
import {
  ListFriend,
  ListFriendChat,
  ListRequest,
  ModalCallVideo,
  ModalComment,
  ModalListFriend,
  ModalViewImage,
  Sidebar,
  Topbar,
} from '@components';
import { useSubscribe, useToast } from '@hooks';
import bg from '@images/bg.png';
import { BaseLayout } from '@layouts/BaseLayout';
import { changePage } from '@src/features/app/appSlice';
import { updateTypeConversation } from '@src/features/user/conversationSlice';
import { pushMessages } from '@src/features/user/messageSlice';
import { updateRequest } from '@src/features/user/requestSlice';
import { update } from '@src/features/user/userSlice';
import { GET_PROFILE, GET_REQUESTS } from '@src/graphql';
import { RootState, StoreDispatch } from '@stores/app';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type Props = {
  children: ReactNode;
};
const MainLayout = (props: Props) => {
  const router = useRouter();
  const page = useSelector<RootState>((state) => state.appSlice.page) as string;
  const dispatch = useDispatch<StoreDispatch>();

  const listRequests = useSelector<RootState>((state) => state.requestSlice.friendRequest) as any;
  const messages = useSelector<RootState>((state) => state.messageSlice.messages) as any;
  const user = useSelector<RootState>((state) => state.userSlice.user) as any;
  const { currentConversation, isGroup }: any = useSelector<RootState>(
    (state) => state.conversationSlice as any,
  );

  const { modalViewImage, modalListFriend, modalCallVideo, modalComment }: any =
    useSelector<RootState>((state) => state.modalSlice as any);
  const { children } = props;

  const toast = useToast();
  const notify = useToast({
    hideProgressBar: false,
    autoClose: 5000,
  });

  useEffect(() => {
    const [, name] = router.pathname.split('/');
    if (name === '') dispatch(changePage('home'));
    else dispatch(changePage(name));
  });
  useSubscribe('publish/profiles.unfriend', (payload) => {
    const updatedFriend = user.friends.filter((friend) => friend.id !== payload.friendId);
    dispatch(
      update({
        friends: [...updatedFriend],
      }),
    );
  });
  const _notifyMessage = (message: string, avatarSender: string) => {
    notify(
      'avatar',
      message.length >= 14 ? `Message: ${message.slice(0, 14)}...` : `Message: ${message}`,
      avatarSender,
    );
  };

  useSubscribe('publish/messages.SEND', (payload) => {
    const newMessage = {
      _id: new Date().getTime(),
      sender: payload.sender,
      message: payload.message,
      createdAt: payload.createdAt,
    };

    // dispatch(pushMessages([...messages, newMessage]));

    if (page !== 'chat' || payload.conversation._id !== currentConversation) {
      _notifyMessage(payload.message, payload.sender.avatar);
    }
    if (payload.conversation._id === currentConversation) {
      dispatch(pushMessages([...messages, newMessage]));
    }
  });

  useSubscribe('publish/conversation.addMember', (payload) => {
    const { conversation, profile, invitor } = payload;

    if (user.id === profile.id) toast('success', 'You has been invited to a group !!');
    if (currentConversation === conversation._id && invitor !== user.id) {
      if (!isGroup) {
        dispatch(updateTypeConversation(true));
      } else toast('success', 'A new person has just been invited to a group !');
    }
  });

  // const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  //   const result = fetch(b64Data)
  //     .then((r) => r.blob())
  //     .then((blobData) => URL.createObjectURL(blobData));
  //   return result;
  //   // alert(b64Data);
  // };

  const bufferToBlob = (buffers, type) => {
    return URL.createObjectURL(new Blob([new Uint8Array(buffers).buffer], { type }));
    // alert(b64Data);
  };

  useSubscribe('publish/messages.SEND_FILES', async (payload) => {
    const result = payload.files.map((file) => {
      return { url: bufferToBlob(file.file, file.type), type: file.type };
    });

    // const files = await Promise.all(result);

    const newMessage = {
      _id: new Date().getTime(),
      sender: payload.sender,
      files: [...result],
      createdAt: payload.createdAt,
    };

    // dispatch(pushMessages([...messages, newMessage]));

    if (payload.sender.id !== user.id) {
      if (page !== 'chat' || payload.conversation._id !== currentConversation) {
        // _notifyMessage(payload.message, payload.sender.avatar);
      }
      if (payload.conversation._id === currentConversation) {
        dispatch(pushMessages([...messages, newMessage]));
      }
    }
  });

  const { data: session } = useSession();

  const [getProfile, { data }] = useLazyQuery(GET_PROFILE);

  const { data: dataRequest } = useQuery(GET_REQUESTS, {
    variables: {
      request: {
        isPending: true,
        isAccept: false,
        isReject: false,
      },
    },
  });

  useEffect(() => {
    if (dataRequest) {
      // setListRequests(requests);
      dispatch(updateRequest(dataRequest.getRequests));
    }
  }, [dataRequest]);

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
    dispatch(updateRequest([...listRequests, newRequest]));
  });

  useEffect(() => {
    if (data) dispatch(update(data.getProfile));
  }, [data]);

  return (
    <>
      {modalViewImage.isOpen && <ModalViewImage />}
      {modalListFriend.isOpen && <ModalListFriend />}
      {modalComment.isOpen && <ModalComment />}
      {modalCallVideo.isOpen && <ModalCallVideo />}

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
              <div className="w-full flex justify-center relative">
                <div className="w-7/12">{children}</div>
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
