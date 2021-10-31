import React from "react";
import App from "./App";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";

// Create a link between Apollo and backend
const linkToBackend = createHttpLink({
  uri: process.env.REACT_APP_URI_TO_BACKEND,
});

// Set Authorixzation context
const authLink = setContext(() => {
  const jwtToken = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: jwtToken ? `Bearer ${jwtToken}` : "", // Set headers/Authorization to bear jwt token if logged in
    },
  };
});

// Create Apollo Client
const client_apollo = new ApolloClient({
  link: authLink.concat(linkToBackend),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client_apollo}>
    <App />
  </ApolloProvider>
);
