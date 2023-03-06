import { useLazyQuery, useSubscription } from '@apollo/client';
import { Post } from '@components';
import { usePublish, useSubscribe } from '@hooks';
import { GET_POSTS, POST_ADDED } from '@src/graphql';
import React, { useEffect, useRef, useState } from 'react';

const Newsfeed = () => {
  const [getPost, { data, refetch }] = useLazyQuery(GET_POSTS);
  const [posts, setPosts] = useState([]);
  const publish = usePublish();
  const continuePost = useRef<string>(null);
  const { data: newPost } = useSubscription(POST_ADDED);

  useSubscribe('post.ADD', (payload) => {
    setPosts((prev) => [payload, ...prev]);
  });

  useEffect(() => {
    void getPost({
      variables: {
        payload: {},
      },
    });
  }, [getPost]);

  useEffect(() => {
    if (newPost) {
      setPosts((prev) => [newPost.postAdded, ...prev]);
      publish('post.ADD', newPost);
    }
  }, [newPost]);

  useEffect(() => {
    if (data?.getPosts) {
      setPosts((prev) => [...prev, ...data.getPosts]);
    }
  }, [data]);

  const handleOnScrollNF = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
      void refetch({
        payload: {
          _id: continuePost.current,
        },
      });
    }
  };
  return (
    <div className="mt-10">
      <div className="mb-10 uppercase text-xl border-b pb-3  w-24 whitespace-nowrap">
        <span>For you</span>
      </div>

      <div
        className="listPost pb-24 overflow-scroll"
        onScroll={handleOnScrollNF}
        style={{ height: '23rem' }}>
        {data?.getPosts &&
          posts?.map((post) => {
            continuePost.current = post._id;
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default Newsfeed;
