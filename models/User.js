const { model, Schema } = require("mongoose");

const usrSchema = new Scema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("User", usrSchema);
