const postResolvers = require("./posts");
const userResolvers = require("./users");
const like_commentResolvers = require("./like_comment");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...like_commentResolvers.Mutation
  },
};
