const mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
  },

  date: { type: Date, default: Date.now },
});
var blogModel = mongoose.model("Blog", blogSchema);
module.exports = BlogModel;
