import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
const dotenv = require("../dotenv");
require("dotenv").config();

const linkToBackend = createHttpLink({
  uri: process.env.URI_TO_BACKEND,
});

const client_apollo = new ApolloClient({
  link: linkToBackend,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client_apollo}>
    <App />
  </ApolloProvider>
);
