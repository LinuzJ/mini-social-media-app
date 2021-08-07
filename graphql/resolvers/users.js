const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const dotenv = require("dotenv");
require("dotenv").config();

const User = require("../../models/User");

// helpers
function makeToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}
function validateRegisterNewUser(username, email, password, confirmPassword) {
  // Variable to store errors in registration
  const errors = {};
  const regExForEmail =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

  // Check if username is correct
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }

  // Check email
  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else if (!email.match(regExForEmail)) {
    errors.email = "Email not in correct format, must be valid adress";
  }

  // Then check password
  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
function validateLogin(username, password) {
  // Variable to store errors
  const errors = {};

  // Check if username is correct
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  // Then check password
  if (password === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

// EXPORTS
module.exports = {
  Mutation: {
    // Async function to login
    async login(_, { username, password }) {
      // First validate user
      const { valid, errors } = validateLogin(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Check if user exists
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User was not found", { errors });
      }
      // Then check if the given password matches the users password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong password";
        throw new UserInputError("Wrong password", { errors });
      }
      // Create token
      const token = makeToken(user);

      return {
        ...user._doc,
        id: user._id,
        authToken: token,
      };
    },

    // Async function to register a new user
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // VALIDATE USER DATA
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

      const token = makeToken(res);

      return {
        ...res._doc,
        id: res._id,
        authToken: token,
      };
    },
  },
};
