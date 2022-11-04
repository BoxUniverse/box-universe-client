import CredentialsProvider from 'next-auth/providers/credentials';
import client from '../ApolloClient';
import login from '@mutations/login.graphql';
import * as crypto from 'crypto';

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
        mutation: login,
        variables: {
          loginInput: {
            username,
            password,
            nonce,
          },
        },
      });

      const { username: _username, email, _id } = data.login;

      const response = {
        username: _username,
        email,
        _id,
        id: _id,
      };

      return response;
    } catch (error) {
      console.log(error);

      throw new Error('Unauthorized');
    }
  },
});
