const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

/**
 * This is just a helper function for checking if the given context (headers)
 * match with the wanted token
 */
module.exports = (context) => {
  // Here the context will include many headers of which one is the auth
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Build structure in auth Header -> Bearer ...
    // So we split the authheader and take the second element
    const token = authHeader.split("Bearer ")[1];

    // check if this really exists
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (e) {
        throw new AuthenticationError("Invalid token");
      }
    }
    // If TOKEN fails
    throw new Error("Authentication token in wrong format");
  }
  // If we get no authHeader
  throw new Error("Authorization header not given");
};
