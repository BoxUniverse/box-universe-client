import { client } from '@src/ApolloClient';
import { LOGIN } from '@src/graphql';
import * as crypto from 'crypto';
import CredentialsProvider from 'next-auth/providers/credentials';

export default CredentialsProvider({
  type: 'credentials',
  credentials: {},

  async authorize(credentials: any) {
    const { username, password } = credentials as {
      username: string;
      password: string;
    };

    const data = `${username}.${password}.${process.env.SECRET}`;
    const nonce = crypto.createHash('md5').update(data).digest('hex');

    try {
      const { data } = await client.mutate({
        mutation: LOGIN,
        variables: {
          loginInput: {
            username,
            password,
            nonce,
          },
        },
      });

      return data.login;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  },
});
