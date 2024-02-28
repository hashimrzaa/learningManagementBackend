const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  addStd,
  getStd,
  getSingleStd,
  deleteStd,
  editStd,
} = require("./Controllers/stdController");
const {
  getCourse,
  addCourse,
  getSingleCourse,
  deleteCourse,
  editCourse,
} = require("./Controllers/courseControllers");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Hr Middleware
app.use(cors());
app.use(express.json());

// Hr Mongo Db
const connectDB = async () => {
  try {
    const connectHrDb = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectDB();

// student
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/v1/std", getStd);
app.post("/api/v1/std", addStd);
app.get("/api/v1/std/:id", getSingleStd);
app.delete("/api/v1/std/:id", deleteStd);
app.put("/api/v1/std/:id", editStd);

// Course
app.get("/api/v1/course", getCourse);
app.post("/api/v1/course", addCourse);
app.get("/api/v1/course/:id", getSingleCourse);
app.delete("/api/v1/course/:id", deleteCourse);
app.put("/api/v1/course/:id", editCourse);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
