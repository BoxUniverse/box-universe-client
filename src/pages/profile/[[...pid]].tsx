import React, { ReactElement, useEffect } from 'react';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from '@pages/_app';
import Head from 'next/head';
import ProfileInformation from '@components/ProfileInformation';
import { client } from '@source/ApolloClient';
import { GetServerSideProps } from 'next';
import _getProfile from '@queries/getProfile.graphql';
import { getSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/app';
import { ApolloProvider, useApolloClient } from '@apollo/client';
import attachToken from '@source/injection/attachToken';

type NextPageProps = {
  data: any;
  me: boolean;
};

const Profile: NextPageWithLayout = ({ data, me }: NextPageProps) => {
  const user = useSelector<RootState>((state) => state.userSlice.user) as Object;

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileInformation data={data ? data : user} me={me} />
    </div>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = attachToken(async (context) => {
  const { params } = context;
  const session = await getSession(context);

  const pid = params.pid?.[0] || session.user._id;

  let me = false;

  if (!params.pid?.[0] || pid === session.user._id) {
    me = true;

    return {
      props: {
        data: null,
        me,
      },
    };
  }

  const { data } = (await client.query({
    query: _getProfile,
    variables: {
      profileInput: {
        id: pid,
      },
    },
  })) as any;
  return {
    props: {
      data: data?.getProfile || null,
      me,
    },
  };
});

export default Profile;
