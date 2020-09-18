const mongoose = require("mongoose");

var oppSchema = new mongoose.Schema({
  jobtitle: {
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

  date: { type: Date, default: Date.now },
});
var oppModel = mongoose.model("Opp", oppSchema);
module.exports = oppModel;
