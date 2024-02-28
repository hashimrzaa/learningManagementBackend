const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { addStd, getStd, getSingleStd } = require("./Controllers/stdController");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const connectHrDb = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/v1/std", getStd);
app.post("/api/v1/std", addStd);
app.get("/api/v1/std/:id", getSingleStd);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
