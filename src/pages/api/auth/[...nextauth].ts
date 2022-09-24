import NextAuth, { NextAuthOptions } from 'next-auth';
import { CookieSerializeOptions } from 'cookie';
import CredentialsProvider from '@providers/CredentialsProvider';
import FacebookProvider from '@providers/FacebookProvider';
import GoogleProvider from '@providers/GoogleProvider';
import GithubProvider from '@providers/GithubProvider';
import * as crypto from 'crypto';
import client from '@src/ApolloClient';
import OAuth from '@mutations/OAuth.graphql';
import DiscordProvider from '@providers/DiscordProvider';

export const cookiesOptions: CookieSerializeOptions = {
  sameSite: 'lax',
  secure: true,
  httpOnly: true,
  path: '/',
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider,
    FacebookProvider,
    GoogleProvider,
    GithubProvider,
    DiscordProvider,
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 14,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 14,
    secret: process.env.SECRET,
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/logout',
    error: '/auth/login',
    newUser: '/auth/register',
    verifyRequest: '/auth/verify',
  },
  cookies: {
    sessionToken: {
      name: 'accessToken',
      options: cookiesOptions,
    },
    csrfToken: {
      name: 'csrfToken',
      options: cookiesOptions,
    },
    callbackUrl: {
      name: 'callbackUrl',
      options: cookiesOptions,
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider !== 'credentials') {
        const data = `${user.id}.${account.provider}.${process.env.SECRET}`;
        const hash = crypto.createHash('md5').update(data).digest('hex');

        try {
          await client.mutate({
            mutation: OAuth,
            variables: {
              OAuthInput: {
                name: user.name,
                email: user.email,
                nonce: hash,
                provider: account.provider,
                id: user.id,
              },
            },
          });
        } catch (error: any) {
          console.log(error);
          return false;
        }
      }
      return !!user;
    },
    async session({ session, token, user }) {
      session.username = token.username;
      session.email = token.email;
      session._id = token._id;
      session.user!.name = token.username as string;
      session.user!.name = token.name as string;
      session.user!.email = token.email as string;
      return { ...session, ...token, ...user };
    },
    async jwt({ token, user }) {
      if (user?.username) {
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
