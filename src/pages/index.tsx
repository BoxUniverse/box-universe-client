import React, { ReactElement, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import('../components/Newsfeed'), {
  suspense: true,
});
import WritePost from '@components/WritePost';
import Newsfeed from '@components/Newsfeed';
import MainLayout from '@layouts/MainLayout';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

import _getProfile from '@queries/getProfile.graphql';
import { client } from '../ApolloClient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import { update } from '@features/user/userSlice';
import attachToken from '@source/injection/attachToken';
import { useLazyQuery, useQuery } from '@apollo/client';

type NextPageProps = {
  data: any;
  client;
};

const Home: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <WritePost />
      <Newsfeed />
    </>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = attachToken(() =>
  // const session = await getSession(context);
  //
  // const pid = session?.user?._id;
  //
  // if (pid) {
  //   const { data } = (await client.query({
  //     query: _getProfile,
  //     variables: {
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
