const { default: mongoose } = require("mongoose");
const Course = require("../models/coursemod");
// add
const addCourse = async (req, res) => {
  const { timing, courseName } = req.body;
  try {
    const course = await Course.create({ timing, courseName });
    res.status(201).send({ message: "Course added." });
  } catch (error) {
    res.status(400).send({ message: "error occured", error: error });
  }
};
// get
const getCourse = async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).send({ course: course });
  } catch (error) {
    res.status(404).send({ message: "not found" });
  }
};

// getone
const getSingleCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  res.status(200).send({ course: course });
};

// delete
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "no such course" });
    return;
  }
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    res.status(404).send({ message: "Course not found" });
    return;
  }
  res.status(202).send({ message: "Course deleted" });
};

// update
const editCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, { ...req.body });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "no such course" });
    return;
  }
  if (!course) {
    res.send({ error: "no course found" });
    return;
  }
  res.send({ message: "course updated", course: course });
};
module.exports = {
  getCourse,
  addCourse,
  editCourse,
  deleteCourse,
  getSingleCourse,
};
