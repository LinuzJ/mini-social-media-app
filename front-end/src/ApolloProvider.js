import React from "react";
import App from "./App";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";

const linkToBackend = createHttpLink({
  uri: process.env.REACT_APP_URI_TO_BACKEND,
});
console.log(process.env);

const client_apollo = new ApolloClient({
  link: linkToBackend,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client_apollo}>
    <App />
  </ApolloProvider>
);
