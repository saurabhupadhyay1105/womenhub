const mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  organisation: {
    type: String,
  },

  username: {
    type: String,
    required: true,
  },

  applylink:{
    type: String,
    required:true,
  },

  category:{
    type: String,
    required:true,
  },

  date: { type: Date, default: Date.now },
});
var jobModel = mongoose.model("Job", jobSchema);
module.exports = jobModel;
