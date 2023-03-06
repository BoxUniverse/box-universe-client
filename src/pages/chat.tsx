import { useLazyQuery, useMutation } from '@apollo/client';
import { BoxChat, Input } from '@components';
import { usePublish, useSubscribe, useToast } from '@hooks';
import MainLayout from '@layouts/MainLayout';
import { Avatar } from '@mui/material';
import { CHANGE_NAME_CONVERSATION, SEND_FILES, SEND_MESSAGE } from '@mutations';
import { GET_CONVERSATION_BY_ID } from '@queries';
import { updateModal } from '@src/features/app/modalSlice';
import { updateConversation, updateTypeConversation } from '@src/features/user/conversationSlice';
import { pushMessages } from '@src/features/user/messageSlice';
import attachToken from '@src/injection/attachToken';
import { RootState, StoreDispatch } from '@stores/app';
import { Picker } from 'emoji-mart-next';
import 'emoji-mart-next/css/emoji-mart.css';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { ReactElement, SetStateAction, useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircleFill } from 'react-icons/bs';
import {
  IoCall,
  IoChatboxEllipsesOutline,
  IoCloseCircle,
  IoEllipsisVerticalOutline,
  IoHappyOutline,
  IoPersonAdd,
} from 'react-icons/io5';
import { MdUploadFile } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { NextPageWithLayout } from './_app';

type PayloadFile = {
  file: File;
  url: string;
  type: string;
  base64?: string;
};

