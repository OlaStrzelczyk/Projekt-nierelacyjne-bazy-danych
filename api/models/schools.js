const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true},  
    contact: { type: String, required: true },
});

module.exports = mongoose.model("School", schoolSchema);