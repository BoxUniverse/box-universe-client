import CredentialsProvider from '@providers/CredentialsProvider';
import DiscordProvider from '@providers/DiscordProvider';
import FacebookProvider from '@providers/FacebookProvider';
import GithubProvider from '@providers/GithubProvider';
import GoogleProvider from '@providers/GoogleProvider';
import { client } from '@src/ApolloClient';
import { OAUTH } from '@src/graphql';
import { CookieSerializeOptions } from 'cookie';
import * as crypto from 'crypto';
import NextAuth, { NextAuthOptions } from 'next-auth';

export const cookiesOptions: CookieSerializeOptions = {
  sameSite: 'lax',
  secure: true,
  httpOnly: true,
  path: '/',
};

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
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
      // login with provider oauth
      if (account.provider !== 'credentials') {
        const data = `${user.id}.${account.provider}.${process.env.SECRET}`;
        const hash = crypto.createHash('md5').update(data).digest('hex');

        try {
          await client.mutate({
            mutation: OAUTH,
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
          return false;
        }
      }

      return !!user;
    },
    async session({ session, token }) {
      session.user.username = token.username as string;
      session.user.email = token.email;
      session.user._id = token._id as string;
      if (token._id) session.user._id = token._id as string;
      else session.user._id = token.sub;
      return { ...session };
    },
    async jwt({ token, user }) {
      if (user?.username) {
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token._id = user._id;
      }

      return { ...token };
    },
    async redirect({ url, baseUrl }) {
      return '/';
    },
  },
};
export default NextAuth(authOptions);
