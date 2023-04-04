import { MessageReceiver, MessageSender } from '@components';
import { Avatar } from '@mui/material';
import React from 'react';

type GroupMessageByAuthor = {
  messages: Array<any>;
  type: 'sender' | 'receiver';
};
type Props = {
  group: GroupMessageByAuthor;
};
export const MessageGroupAuthor = ({ group }: Props) => {
  if (group.type === 'sender')
    return (
      <div className="group-sender flex items-end justify-center flex-col ">
        {group.messages.map((message) => {
          return <MessageSender key={`sender_${message?._id}`} info={message} />;
        })}
      </div>
    );
  return (
    <div className={'relative'}>
      {group?.messages[0] && (
        <Avatar
          alt=""
          className={'absolute top-0 left-0'}
          src={group?.messages[0]?.sender?.avatar}
        />
      )}

      <div className="group-receiver flex flex-col items-start justify-center ml-16 relative ">
        {group.messages.map((message, index) => {
          if (message) {
            if (index === 0)
              return <MessageReceiver key={`receiver_${message?._id}`} info={message} />;
            return <MessageReceiver key={`receiver_${message?._id}`} info={message} />;
          }
        })}
      </div>
    </div>
  );
};
