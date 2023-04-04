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
    <div className="flex items-center justify-center rounded-l-3xl flex-col  border border-gray-500  mb-3  rounded-r-md  first:rounded-tr-3xl last:rounded-br-3xl ">
      <div className=" w-fit  h-fit p-3 break-words flex items-center justify-center">
        {info?.message ? (
          <div className="max-w-2xl message-sender">{info.message}</div>
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
      </div>
      {/*<div className="text-gray-500 text-xs mt-3">*/}
      {/*  {new Date(parseInt(info.createdAt)).toLocaleString('vi-VN')}*/}
      {/*</div>*/}
    </div>
  );
};

export default React.memo(MessageSender);
