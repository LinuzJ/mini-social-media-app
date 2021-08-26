import React from "react";
import App from "./App";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
<<<<<<< HEAD
const dotenv = require("dotenv");
=======
>>>>>>> 7f7fad63a6bf9d3bfb2aa8f59fcc1c2b17965487
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
