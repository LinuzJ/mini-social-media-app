const { model, Schema } = require("mongoose");

const usrSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("User", usrSchema);