const Chat: NextPageWithLayout = () => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const iconEmojiRef = useRef<HTMLDivElement>(null);
  const conversation: any = useSelector<RootState>((state) => state.conversationSlice as any);

  const [getConversation, { data: conversationData, refetch }] =
    useLazyQuery(GET_CONVERSATION_BY_ID);
  const [_sendFiles, { data: statusFiles }] = useMutation(SEND_FILES);
  const [avatar, setAvatar] = useState<string>('');
  const messages: any = useSelector<RootState>((state) => state.messageSlice.messages as any);
  const dispatch = useDispatch<StoreDispatch>();
  const [listFiles, setListFiles] = useState<PayloadFile[]>([]);

  const user: any = useSelector<RootState>((state) => state.userSlice.user as any);
  const [send] = useMutation(SEND_MESSAGE);
  const [changeName] = useMutation(CHANGE_NAME_CONVERSATION);
  const inputFileRef = useRef<HTMLInputElement>();

  const [isSend, setSend] = useState<boolean>(false);

  const publish = usePublish();
  const toast = useToast();

  const validExtFilePattern = /^((image)\/(png|jpg|jpeg|webp))$/g;

  const handleInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmitChangeName = (value: string) => {
    // setName(value);

    dispatch(
      updateConversation({
        name: value,
      }),
    );
    void changeName({
      variables: {
        payload: {
          _id: conversation.currentConversation,
          name: value,
        },
      },
    });
  };

  // const openModalCallVideo = (event: React.MouseEvent<HTMLLIElement>) => {
  //   dispatch(
  //     updateModal({
  //       isOpen: true,
  //       name: 'modalCallVideo',
  //     }),
  //   );
  // };

  useSubscribe('publish/conversation.addMember', () => {
    void refetch({
      conversationId: conversation.currentConversation,
    });
  });

  useEffect(() => {
    if (statusFiles?.sendFiles) {
      setListFiles([]);
    }
  }, [statusFiles]);
  useEffect(() => {
    if (conversation.isGroup) {
      // setName('Group');

      setAvatar('https://boxuniverse.s3.ap-southeast-1.amazonaws.com/group.png');
    }
  }, [conversation]);
  useEffect(() => {
    if (conversation?.currentConversation) {
      void getConversation({
        variables: {
          conversationId: conversation.currentConversation,
        },
      });
    }
  }, [conversation]);

  useEffect(() => {
    if (conversation?.currentConversation) {
      void refetch({
        conversationId: conversation.currentConversation,
      });
    }
  }, [conversation.currentConversation, conversation.name]);
  useEffect(() => {
    if (conversationData?.getConversationById) {
      const { members } = conversationData.getConversationById;

      if (members.length === 1) {
        // setName(members[0].name);
        dispatch(
          updateConversation({
            name: members[0].name,
          }),
        );

        setAvatar(members[0].avatar);
      } else {
        const name = conversationData.getConversationById.name || 'Group';

        // setName(name);

        dispatch(
          updateConversation({
            name,
          }),
        );

        setAvatar('https://boxuniverse.s3.ap-southeast-1.amazonaws.com/group.png');
      }

      dispatch(updateTypeConversation(members?.length >= 2));
    }
  }, [conversationData]);

  const handleEmojiSelect = (data: any) => {
    setMessage((prevState: SetStateAction<string>) => `${prevState} ${data.native}`);
  };
  const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      const now = new Date().getTime();
      const newMessage = [];
      const cleanListFiles = [];

      if (message.length > 0 && message) {
        setSend(true);
        // TODO: handle send message
        void send({
          variables: {
            payload: {
              conversationId: conversation.currentConversation,
              message,
              now,
            },
          },
        });
        setMessage('');
        const payload = {
          message,
          conversation: conversationData.getConversationById,
          sender: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          },
          createdAt: now,
        };
        publish('messages.SEND', payload);

        newMessage.push({
          _id: `_${new Date().getTime()}`,
          sender: payload.sender,
          message: payload.message,
          createdAt: now,
        });
      }
      if (!isEmpty(listFiles)) {
        setSend(true);
        listFiles.forEach((file) => {
          cleanListFiles.push(file.file);
        });

        _sendFiles({
          variables: {
            files: cleanListFiles,
            payload: {
              conversationId: conversation.currentConversation,
              now,
            },
          },
        });

        const payload = {
          files: listFiles,
          conversation: conversationData.getConversationById,
          sender: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          },
          createdAt: now,
        };

        publish('messages.SEND_FILES', payload);

        newMessage.push({
          _id: `_${new Date().getTime()}`,
          sender: payload.sender,
          files: payload.files,
          createdAt: now,
        });
      }

      dispatch(pushMessages([...messages, ...newMessage]));
    }
  };
  useEffect(() => {
    function detectClickOutside(event: any) {
      if (iconEmojiRef.current?.contains(event.target)) {
        setShowIcon(!showIcon);
      }
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        if (showIcon) setShowIcon(false);
      }
    }
    document.addEventListener('mousedown', detectClickOutside);
    return () => {
      document.removeEventListener('mousedown', detectClickOutside);
    };
  });
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files.length) {
      Array.from(files).forEach((file) => {
        if (file.size > 2000000) {
          toast('error', 'You can upload file has size less than 2MB :(');
        } else if (isEmpty(file.type.match(validExtFilePattern))) {
          toast('error', 'You only can upload image');
        } else {
          const blobURL = URL.createObjectURL(file);
          // const fileReader = new FileReader();
          // fileReader.readAsDataURL(file);
          // fileReader.onload = function (evt) {
          setListFiles((prev) => [
            ...prev,
            {
              file,
              url: blobURL,
              type: file.type,
              // base64: evt.target.result as string,
            },
          ]);
          // };
        }
      });
    }
  };
  const handleRemoveFile = (key) => {
    URL.revokeObjectURL(key);
    setListFiles((prev) => prev.filter((file) => file.url !== key));
  };

  const showModalListFriend = () => {
    dispatch(
      updateModal({
        name: 'modalListFriend',
        isOpen: true,
      }),
    );
  };

  const handleCallVideo = () => {
    publish('conversation.friendIsOnline', {
      conversation: conversation.currentConversation,
      caller: {
        id: user.id,
      },
    });
  };
  useSubscribe('result.friendIsOnline', (payload) => {
    if (payload)
      dispatch(
        updateModal({
          name: 'modalCallVideo',
          isOpen: true,
        }),
      );
    else toast('warn', 'User is offline');
  });

  const handleChangeNameGroup = () => {};

  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <div className="w-full relative h-full ">
        <div className="header__box sticky top-3/6 z-40 flex items-center h-11 justify-between border-spacing-20 border-b border-b-purple-500 pb-3 ">
          <div className="flex items-center">
            <Avatar alt="Remy Sharp" src={avatar} />
            <span className="ml-5 text-xl">{conversation.name}</span>
          </div>
          <div className="settings-chat absolute right-0 h-6 w-6 group after:content-['']  after:absolute after:top-5 after:right-0 after:w-36 after:h-7">
            <IoEllipsisVerticalOutline className="absolute cursor-pointer " size={25} />
            <ul className="dropdown-settings absolute top-12 group-hover:flex hover:flex hidden right-0 rounded-md border border-purple-500  backdrop-blur-sm w-60 items-center flex-col child">
              <li
                className="h-12 flex items-center justify-center group cursor-pointer w-full hover:bg-purple-500 border-b border-purple-500"
                onClick={showModalListFriend}>
                <div className="flex flex-row gap-5 items-center">
                  <IoPersonAdd size={20} />
                  Add member
                </div>
              </li>
              {!conversation.isGroup && (
                <li
                  className="h-12 flex items-center justify-center cursor-pointer w-full hover:bg-purple-500"
                  onClick={handleCallVideo}>
                  <div className="flex flex-row gap-5 items-center">
                    <IoCall size={20} />
                    Call video
                  </div>
                </li>
              )}

              {conversation.isGroup && (
                <li
                  className="h-12 flex items-center group/sub after:content-[''] after:absolute after:w-8 after:h-full after:-right-5  justify-center cursor-pointer  w-full hover:bg-purple-500 relative"
                  onClick={handleChangeNameGroup}>
                  <div className="flex flex-row gap-5 items-center">
                    <AiOutlineEdit size={20} />
                    Change name group
                  </div>
                  <ul className="absolute -right-64 group-hover/sub:flex hidden ">
                    <li>
                      <Input
                        value={conversation.name}
                        width="w-60"
                        height="h-12"
                        border="purple"
                        icons={<BsInfoCircleFill size={20} className="text-purple-500" />}
                        onEnter={handleSubmitChangeName}
                      />
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="h-5/6">
          {conversation?.currentConversation && (
            <BoxChat
              data={conversationData?.getConversationById}
              isSend={isSend}
              setSend={setSend}
            />
          )}
        </div>

        <div className="mt-3 w-full flex items-center absolute bottom-3">
          <div ref={iconEmojiRef}>
            <IoHappyOutline
              size={25}
              className="text-purple-500 absolute top-1/2 -translate-y-1/2 transform right-5 cursor-pointer"
            />
            <IoHappyOutline
              size={25}
              className="text-purple-500 blur-sm absolute top-1/2 -translate-y-1/2 transform right-5 cursor-pointer"
            />
          </div>

          <MdUploadFile
            size={25}
            className="absolute right-12 text-purple-500 cursor-pointer"
            onClick={() => inputFileRef.current.click()}
          />

          {!isEmpty(listFiles) ? (
            <div className="preview-files absolute w-full h-24 border rounded border-purple-500  backdrop-blur-sm -top-28 flex items-center justify-start">
              <div className="listImage flex flex-row gap-5 ml-5">
                {listFiles?.map((file) => {
                  return (
                    <div key={`preview_${file.url}`} className="image relative">
                      <Avatar src={file.url} sx={{ width: 70, height: 70 }} variant="square" />
                      <IoCloseCircle
                        className="text-red-500 bg-white rounded-full absolute top-0 right-0 cursor-pointer"
                        size={25}
                        onClick={() => {
                          handleRemoveFile(`${file.url}`);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <input
            name="search"
            placeholder="Message"
            id="username"
            className="placeholder:select-none pr-14 w-full neon text-md align-middle placeholder:text-sm placeholder:uppercase  h-12 bg-transparent rounded-lg focus: outline-0 pl-10 border-box border-purple-500 "
            onInput={handleInputMessage}
            onKeyUp={handleSendMessage}
            autoComplete="off"
            value={message}
            spellCheck="false"
          />
          <input
            type="file"
            id="file"
            ref={inputFileRef}
            onChange={handleUploadFile}
            multiple={true}
          />
          <div
            className="absolute bottom-14 right-0"
            style={{ zIndex: 99999 }}
            ref={emojiPickerRef}>
            {showIcon && <Picker onSelect={handleEmojiSelect} set="apple" darkMode="true" />}
          </div>
          <IoChatboxEllipsesOutline
            color="white"
            className="absolute top-1/2 transform -translate-y-1/2 ml-3 "
            size={20}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = attachToken(() => ({
  props: {},
}));
Chat.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Chat;
