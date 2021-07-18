const { gql } = require("apollo-server");
const Post = require("../models/Post");

module.export = gql`
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
