import { useMutation, useSubscription } from '@apollo/client';
import { Avatar } from '@mui/material';
import { updateModal } from '@src/features/app/modalSlice';
import { COMMENT_ADDED, LIKE_POST, NEW_LIKE, UNLIKE_POST } from '@src/graphql';
import { StoreDispatch } from '@stores/app';
import { useEffect, useState } from 'react';
import {
  IoChatboxEllipsesOutline,
  IoEllipsisHorizontalOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { usePublish } from '@hooks';
import { LongText } from '@src/components';

type Props = {
  post: any;
};
const Post = ({ post }: Props) => {
  const [like] = useMutation(LIKE_POST);
  const [unlike] = useMutation(UNLIKE_POST);
  const [countLike, setCountLike] = useState(post.countLike);
  const [countComment, setCountComment] = useState(post.countComment);
  const dispatch = useDispatch<StoreDispatch>();
  const [isLiked, setLike] = useState(post.isLiked);
  const publish = usePublish();

  const { data: newLikeData } = useSubscription(NEW_LIKE, {
    variables: {
      post: post._id,
    },
  });

  const { data: commentAdded } = useSubscription(COMMENT_ADDED, {
    variables: {
      post: post._id,
    },
  });

  useEffect(() => {
    if (commentAdded && commentAdded.commentAdded.post?._id === post._id) {
      setCountComment((prev) => prev + 1);
    }
  }, [commentAdded]);

  const handleOnLike = () => {
    const variables = {
      post: post._id,
    };
    if (!isLiked) {
      void like({
        variables,
      });
    } else {
      void unlike({
        variables,
      });
    }

    setLike(!isLiked);
  };

  useEffect(() => {
    if (newLikeData?.newLike) {
      setCountLike(newLikeData.newLike?.countLike);
    }
  }, [newLikeData]);

  const showModalComment = () => {
    dispatch(
      updateModal({
        name: 'modalComment',
        isOpen: true,
        post: post,
      } as any),
    );
  };
  const handleOnShare = () => {};
  return (
    <div className="post mb-20 last:pb-5 ">
      <div className="flex flex-row justify-between header-post border-b pb-5 border-b-purple-500">
        <div className="flex flex-row items-center ">
          <div className="border rounded-full p-3 cursor-pointer border-purple-500">
            <Avatar alt="avatar" src={post.profile.avatar} sx={{ width: 40, height: 40 }} />
          </div>
          <div className="ml-3 flex flex-col justify-around h-full self-center ">
            <div className="text-lg">{post.profile.name}</div>
            <div className="text-sm text-purple-500">Just now</div>
          </div>
        </div>
        <div className="self-center">
          <div className="relative">
            <IoEllipsisHorizontalOutline size={25} className="cursor-pointer text-white" />
            <IoEllipsisHorizontalOutline
              size={25}
              className="cursor-pointer text-white blur-sm absolute top-0"
            />
          </div>
        </div>
      </div>
      <div className="content-post mt-6 border-b border-b-purple-500 pb-5">
        <LongText max={600}>{post.content}</LongText>
      </div>
      <div className="action-post mt-5 flex flex-row justify-between">
        <div
          className={`relative w-full mr-2 rounded-md ${isLiked ? 'bg-red-500' : 'bg-transparent'}`}
          onClick={handleOnLike}>
          <div className="btn-action-post flex flex-row items-center justify-center w-full py-3 border rounded-md cursor-pointer border-red-400">
            <IoHeartOutline
              size={20}
              className={`mr-3 ${isLiked ? 'text-white' : 'text-red-500'}`}
            />
            <span className="count mr-3">{countLike || 0}</span>
            <span className={`type ${isLiked ? 'text-white' : 'text-purple-500'} uppercase`}>
              Like
            </span>
          </div>
          <div className="absolute blur-sm top-0 btn-action-post flex flex-row items-center justify-center w-full py-3 mr-2 border rounded-md cursor-pointer border-red-400 select-none">
            <IoHeartOutline size={20} className="mr-3 text-red-500" />
            <span className="count mr-3">{countLike || 0}</span>
            <span className={`type ${isLiked ? 'text-white' : 'text-purple-500'} uppercase`}>
              Like
            </span>
          </div>
        </div>

        <div className="relative w-full mr-2" onClick={showModalComment}>
          <div className="btn-action-post items-center justify-center  flex flex-row w-full  py-3  border rounded-md cursor-pointer border-blue-600">
            <IoChatboxEllipsesOutline size={20} className="mr-3 text-blue-600" />
            <span className="count mr-3">{countComment || 0}</span>
            <span className="type text-purple-500 uppercase">Comment</span>
          </div>
          <div className="absolute top-0 blur-sm btn-action-post items-center justify-center  flex flex-row w-full py-3 mr-2 border rounded-md cursor-pointer border-blue-600 select-none">
            <IoChatboxEllipsesOutline size={20} className="mr-3 text-blue-600" />
            <span className="count mr-3">{countComment || 0}</span>
            <span className="type text-purple-500 uppercase">Comment</span>
          </div>
        </div>
        <div className="relative w-full" onClick={handleOnShare}>
          <div className="btn-action-post items-center justify-center  flex flex-row w-full py-3 border rounded-md cursor-pointer border-cyan-500">
            <IoShareSocialOutline size={20} className="mr-3 text-cyan-500" />
            <span className="count mr-3">{post?.countShare || 0}</span>
            <span className="type text-purple-500 uppercase">Share</span>
          </div>
          <div className="absolute top-0 blur-sm btn-action-post items-center justify-center  flex flex-row w-full py-3 border rounded-md cursor-pointer border-cyan-500 select-none">
            <IoShareSocialOutline size={20} className="mr-3 text-cyan-500" />
            <span className="count mr-3">{post?.countShare || 0}</span>
            <span className="type text-purple-500 uppercase">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
