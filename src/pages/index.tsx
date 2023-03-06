import { ReactElement } from 'react';

import { Newsfeed, WritePost } from '@components';
import MainLayout from '@layouts/MainLayout';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';

import attachToken from '@src/injection/attachToken';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <WritePost />
      <Newsfeed />
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
