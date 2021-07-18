// dependencies
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// "local" imports
const { typeDefs } = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const dotenv = require("dotenv");
require("dotenv").config();

// main

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MONGODB conn successful");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is up and running at ${res.url}`);
  });
