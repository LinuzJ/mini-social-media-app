const post = require("../../models/Post");

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
  },
};
