import { Avatar } from '@mui/material';

type Props = {
  comment: any;
};

const Comment = ({ comment }: Props) => {
  return (
    <div className={`flex flex-row gap-5 justify-start items-start mb-10`}>
      <Avatar
        src={comment.profile.avatar}
        variant="rounded"
        sx={{ width: '40px', height: '40px' }}
      />
      <div className="message text-white flex flex-col flex-wrap">
        <div className="font-bold">{comment.profile.name}</div>
        <div className="break-words break-all">{comment.text}</div>
      </div>
    </div>
  );
};
export default Comment;
