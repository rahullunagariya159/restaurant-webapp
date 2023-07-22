import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, {Auth}  from 'aws-amplify';
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'


import './index.css';
import App from './App';
import aws_exports from './aws-exports';
import reportWebVitals from './reportWebVitals';
import "tailwindcss/tailwind.css"

const config = {
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  auth: {
    type: aws_exports.aws_appsync_authenticationType,
    apiKey: aws_exports.aws_appsync_apiKey,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()

  }
}
const link = ApolloLink.from([
  createAuthLink(config),
  createSubscriptionHandshakeLink(config),
  createHttpLink({ uri: aws_exports.aws_appsync_graphqlEndpoint }),
]);


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    resultCaching: true,
    addTypename: false
  }),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
      // used for all queries
      fetchPolicy: 'cache-and-network'
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});

Amplify.configure(aws_exports);

ReactDOM.render(

    <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
