const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("students", studentSchema);
