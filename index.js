// dependencies
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

// "local" imports
const Post = require("./models/Post");
const dotenv = require("dotenv");
require("dotenv").config();

// main
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const recieved = await Post.find();
        return recieved;
      } catch (e) {
        throw new Error(e);
      }
    },
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
  })
  .then((res) => {
    console.log(`Server is up and running at ${res.url}`);
  });
