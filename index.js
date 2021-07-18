const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Test1",
  },
};

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
  });

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server is up and running at ${res.url}`);
});
