import { useLazyQuery, useMutation } from '@apollo/client';
import { Conversation, Input, ListFriendChat, Modal } from '@components';
import { usePublish } from '@hooks';
import { Avatar } from '@mui/material';
import {
  ADD_MEMBER_CONVERSATION,
  GET_CONVERSATION_BY_PROFILE_ID,
  GET_LIST_FRIEND_NOT_IN_CONVERSATION,
} from '@src/graphql';
import { RootState, StoreDispatch } from '@stores/app';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, updateModal } from '@features/app';

export const ModalListFriend = () => {
  const { modalListConversation }: any = useSelector<RootState>((state) => state.modalSlice);

  const dispatch = useDispatch<StoreDispatch>();

  const _conversation: any = useSelector<RootState>((state) => state.conversationSlice as any);

  const user = useSelector<RootState>((state) => state.userSlice.user) as any;

  const [getConversation, { data: conversations, refetch }] = useLazyQuery(
    GET_CONVERSATION_BY_PROFILE_ID,
  );
  let conversationsData = null;

  useEffect(() => {
    void getConversation({
      variables: {
        profileId: user.id,
      },
    });
  }, [user]);

  if (conversations) {
    conversationsData = conversations.getConversationByProfileId;
  }

  if (modalListConversation.isOpen) {
    return (
      <Modal
        name="modalListConversation"
        width="w-full"
        height="h-screen"
        closeable={true}
        title={'Conversations'}
        overlay={true}
        style={{ zIndex: 9999, backgroundColor: '#000000a3' }}>
        <div className=" rounded-2xl flex  w-full  h-full text-white  opacity-100  p-2 overflow-scroll">
          <div className="flex flex-col gap-5">
            <span className="uppercase pb-2 border-b-white border-b-2 w-fit ">conversation</span>
            {conversationsData?.map((conversation) => (
              <div
                className={'flex flex-row  items-center'}
                key={conversation.id + 'modal'}
                onClick={() => {
                  _conversation.currentConversation !== conversation._id
                    ? dispatch(
                        closeModal({
                          name: 'modalListConversation',
                        } as any),
                      )
                    : null;
                }}>
                <Conversation
                  info={conversation}
                  isGroup={conversation.members.length >= 2}
                  key={conversation._id}
                  id={conversation._id}
                  isModal={true}
                  customClass={`friend gap-5 max-w-fit px-3 mb-1 flex  w-fit w-full  flex-row justify-center xl:justify-start items-center gap-1 text-white  cursor-pointer py-3  rounded-full px-1.5 shadow-2xl transition-all duration-300
                     ${
                       _conversation.currentConversation === conversation._id
                         ? 'shadow-purple-800'
                         : 'hover:shadow-purple-800'
                     }
                     `}
                />
                {/*<span className={'ml-2 inline text-sm'}>*/}
                {/*  {conversation.members.length >= 2*/}
                {/*    ? conversation.name?.length >= 24*/}
                {/*      ? `${conversation.name.slice(0)}`*/}
                {/*      : conversation.name || 'Group'*/}
                {/*    : conversation.members[0].name.length >= 24*/}
                {/*    ? `${conversation.members[0].name.slice(0)}`*/}
                {/*    : conversation.members[0].name}*/}
                {/*</span>*/}
              </div>
            ))}
          </div>
          {/*<ListFriendChat />*/}
        </div>
      </Modal>
    );
  }
};

export default ModalListFriend;
