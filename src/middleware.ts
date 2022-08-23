import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(function middleware(req: NextRequestWithAuth) {}, {
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
