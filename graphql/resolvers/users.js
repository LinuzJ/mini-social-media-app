const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const User = require("../../models/User");

module.exports = {
  Change: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: VALIDATE USER DATA
      // TODO: MAKE SURE USER != EXIST
      // TODO: HASH PASSRD AND CREATE AUTH TOKEN
      password = await bcrytp.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expires: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
