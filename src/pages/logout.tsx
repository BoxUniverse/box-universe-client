import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.setItem('persist:root', '');
  }, []);
};

export async function getServerSideProps(ctx: any) {
  ctx.res.setHeader('Set-Cookie', [`accessToken=deleted; Max-Age=0`]);
  return {
    redirect: {
      destination: '/auth/login',
    },
  };
}

export default Logout;
