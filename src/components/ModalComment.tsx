import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { Comment, Modal, Textarea } from '@components';
import { Avatar } from '@mui/material';
import { COMMENT_ADDED, COMMENT_POST, GET_COMMENTS } from '@src/graphql';
import { RootState } from '@stores/app';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ModalComment = () => {
  const { modalComment }: any = useSelector<RootState>((state) => state.modalSlice);
  const user: any = useSelector<RootState>((state) => state.userSlice.user);
  const continueComment = useRef<any>(null);
  const boxCommentRef = useRef<HTMLDivElement>(null);
  const commentEndRef = useRef<HTMLDivElement>(null);
  const { data: commentAdded } = useSubscription(COMMENT_ADDED, {
    variables: {
      post: modalComment.post._id,
    },
  });

  const [, { data, refetch }] = useLazyQuery(GET_COMMENTS, {
    variables: {
      post: modalComment.post._id,
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     setComment((prev) => [...prev, ...data.getComments]);
  //   }
  // }, [data]);

  useEffect(() => {
    if (commentAdded) {
      // setComment((prev) => [...prev, commentAdded.commentAdded]);

      void refetch({
        post: modalComment.post._id,
      });
    }
  }, [commentAdded]);

  const [comment] = useMutation(COMMENT_POST);

  useEffect(() => {
    void refetch({
      post: modalComment.post._id,
    });
  }, []);

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
      <Modal width="w-5/6" height="h-5/6" name="modalComment" closeable={true}>
        <div className="border-purple-500  rounded-2xl w-1/2 flex items-center justify-center opacity-100 p-10 flex-col">
          <div className="post w-full ">
            <div className="flex flex-row justify-between header-post border-b pb-5 border-b-purple-500">
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
            <div className="content-post mt-6 border-b border-b-purple-500 pb-5 text-white  overflow-scroll h-full">
              <div className="h-52 max-h-52">{post.content}</div>
            </div>
            <div className="h-fit">
              <div className="comments mt-5 overflow-scroll h-auto max-h-80" ref={boxCommentRef}>
                {data?.getComments &&
                  data?.getComments.map((comment) => {
                    continueComment.current = comment._id;
                    return <Comment key={comment._id} comment={comment} />;
                  })}
                <div ref={commentEndRef} />
              </div>
            </div>
            <div className="flex flex-row w-full gap-5">
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
export default ModalComment;
