const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  mobileno: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  date: { type: Date, default: Date.now },
});
var userModel = mongoose.model("User", userSchema);
module.exports = userModel;
