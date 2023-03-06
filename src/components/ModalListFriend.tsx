import { useLazyQuery, useMutation } from '@apollo/client';
import { Input, Modal } from '@components';
import { usePublish } from '@hooks';
import { Avatar } from '@mui/material';
import { ADD_MEMBER_CONVERSATION, GET_LIST_FRIEND_NOT_IN_CONVERSATION } from '@src/graphql';
import { RootState } from '@stores/app';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import { useSelector } from 'react-redux';

export const ModalListFriend = () => {
  const { modalListFriend }: any = useSelector<RootState>((state) => state.modalSlice);
  const inputRef = useRef<string>('');
  const [addMemberConversation] = useMutation(ADD_MEMBER_CONVERSATION);
  const user: any = useSelector<RootState>((state) => state.userSlice.user as any);
  const [friends, setFriends] = useState([]);
  const publish = usePublish();

  const { currentConversation }: any = useSelector<RootState>(
    (state) => state.conversationSlice as any,
  );

  const [getListFriend, { data }] = useLazyQuery(GET_LIST_FRIEND_NOT_IN_CONVERSATION, {
    variables: {
      conversationId: currentConversation,
    },
  });

  useEffect(() => {
    if (modalListFriend.isOpen) {
      getListFriend();
    }
  }, [modalListFriend.isOpen, getListFriend]);
  useEffect(() => {
    if (data?.getListFriendNotInConversation?.result) {
      setFriends(data.getListFriendNotInConversation.result);
    }
  }, [data]);

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.value;
  };

  const handleAddFriendConversation = (profileId: string) => {
    const newFriends = friends.filter((friend) => friend.id !== profileId);

    setFriends([...newFriends]);
    addMemberConversation({
      variables: {
        conversationId: currentConversation,
        profileIds: [profileId],
      },
    });

    publish('conversation.addMember', {
      conversationId: currentConversation,
      profileId: profileId,
      invitorId: user.id,
    });
  };

  if (modalListFriend.isOpen) {
    return (
      <Modal
        name="modalListFriend"
        className="w-full h-full fixed backdrop-blur  flex items-center justify-center"
        style={{ zIndex: 9999, backgroundColor: '#000000a3' }}>
        <div className=" rounded-2xl  w-1/3 h-1/2 text-white flex justify-center opacity-100 p-10">
          <div className="flex flex-col gap-5">
            {
              //<input className=" bg-transparent rounded-md pl-5 h-10" />
            }
            <Input
              value={inputRef.current}
              onChange={handleOnInput}
              width="w-auto"
              height="h-10"
              icons={<IoSearch />}
              border="white"
            />
            <span className="uppercase pb-2 border-b-white border-b-2 w-fit ">
              list your friend
            </span>
            {friends &&
              friends.map((profile) => {
                return (
                  <div
                    key={profile.id}
                    className="flex flex-row items-center justify-center gap-5  hover:bg-purple-500 py-2 rounded transition duration-200">
                    <Avatar src={profile.avatar} />
                    <span className="text-white">{profile.name}</span>

                    <AiOutlineUsergroupAdd
                      className="ml-10 cursor-pointer"
                      size={30}
                      onClick={() => {
                        handleAddFriendConversation(profile.id);
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </Modal>
    );
  }
};

export default ModalListFriend;
