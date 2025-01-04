const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  trainer: { type: String, required: true },
  review: { type: String, default: "Brak opinii" },
});

module.exports = mongoose.model("Class", classSchema);