import { ProfileInformation } from '@components';
import MainLayout from '@layouts/MainLayout';
import { NextPageWithLayout } from '@pages/_app';
import { GET_PROFILE } from '@queries';
import { client } from '@src/ApolloClient';
import attachToken from '@src/injection/attachToken';
import { RootState } from '@stores/app';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

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
    query: GET_PROFILE,
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
