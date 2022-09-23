import React, { ReactElement } from 'react';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from '@pages/_app';
import Head from 'next/head';
import ProfileInformation from '@components/ProfileInformation';
import client from '@src/ApolloClient';
import { GetServerSideProps } from 'next';
import _getProfile from '@queries/getProfile.graphql';

type NextPageProps = {
  data: any;
};

const Profile: NextPageWithLayout = ({ data }: NextPageProps) => {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileInformation data={data.getProfile} />
    </div>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pid } = context.params;
  const { data, error } = (await client.query({
    query: _getProfile,
    variables: {
      profileInput: {
        id: pid,
      },
    },
    errorPolicy: 'all',
  })) as any;
  console.log(error, data);

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
      destination: '/',
    },
    props: {},
  };
};

export default Profile;
