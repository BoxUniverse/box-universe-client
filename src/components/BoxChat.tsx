import { useLazyQuery } from '@apollo/client';
import { MessageReceiver, MessageSender } from '@components';
import { pushMessages } from '@features/user/messageSlice';
import { useSubscribe } from '@hooks';
import { GET_MESSAGES_BY_CONVERSATION_ID } from '@queries';
import { RootState, StoreDispatch } from '@stores/app';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeout } from 'timers';

type Props = {
  data: any;
  isSend: boolean;
  setSend: any;
};

const BoxChat = ({ data, isSend, setSend }: Props) => {
  const user: any = useSelector<RootState>((state) => state.userSlice.user as any);
  const messages: any = useSelector<RootState>((state) => state.messageSlice.messages as any);

  const { currentConversation }: any = useSelector<RootState>(
    (state) => state.conversationSlice as any,
  );
  const dispatch = useDispatch<StoreDispatch>();
  const [getMessages, { data: result, refetch }] = useLazyQuery(GET_MESSAGES_BY_CONVERSATION_ID);
  const [getOldMessages, { data: oldMessages, refetch: fetchOld }] = useLazyQuery(
    GET_MESSAGES_BY_CONVERSATION_ID,
  );
  const messagesEndRef = useRef<HTMLDivElement>();

  const boxChatRef = useRef<HTMLDivElement>();
  const startValue = useRef<string>(null);
  const [isTop, setTop] = useState<boolean>(false);

  useEffect(() => {
    if (isSend) {
      scrollToBottom();
      setSend(false);
    }
  }, [isSend]);

  useEffect(() => {
    if (data) {
      getMessages({
        variables: {
          payload: {
            conversationId: data._id,
            startValue: null,
          },
        },
      });
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      refetch({
        payload: {
          conversationId: currentConversation,
        },
      });
    }
  }, [currentConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (oldMessages?.getMessagesByConversationId) {
      //

      const listOldMessages = oldMessages.getMessagesByConversationId.messages;

      const newMessages = [...listOldMessages, ...messages];
      startValue.current = listOldMessages[0]?._id;

      dispatch(pushMessages(newMessages));
      boxChatRef.current?.scroll({
        top: 1,
      });
    }
  }, [oldMessages]);

  useSubscribe('publish/messages.SEND', () => {
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  });

  useSubscribe('publish/messages.SEND_FILES', () => {
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  });

  useEffect(() => {
    if (isTop) {
      fetchOld({
        payload: {
          conversationId: currentConversation,
          startValue: startValue.current,
        },
      });
    }
  }, [isTop]);

  const handleScrollToStart = () => {
    if (boxChatRef.current) {
      const { scrollTop } = boxChatRef.current;

      if (scrollTop === 0) {
        setTop(true);

        void getOldMessages({
          variables: {
            payload: {
              conversationId: currentConversation,
              startValue: startValue.current,
            },
          },
        });
      } else {
        setTop(false);
      }
    }
  };

  useEffect(() => {
    if (result) {
      const fetchedMessage = result.getMessagesByConversationId?.messages || [];

      dispatch(pushMessages([...fetchedMessage]));
      if (!isEmpty(fetchedMessage)) startValue.current = fetchedMessage[0]._id;
    }
    scrollToBottom();
  }, [result]);

  return (
    <div
      className="content-box-chat h-full pt-3 overflow-scroll sm: "
      onScroll={handleScrollToStart}
      ref={boxChatRef}>
      {messages &&
        messages?.map((message) => {
          if (message.sender.id !== user.id)
            return <MessageReceiver key={`receiver_${message._id}`} info={message} />;

          return <MessageSender key={`sender_${message._id}`} info={message} />;
        })}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default React.memo(BoxChat);
