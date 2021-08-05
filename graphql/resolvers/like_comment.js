const Post = require("../../models/Post");
const checkAuth = require("./checkAuth");
const { UserInputError } = require("apollo-server");
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
          user: user.username,
          createdAt: new Date().toISOString(),
        });
        // Save the post, then return the object
        await post.save();
        return post;
      } else throw new UserInputError("Post is not availible");
    },
  },
};
