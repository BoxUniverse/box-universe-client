import { useQuery } from '@apollo/client';
import { Avatar, Badge } from '@mui/material';
import { GET_CONVERSATION_BY_FRIEND } from '@queries';
import { changeConversation } from '@src/features/user/conversationSlice';
import { RootState, StoreDispatch } from '@stores/app';
import { useRouter } from 'next/router';
import { IoBanOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  info: any;
};
const Friend = ({ info }: Props) => {
  const router = useRouter();

  const user = useSelector<RootState>((state) => state.userSlice.user) as any;
  const { data } = useQuery(GET_CONVERSATION_BY_FRIEND, {
    variables: {
      friendId: info.id,
      profileId: user.id,
    },
  });

  const seeProfile = () => {
    void router.push(`/profile/${info.id}`);
  };
  const dispatch = useDispatch<StoreDispatch>();

  const chatWith = () => {
    dispatch(changeConversation(data.getConversationByFriend._id));
    void router.push('/chat');
  };

  return (
    <div className="friend mt-7 mb-3 flex flex-row items-center text-white justify-center xl:justify-start">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        color="success"
        variant="dot">
        <Avatar alt="Remy Sharp" src={info.avatar} />
      </Badge>
      <div
        className="text-white ml-5 w-24 whitespace-nowrap cursor-pointer text-sm hidden xl:block"
        onClick={seeProfile}>
        {info?.name?.length >= 27 ? `${info.name.slice(0, 27)}` : info?.name}
      </div>
      {/*<div className="relative" onClick={chatWith}>*/}
      {/*  <IoChatbubbleEllipsesOutline size={25} className="text-purple-500 ml-10 cursor-pointer" />*/}
      {/*  <IoChatbubbleEllipsesOutline*/}
      {/*    size={25}*/}
      {/*    className="text-purple-500 ml-10 cursor-pointer absolute blur-sm top-0"*/}
      {/*  />*/}
      {/*</div>*/}

      {/*<div className="relative">*/}
      {/*  <IoBanOutline size={25} className="text-red-500 ml-3 cursor-pointer" />*/}
      {/*  <IoBanOutline*/}
      {/*    size={25}*/}
      {/*    className="text-red-500 ml-3 cursor-pointer absolute blur-sm top-0"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default Friend;
