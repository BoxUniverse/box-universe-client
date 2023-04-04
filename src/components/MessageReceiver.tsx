import { MessageImage } from '@components';
import { Avatar } from '@mui/material';
import React from 'react';

type Props = {
  info: any;
};

const MessageReceiver = (props: Props) => {
  const { info } = props;
  if (info)
    return (
      <div
        className={
          'flex flex-row border rounded-r-3xl border-gray-500 first:rounded-tl-3xl last:rounded-bl-3xl mb-3 rounded-l-md  '
        }>
        <div className="friend flex gap-3 flex-row ">
          <div className="break-words w-fit h-fit p-3 ">
            {info?.message ? (
              <div className="max-w-2xl">{info?.message}</div>
            ) : (
              <div className="flex gap-2 flex-row max-w-2xl flex-wrap max-h-fit justify-center ">
                {info?.files?.map((file) => {
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
      </div>
    );
};

export default React.memo(MessageReceiver);
