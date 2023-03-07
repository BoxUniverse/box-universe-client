import { Avatar, Badge } from '@mui/material';
import { updateConversation } from '@src/features/user/conversationSlice';
import { RootState, StoreDispatch } from '@stores/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {MdOutlineGroups} from "react-icons/md"

type Props = {
  info: any;
  name?: string;
  id: string;
  isGroup: boolean;
};

const Conversation = ({ info, id, isGroup }: Props) => {
  const dispatch = useDispatch<StoreDispatch>();

  const conversation: any = useSelector<RootState>((state) => state.conversationSlice as any);

  const [name, setName] = useState<string>();
  const handleShowBoxChat = () => {
    dispatch(
      updateConversation({
        currentConversation: id,
        name: info.name,
      }),
    );
  };

  useEffect(() => {
    setName(info.name);
  }, []);

  useEffect(() => {
    if (conversation.currentConversation === id) {
      setName(conversation.name);
    }
  }, [conversation.name]);

  return (
    <div
      className={
        conversation.currentConversation === id
          ? 'friend mt-7 mb-1 flex w-full flex-row justify-start items-center text-white  cursor-pointer py-3 border-purple-600 rounded border px-1.5 shadow-purple-800 shadow-2xl transition-all duration-300'
          : 'friend mt-7 mb-1 flex w-full flex-row justify-start items-center text-white  cursor-pointer py-3 border-purple-600 rounded border px-1.5 hover:shadow-purple-800 shadow-2xl transition-all duration-300'
      }
      onClick={handleShowBoxChat}>
      <Badge
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        // badgeContent={info?.members.length > 1 ? info.members.length + 1 : 0}>
        badgeContent={info?.members.length > 1 ? <div className={"flex items-center justify-center gap-1"}><MdOutlineGroups size={20} /> <span>Group</span></div>  : 0}>
        
        <Avatar
          alt={info?.name || info.members[0].name}
          src={
            isGroup
              ? 'https://boxuniverse.s3.ap-southeast-1.amazonaws.com/group.png'
              : info.members[0].avatar
          }
        />
      </Badge>
      <div className="text-white ml-5 flex flex-col justify-between w-full">
        <div className="w-full justify-between flex items-center">
          <span>
            {isGroup
              ? name?.length >= 20
                ? `${name.slice(0, 20)}...`
                : name || 'Group'
              : info.members[0].name.length >= 20
              ? `${info.members[0].name.slice(0, 20)}...`
              : info.members[0].name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
