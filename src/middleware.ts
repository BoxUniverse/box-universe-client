import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: function ({ token }) {
      return !!token;
    },
  },
  cookies: {
    sessionToken: {
      name: 'accessToken',
    },
  },
});

export const config = { matcher: ['/chat', '/notifications', '/', '/settings'] };
