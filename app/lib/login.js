"use server";

import { dbConnect } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";
import Student from "../models/student";
import Teacher from "../models/teacher";

export async function adminLogin(email, password) {
  try {
    await dbConnect();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return { error: "Admin not found", status: 404 };
    }

    if (password !== admin.pass) {
      return { error: "Invalid credentials", status: 401 };
    }

    const token = jwt.sign(
      { _id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: 60,
      },
    );
    return {
      message: "Login successful",
      token,
      _id: admin._id.toString(),
      status: 200,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }
}

export async function teacherLogin(email, password) {
  try {
    await dbConnect();
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return { error: "Teacher not found", status: 404 };
    }

    const encPass = btoa(teacher.phone.slice(-4)).slice(0, -2);

    if (password !== encPass) {
      return { error: "Invalid credentials", status: 401 };
    }

    const token = jwt.sign(
      { _id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return {
      message: "Login successful",
      token,
      _id: teacher._id.toString(),
      status: 200,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }
}

export async function studentLogin(email, password) {
  try {
    await dbConnect();
    const student = await Student.findOne({ email });

    if (!student) {
      return { error: "Student not found", status: 404 };
    }

    const encPass = btoa(student.phone.slice(-4)).slice(0, -2);

    if (password !== encPass) {
      return { error: "Invalid credentials", status: 401 };
    }

    const token = jwt.sign(
      { _id: student._id, role: "student" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return {
      message: "Login successful",
      token,
      _id: student._id.toString(),
      status: 200,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }
}
