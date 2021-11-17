const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  detail: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("comments", schema);
