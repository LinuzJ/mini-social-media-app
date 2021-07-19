const Post = require("../../models/Post");
const checkAuth = require("./checkAuth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const recieved = await Post.find();
        return recieved;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPost(_, { postId }){
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("POST NOT FOUND");
        }
      } catch(e) {
        throw new Error(e);
    }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);
      // If the checkAuth function does not throw an error and we actually get a user back
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      // Then actually save the new post
      const post = await newPost.save();

      return post;
    }
  }
};
