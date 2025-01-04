const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema({
    name: { type: String, required: true }, 
    bio: { type: String, required: true },
    experience: { type: Number, required: true },
    contact: { type: String, required: true }, 
    rating: { type: Number, min: 0, max: 5 } 
});

module.exports = mongoose.model("Trainer", trainerSchema);