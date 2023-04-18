import { Avatar, Badge } from '@mui/material';
import { updateConversation } from '@src/features/user/conversationSlice';
import { RootState, StoreDispatch } from '@stores/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineGroups } from 'react-icons/md';

type Props = {
  info: any;
  name?: string;
  id: string;
  isGroup: boolean;
  customClass?: string;
  isModal?: boolean;
};

const Conversation = ({ info, id, isGroup, customClass, isModal }: Props) => {
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

  //   className={
  //     ``
  //   conversation.currentConversation === id
  //     ? 'friend mt-7 mb-1 flex  w-fit w-full sm:px-5 xl:px-2 2xl:px-5 2xl:pl-2 flex-row justify-center xl:justify-start items-center gap-1 text-white  cursor-pointer py-3 border-purple-600 rounded border px-1.5 shadow-purple-800 shadow-2xl transition-all duration-300'
  //     : 'friend mt-7 mb-1 flex  w-fit w-full sm:px-5 xl:px-2 2xl:px-5 2xl:pl-2 flex-row justify-center xl:justify-start items-center gap-1 text-white  cursor-pointer py-3 border-purple-600 rounded border px-1.5 hover:shadow-purple-800 shadow-2xl transition-all duration-300'
  // }
  return (
    <div
      className={
        customClass ||
        `friend mt-7 mb-1 flex  w-fit w-full sm:px-5 xl:px-2 2xl:px-5 2xl:pl-2 flex-row justify-center xl:justify-start items-center gap-1 text-white  cursor-pointer py-3 border-purple-600 rounded border px-1.5 ${
          conversation.currentConversation === id ? 'shadow-purple-800' : 'hover:shadow-purple-800'
        } shadow-2xl transition-all duration-300`
      }
      onClick={conversation.currentConversation !== id ? handleShowBoxChat : null}>
      <Badge
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        // badgeContent={info?.members.length > 1 ? info.members.length + 1 : 0}>
        badgeContent={
          info?.members.length > 1 ? (
            <div className={'flex items-center justify-center gap-1 '}>
              <MdOutlineGroups size={20} />{' '}
              <span className={`${isModal ? 'inline' : 'hidden xl:inline'}`}>Group</span>
            </div>
          ) : (
            0
          )
        }>
        <Avatar
          alt={info?.name || info.members[0].name}
          src={
            isGroup
              ? 'https://boxuniverse.s3.ap-southeast-1.amazonaws.com/group.png'
              : info.members[0].avatar
          }
        />
      </Badge>
      <div
        className={`text-white xl:ml-2 sm:text-sm flex-col justify-between w-full ${
          isModal ? 'flex' : 'hidden xl:flex'
        }`}>
        <div className={'w-full justify-between flex items-center'}>
          <span>
            {isGroup
              ? name?.length >= 24
                ? `${name.slice(0)}`
                : name || 'Group'
              : info.members[0].name.length >= 24
              ? `${info.members[0].name.slice(0)}`
              : info.members[0].name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
