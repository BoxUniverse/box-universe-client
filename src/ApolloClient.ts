import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import Cookies from 'js-cookie';

const httpLink = createUploadLink({
  uri: 'http://172.26.22.101:3000/graphql',
});
const authLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get('accessToken');

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      'Access-Control-Allow-Credentials': '*',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
