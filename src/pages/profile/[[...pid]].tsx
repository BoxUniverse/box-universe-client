import React, { ReactElement } from 'react';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from '@pages/_app';
import Head from 'next/head';
import ProfileInformation from '@components/ProfileInformation';
import client from '@src/ApolloClient';
import { GetServerSideProps } from 'next';
import _getProfile from '@queries/getProfile.graphql';
import { getSession } from 'next-auth/react';

type NextPageProps = {
  data: any;
  me: boolean;
};

const Profile: NextPageWithLayout = ({ data, me }: NextPageProps) => {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileInformation data={data.getProfile} me={me} />
    </div>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const session = await getSession(context);
  const pid = params.pid?.[0] || session.sub;
  let me = false;

  if (!params.pid?.[0] || pid === session.sub) {
    me = true;
  }

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
        me,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
    props: {},
  };
};

export default Profile;
