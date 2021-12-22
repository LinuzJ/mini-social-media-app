const Post = require("../../models/Post");
const checkAuth = require("./checkAuth");
const { UserInputError, AuthenticationError } = require("apollo-server");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      // First check if user is logged in via the checkAuth function
      const user = checkAuth(context);

      // Then filter out cases where the comment is empty
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body cannot be empty",
          },
        });
      }

      // Then get the post object from ou db
      const post = await Post.findById(postId);

      // Add the comment if the post exists, then save it to the db. Else throw error
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        // Save the post, then return the object
        await post.save();
        return post;
      } else throw new UserInputError("Post is not availible");
    },
    // Then we create the function for deleting comments
    async deleteComment(_, { postId, commentId }, context) {
      // Validate user
      const user = checkAuth(context);
      // Find the post object in question
      const post = await Post.findById(postId);

      if (post) {
        // Find the comment that we are looking for from within the post object
        const commentIdx = post.comments.findIndex((x) => x.id === commentId);
        // If the the creator of the comment matches the comment objects user
        if (post.comments[commentIdx].username === user.username) {
          // Delete post and save -> return post object
          post.comments.splice(commentIdx, 1);
          await post.save();
          return post;
        } else {
          // Safety if something goes wrong
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
    // Like function
    async likePost(_, { postId }, context) {
      // Validate user
      const user = checkAuth(context);
      // Find the post object in question
      const post = await Post.findById(postId);

      if (post) {
        // First check if a like exists
        if (post.likes.find((x) => x.username === user.username)) {
          // If like exists, unlike it
          post.likes = post.likes.filter((x) => x.username !== user.username);
          await post.save();
        } else {
          // If not liked, like it by adding a like object
          const likeToAdd = {
            username: user.username,
            createdAt: new Date().toISOString(),
          };
          post.likes.push(likeToAdd);
          await post.save();
        }
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
