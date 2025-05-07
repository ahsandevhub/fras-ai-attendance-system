// models/student.js
import mongoose from "mongoose";

// Define the Student schema
const attendanceSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  sec: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  attendance: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to prevent redefinition
const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
