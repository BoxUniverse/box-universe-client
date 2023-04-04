import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getCookie } from 'cookies-next';
import { createClient } from 'graphql-ws';
import { useMemo } from 'react';

let apolloClient: ApolloClient<any>;

// BUG: token always null
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
        )}, Path: ${path}`,
      ),
    );
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createApolloClient(pageProps?: any, ...link: any) {
  const cookies = pageProps?.cookies;

  const uploadLink: any = createUploadLink({
    uri: 'https://host.docker.internal:2604/graphql/',
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      authorization: `Bearer ${cookies?.accessToken}`,
    },
  });

  // const wsLink = process.browser
  //   ? new WebSocketLink(
  //       new SubscriptionClient('ws://localhost:2604/graphql/', {
  //         lazy: true,
  //         reconnect: true,
  //         timeout: 30000,
  //         inactivityTimeout: 10000,
  //         connectionParams: {
  //           Authorization: `Bearer ${cookies?.accessToken}`,
  //           'Access-Control-Allow-Credentials': '*',
  //           'Access-Control-Allow-Origin': '*',
  //         },
  //       }),
  //     )
  //   : null;

  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: 'wss://host.docker.internal:2604/graphql',
            lazy: true,
            connectionParams: {
              authorization: `Bearer ${cookies?.accessToken}`,
              subscription: true,
            },
          }),
        )
      : null;
  // const wsLink = process.browser
  //   ? new WebSocketLink({
  //       uri: `ws://localhost:2604/graphql/`,
  //       options: {
  //         reconnect: true,
  //         connectionParams: {
  //           Authorization: `Bearer ${cookies?.accessToken}`,
  //           'Access-Control-Allow-Credentials': '*',
  //         },
  //       },
  //     })
  //   : null;
  const splitLink =
    typeof window !== 'undefined' && wsLink !== null && process.browser
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
