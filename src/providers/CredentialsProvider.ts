import CredentialsProvider from 'next-auth/providers/credentials';
import client from '../ApolloClient';
import login from '@mutations/login.graphql';

export default CredentialsProvider({
  type: 'credentials',
  credentials: {},
  async authorize(credentials: any) {
    const { username, password } = credentials as {
      username: string;
      password: string;
    };

    try {
      const { data } = await client.mutate({
        mutation: login,
        variables: {
          userInput: {
            username,
            password,
          },
        },
      });

      const { user } = data.login;

      const response = {
        username: user.username,
        email: user.email,
        _id: user._id,
        id: user._id,
      };
      return response;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  },
});
