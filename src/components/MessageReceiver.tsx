import { MessageImage } from '@components';
import { Avatar } from '@mui/material';
import React from 'react';

type Props = {
  info: any;
};

const MessageReceiver = (props: Props) => {
  const { info } = props;
  return (
    <div className="flex flex-row friend mb-3 ">
      <Avatar alt="" src={info.sender.avatar} />
      <div className="ml-5 flex flex-col items-start justify-center">
        <span className="break-words border border-gray-500 rounded-bl-2xl rounded-r-2xl py-3 px-3 ">
          {info?.message ? (
            <div className="max-w-2xl">{info.message}</div>
          ) : (
            <div className="flex gap-2 flex-row max-w-2xl flex-wrap max-h-fit justify-center ">
              {info.files?.map((file) => {
                if (file.base64) {
                  return <MessageImage src={file.base64} key={file.url} />;
                } else if (file.url) {
                  return <MessageImage src={file.url} key={file.url} />;
                } else {
                  return <MessageImage src={file} key={file} />;
                }
              })}
            </div>
          )}
        </span>
        <div className="text-gray-500 text-xs mt-3">
          {new Date(parseInt(info.createdAt)).toLocaleString('vi-VN')}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageReceiver);
