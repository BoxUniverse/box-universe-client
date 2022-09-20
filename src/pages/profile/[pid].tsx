import React, { ReactElement } from 'react';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from '@pages/_app';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      {pid}
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Profile;
