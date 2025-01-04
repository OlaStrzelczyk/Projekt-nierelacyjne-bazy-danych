const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  classname: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  author: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);