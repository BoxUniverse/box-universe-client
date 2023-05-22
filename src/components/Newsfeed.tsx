import { useLazyQuery, useSubscription } from '@apollo/client';
import { Post } from '@components';
import { usePublish, useSubscribe } from '@hooks';
import { GET_POSTS, POST_ADDED } from '@src/graphql';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  posts: any;
};

const Newsfeed = ({ posts }: Props) => {
  return (
    <div className="mt-10">
      <div className="mb-10 uppercase text-xl border-b pb-3  w-24 whitespace-nowrap font-semibold">
        <span>For you</span>
      </div>

      <div className="listPost pb-24 ">
        {posts &&
          posts?.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default Newsfeed;
