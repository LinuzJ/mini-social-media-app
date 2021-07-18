const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const dotenv = require("dotenv");
require("dotenv").config();

const User = require("../../models/User");
const { validateRegisterNewUser } = require("./validators");
module.exports = {
  Mutation: {
    // Async function to register a new user
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: VALIDATE USER DATA
      const { valid, errors } = validateRegisterNewUser(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // MAKE SURE USER != EXIST
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken, ", {
          errors: {
            username: "This username is taken",
            name: user,
          },
        });
      }
      // HASH PASSRD AND CREATE AUTH TOKEN
      password = await bcrypt.hash(password, 10);

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
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
