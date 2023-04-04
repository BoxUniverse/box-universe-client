import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { AlwaysScrollToBottom, Comment, LongText, Modal, Textarea } from '@components';
import { Avatar } from '@mui/material';
import { COMMENT_ADDED, COMMENT_POST, GET_COMMENTS } from '@src/graphql';
import { RootState } from '@stores/app';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '@hooks';

const ModalComment = () => {
  const { modalComment }: any = useSelector<RootState>((state) => state.modalSlice);
  const user: any = useSelector<RootState>((state) => state.userSlice.user);
  const continueComment = useRef<any>(null);
  const [comments, setComments] = useState([]);
  const boxCommentRef = useRef<HTMLDivElement>(null);
  const commentEndRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();
  const { data: commentAdded } = useSubscription(COMMENT_ADDED, {
    variables: {
      post: modalComment.post._id,
    },
  });

  const [comment, { data: resultComment, error }] = useMutation(COMMENT_POST);
  const [getComments, { data, refetch }] = useLazyQuery(GET_COMMENTS, {
    variables: {
      post: modalComment.post._id,
    },
  });

  useEffect(() => {
    if (commentAdded) setComments((prev) => [...prev, commentAdded.commentAdded]);
  }, [commentAdded]);

  useEffect(() => {
    refetch().then((result) => {
      setComments([...result.data.getComments]);
    });
  }, []);

  useEffect(() => {
    if (resultComment && !error) {
      const { post } = modalComment;
      notify('notifications.SEND_NOTIFICATION', {
        type: 'newsfeed',
        post: post._id,
        message: `${user.name} has just commented to ${post.profile.name}'s post `,
      });
    }
  }, [resultComment]);

  const handleCommentPost = (value: string) => {
    void comment({
      variables: {
        text: value,
        post: modalComment.post._id,
      },
    });
  };

  const post = modalComment.post;

  if (modalComment.isOpen) {
    return (
      <Modal
        width="w-4/6"
        height="h-5/6"
        name="modalComment"
        closeable={true}
        title={`${post.profile.name}'s post`}>
        <div className="border-purple-500  rounded-2xl w-full  h-full flex  opacity-100 p-8 flex-col overflow-scroll">
          <div className="post w-full h-fit">
            <div className="flex flex-row justify-between header-post border-b pb-5 border-b-purple-500 mt-10">
              <div className="flex flex-row items-center ">
                <div className="border rounded-full p-3 cursor-pointer border-purple-500">
                  <Avatar alt="avatar" src={post.profile.avatar} sx={{ width: 40, height: 40 }} />
                </div>
                <div className="ml-3 flex flex-col justify-around h-full self-center ">
                  <div className="text-lg text-white">{post.profile.name}</div>
                  <div className="text-sm text-purple-500">Just now</div>
                </div>
              </div>
            </div>
            <div className="content-post mt-6 text-white mb-5  h-fit">
              <div className=" min-h-0 ">
                <LongText max={350}>{post.content}</LongText>
              </div>
            </div>
            <hr className="bg-purple-500 mb-5" style={{ border: 0, height: 1 }} />
            <div className=" uppercase text-white font-bold text-xl ">
              <span> Comments ({comments?.length || 0})</span>
            </div>
            <div className="h-fit">
              <div className="comments mt-5 h-auto ml-10" ref={boxCommentRef}>
                {comments?.slice(0, 10).map((comment) => {
                  continueComment.current = comment._id;
                  return <Comment key={comment._id} comment={comment} />;
                })}
                {/*<div ref={commentEndRef} />*/}
                <AlwaysScrollToBottom />
              </div>
            </div>
            <hr className="bg-purple-500" style={{ border: 0, height: 1 }} />
            <div className="flex flex-row gap-10 pb-10 mt-10">
              <Avatar src={user.avatar} />
              {
                <Textarea
                  onEnter={handleCommentPost}
                  width="w-full"
                  height="h-16"
                  border="purple"
                  placeholder="Enter message ..."
                  value=""
                />
              }
            </div>
          </div>
        </div>
      </Modal>
    );
  }
};
export default React.memo(ModalComment);
