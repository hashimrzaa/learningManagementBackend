const mongoose = require("mongoose");

const stdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please also submit email"],
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Student", stdSchema);
