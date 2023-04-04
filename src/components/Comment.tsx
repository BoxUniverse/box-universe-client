import { Avatar } from '@mui/material';
import { LongText } from '@src/components';
import React from 'react';

type Props = {
  comment: any;
};

const Comment = ({ comment }: Props) => {
  return (
    <div className={`flex flex-row gap-5 justify-start items-start mb-10 last:mb-10`}>
      <Avatar
        src={comment.profile.avatar}
        variant="rounded"
        sx={{ width: '40px', height: '40px' }}
      />
      <div className="message text-white flex flex-col flex-wrap">
        <div className="font-bold">{comment.profile.name}</div>
        <div className="break-words break-all">
          <LongText>{comment.text}</LongText>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Comment);
