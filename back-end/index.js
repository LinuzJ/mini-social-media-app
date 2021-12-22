// dependencies
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// "local" imports
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const dotenv = require("dotenv");
require("dotenv").config();

const PORT = process.env.port || 5000;

// Setup Apollo server for graphql handling
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Setup and connection to the MONGODB database
mongoose
  .connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MONGODB conn successful");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is up and running at ${res.url}`);
  })
  .catch((err) => console.log(err));
