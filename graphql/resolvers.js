const Post = require("../models/Post.js");

const postResolver = {
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

module.export = {
  Query: {
    ...postResolver,
  },
};
