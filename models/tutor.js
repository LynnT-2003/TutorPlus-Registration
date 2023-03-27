const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  tutorId: {
    type: String,
    required: true,
    unique: true,
  },
  tutorName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tutors", tutorSchema);
