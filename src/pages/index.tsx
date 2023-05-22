import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { Newsfeed, WritePost } from '@components';
import MainLayout from '@layouts/MainLayout';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';

import attachToken from '@src/injection/attachToken';
import { usePublish, useSubscribe } from '@hooks';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { GET_POSTS, POST_ADDED } from '@src/graphql';
import { last } from 'lodash';

const Home: NextPageWithLayout = () => {
  const [getPost, { data, refetch }] = useLazyQuery(GET_POSTS);
  const [posts, setPosts] = useState([]);
  const listPostRef = useRef<HTMLDivElement>(null);
  const continuePost = useRef<string>(null);

  const { data: newPost } = useSubscription(POST_ADDED);
  const publish = usePublish();
  useEffect(() => {
    void getPost({
      variables: {
        payload: {},
      },
    });
  }, [getPost]);

  useSubscribe('post.ADD', (payload) => {
    setPosts((prev) => [payload, ...prev]);
  });

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
  const handleOnScrollNF = () => {
    if (listPostRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listPostRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        const lastPost = last(posts);
        refetch({
          payload: {
            _id: lastPost?._id,
          },
        });
      }
    }
  };
  return (
    <div
      className={'overflow-scroll'}
      style={{ height: '99.5%' }}
      onScroll={handleOnScrollNF}
      ref={listPostRef}>
      <Head>
        <title>Home</title>
      </Head>
      <WritePost />
      <Newsfeed posts={posts} />
    </div>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = attachToken(() =>
  // const session = await getSession(context); const pid = session?.user?._id; if (pid) { const { data } = (await client.query({ query: _getProfile, variables: {
  //       profileInput: {
  //         id: pid,
  //       },
  //     },
  //     // errorPolicy: 'all',
  //   })) as any;
  //
  //   if (data) {
  //     const profile = data?.getProfile;
  //
  //     return {
  //       props: {
  //         data: {
  //           avatar: profile?.avatar,
  //           name: profile?.name,
  //           email: profile?.email,
  //           friends: profile.friends,
  //         },
  //       },
  //     };
  //   }
  // }
  // return {
  //   redirect: {
  //     permanent: false,
  //     destination: '/auth/login',
  //   },
  //   props: {},
  // };
  ({
    props: {},
  }),
);

export default Home;
