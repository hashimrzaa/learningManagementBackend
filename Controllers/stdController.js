const { default: mongoose } = require("mongoose");
const Student = require("../models/stdmod");

const addStd = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const student = await Student.create({ name, email, age });
    res.status(201).send({ message: "student added." });
  } catch (error) {
    res.status(500).send({ message: "email should be unique", error: error });
  }
};
const getStd = async (req, res) => {
  try {
    const student = await Student.find({});
    res.status(200).send({ student: student });
  } catch (error) {
    res.status(404).send({ message: "error occured" });
  }
};
const getSingleStd = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  res.status(200).send({ student: student });
};

const deleteStd = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "no such student" });
    return;
  }
  const student = await Student.findByIdAndDelete(id);
  if (!student) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  res.status(202).send({ message: "user deleted" });
};
const editStd = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, { ...req.body });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "no such student" });
    return;
  }
  if (!student) {
    res.send({ error: "no student found" });
    return;
  }
  res.send({ message: "student updated", student: student });
};

module.exports = { addStd, getStd, getSingleStd, deleteStd, editStd };
