const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  subTitle: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("feedbacks", schema);
