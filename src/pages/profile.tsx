import React, { ReactElement } from 'react';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from './_app';
import Head from 'next/head';

const Profile: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Profile;
