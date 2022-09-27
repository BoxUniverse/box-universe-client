import React, { ReactElement } from 'react';
import WritePost from '@components/WritePost';
import Newsfeed from '@components/Newsfeed';
import MainLayout from '@layouts/MainLayout';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import _getProfile from '@queries/getProfile.graphql';
import client from '@src/ApolloClient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import { update } from '@features/user/userSlice';

type NextPageProps = {
  data: any;
};
const Home: NextPageWithLayout = ({ data }: NextPageProps) => {
  const dispatch = useDispatch<StoreDispatch>();

  const user = useSelector<RootState>((state) => state.userSlice.user) as Object;

  if (data) dispatch(update(data.getProfile));
  console.log(user);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  // const pid = params.pid?.[0] || session.sub;
  const pid = session.sub;
  // let me = false;
  //
  // if (!params.pid?.[0] || pid === session.sub) {
  //   me = true;
  // }

  const { data } = (await client.query({
    query: _getProfile,
    variables: {
      profileInput: {
        id: pid,
      },
    },
    errorPolicy: 'all',
  })) as any;

  if (data) {
    return {
      props: {
        data,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/auth/login',
    },
    props: {},
  };
};

export default Home;
