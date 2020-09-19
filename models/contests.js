const mongoose = require("mongoose");

var contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  applylink: {
    type: String,
    required: true,
  },

  date: { type: Date, default: Date.now },
});
var contestModel = mongoose.model("Contest", contestSchema);
module.exports = contestModel;
