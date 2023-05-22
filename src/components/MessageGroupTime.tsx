import { MessageReceiver, MessageSender } from '@components';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/app';
import moment from 'moment';
import 'moment/locale/vi';
import { MessageGroupAuthor } from '@src/components/MessageGroupAuthor';
import { first, last, uniq, uniqueId } from 'lodash';
import { message } from '@validations/message';
import React from 'react';

type GroupMessage = {
  time: number | string;
  messages: Array<any>;
};
type Props = {
  group: GroupMessage;
};

type GroupMessageByAuthor = {
  messages: Array<any>;
  type: 'sender' | 'receiver';
  id: any;
};
export const MessageGroupTime = ({ group }: Props) => {
  const user: any = useSelector<RootState>((state) => state.userSlice.user as any);
  const handleTime = (time): string => {
    // return new Date(+time).toUTCString().split('GMT')[0];
    if (time) {
      moment.locale('vi');
      let localMoment = moment(+time);
      return localMoment.format('DD MMM YYYY - LTS');
    }
  };
  const groupMessageByAuthor = (group) => {
    const result: GroupMessageByAuthor[] = [];

    const firstMessage: any = first(group.messages);

    if (firstMessage?.sender?.id !== user?.id) {
      result.push({
        type: 'receiver',
        messages: [firstMessage],

        id: uniqueId('firstMessage'),
      });
    } else {
      result.push({
        type: 'sender',
        messages: [firstMessage],
        id: uniqueId('firstMessage'),
      });
    }

    group?.messages?.forEach((message, index) => {
      if (index === 0) return;
      const type = message?.sender?.id === user?.id ? 'sender' : 'receiver';
      const newestEle = last(result);

      if (newestEle.type === type) {
        newestEle.messages.push(message);
      } else {
        result.push({
          type,
          messages: [message],
          id: uniqueId('groupAuthor'),
        });
      }
    });
    console.log(result);
    return result?.map((group) => {
      return <MessageGroupAuthor key={`${group.id}`} group={group} />;
    });
  };
  return (
    <div>
      {group.time && (
        <span className="flex items-center justify-center mb-10 text-gray-500">
          {handleTime(group.time)}
        </span>
      )}
      {group && groupMessageByAuthor(group)}
    </div>
  );
};
