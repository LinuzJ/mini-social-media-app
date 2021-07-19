const Post = require("../../models/Post");

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
};
