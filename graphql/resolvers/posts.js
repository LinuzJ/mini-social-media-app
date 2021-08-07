const Post = require("../../models/Post");
const checkAuth = require("./checkAuth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const recieved = await Post.find().sort({ createdAt: -1 });
        return recieved;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("POST NOT FOUND");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  // THEN MUTATIONS
  Mutation: {
    // ---------------------- CREATE POST --------------------------
    async createPost(_, { body }, context) {
      // First validate the user
      const user = checkAuth(context);

      // Then check if the post body is Empty
      if (args.body.trim().length === 0) {
        throw new UserInputError("The post cannot be empty");
      }

      // If the checkAuth function does not throw an error and we actually get a user back
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      // Then actually save the new post
      const post = await newPost.save();

      return post;
    },
    // ---------------------- DELETE POST --------------------------
    async deletePost(_, { postId }, context) {
      // Find and check the user
      const user = checkAuth(context);

      // Then make sure the user is the author of the post, then delete the post
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted!";
        } else {
          throw new AuthenticationError("This is not your post!");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
