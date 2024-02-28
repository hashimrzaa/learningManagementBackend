const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  timing: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
