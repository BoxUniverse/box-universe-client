import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, from, ApolloLink, split } from '@apollo/client';
import WebSocket from 'ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { getCookie } from 'cookies-next';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

let apolloClient: ApolloClient<any>;

// BUG: token always null
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createApolloClient(pageProps?: any, ...link: any) {
  const cookies = pageProps?.cookies;

  // const httpLink = new HttpLink({
  //   uri: 'http://172.26.22.101:3000/graphql',
  //   credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  //   headers: {
  //     Authorization: `Bearer ${cookies?.accessToken}`,
  //     'Access-Control-Allow-Credentials': '*',
  //   },
  // });
  const uploadLink: any = createUploadLink({
    uri: 'http://172.26.22.101:3000/graphql',

    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      Authorization: `Bearer ${cookies?.accessToken}`,
      'Access-Control-Allow-Credentials': '*',
    },
  });
  const wsLink =
    // typeof window !== 'undefined'
    new GraphQLWsLink(
      createClient({
        webSocketImpl: WebSocket,
        url: 'ws://172.26.22.101:3000/subscription',
      }),
    );
  const splitLink =
    typeof window !== 'undefined' && wsLink !== null
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return def.kind === 'OperationDefinition' && def.operation === 'subscription';
          },
          wsLink,
          uploadLink,
        )
      : uploadLink;
  // NOTE: We don't need http link when we have upload link
  return new ApolloClient({
    link: from([...link, errorLink, splitLink]),

    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    connectToDevTools: true,
  });
}
export const client = createApolloClient(
  null,
  new ApolloLink((operation, forward) => {
    const token = getCookie('accessToken');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        'Access-Control-Allow-Credentials': '*',
      },
    });

    return forward(operation);
  }),
);
export function initializeApollo(pageProps: any) {
  return apolloClient ?? createApolloClient(pageProps);
}

export function useApollo(statePageProps: any) {
  return useMemo(() => initializeApollo(statePageProps), [statePageProps]);
}
