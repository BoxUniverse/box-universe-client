import { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';
import { Conversation } from '@components';
import { useSubscribe } from '@hooks';
import { changeConversation } from '@src/features/user/conversationSlice';
import { GET_CONVERSATION_BY_PROFILE_ID } from '@src/graphql';
import { RootState, StoreDispatch } from '@stores/app';
import { useDispatch, useSelector } from 'react-redux';

const ListFriendChat = () => {
  const user = useSelector<RootState>((state) => state.userSlice.user) as any;
  const conversation: any = useSelector<RootState>((state) => state.conversationSlice as any);
  const dispatch = useDispatch<StoreDispatch>();
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

  useSubscribe('publish/conversation.addMember', () => {
    void refetch({
      profileId: user.id,
    });
  });

  useEffect(() => {
    if (conversation?.currentConversation === null && conversationsData) {
      dispatch(changeConversation(conversationsData[0]._id));
    }
    if (conversation.isGroup) {
      refetch({
        profileId: user.id,
      });
    }
  }, [conversations, conversation.isGroup]);

  if (conversations) {
    conversationsData = conversations.getConversationByProfileId;
  }

  return (
    <div className="fixed bottom-1 xs:hidden sm:w-24 sm:flex sm:justify-center sm:flex-col sm:items-center xl:block  xl:w-72 w-fit z-30 ml-24 h-5/6 px-1 backdrop-blur-md  rounded-xl hidden">
      <div className="xl:mt-1 xl:ml-2">
        <div className="uppercase text-xl border-b pb-3  w-fit sm:text-sm md:text-md xl:text-xl xl:w-24 whitespace-nowrap h-11">
          <span className="text-white">Conversations</span>
        </div>
      </div>
      <div className="list-friends overflow-scroll mt-2 flex flex-col " style={{ height: '91.5%' }}>
        {conversationsData?.map((conversation) => (
          <Conversation
            info={conversation}
            isGroup={conversation.members.length >= 2}
            key={conversation._id}
            id={conversation._id}
          />
        ))}
      </div>
    </div>
  );
};
export default ListFriendChat;
