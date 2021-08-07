const postResolvers = require("./posts");
const userResolvers = require("./users");
const like_commentResolvers = require("./like_comment");

module.exports = {
  Post: {
    likesAmount: (parent) => parent.likes.length,
    commentsAmount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...like_commentResolvers.Mutation,
  },
};
