import React, { ReactElement } from 'react';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from './_app';

const Settings: NextPageWithLayout = () => <div>Settings</div>;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Settings;
