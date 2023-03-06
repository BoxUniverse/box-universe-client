import { MessageImage } from '@components';
import { Avatar } from '@mui/material';
import { parseInt } from 'lodash';
import React from 'react';

type Props = {
  info: any;
};
const MessageSender = (props: Props) => {
  const { info } = props;
  return (
    <div className="flex flex-row me mb-3 justify-end ">
      <div className="flex items-end justify-center flex-col mr-5">
        <span className=" break-words border border-gray-500 rounded-br-2xl rounded-l-2xl py-3 px-3">
          {info?.message ? (
            <div className="max-w-2xl">{info.message}</div>
          ) : (
            <div className="flex gap-1 flex-row max-w-2xl w-fit flex-wrap max-h-fit justify-center ">
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

        <div className="text-gray-500 text-xs mt-3"></div>
      </div>
      <Avatar alt="" src={info.sender.avatar} />
    </div>
  );
};

export default React.memo(MessageSender);
