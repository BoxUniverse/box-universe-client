import { client } from '@src/ApolloClient';
import { LOGIN } from '@mutations';
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
      const { data: auth } = await client.mutate({
        mutation: LOGIN,
        variables: {
          loginInput: {
            username,
            password,
            nonce,
          },
        },
      });

      if (!auth.login) throw new Error('Login failed !!');
      // eslint-disable-next-line no-console
      console.log(auth);
      return auth.login;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw new Error('Unauthorized Credentials Provider');
    }
  },
});
