"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Admin from "../models/admin";
import Student from "../models/student";
import Teacher from "../models/teacher";
import dbConnect from "./db";

export async function adminLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await dbConnect();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return { message: "Invalid credentials" };
    }

    if (password !== admin.pass) {
      return { message: "Invalid credentials" };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    cookies().set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/admin",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }

  redirect("/admin/dashboard");
}

export async function teacherLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await dbConnect();
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return { message: "Invalid credentials" };
    }

    const encPass = btoa(teacher.phone.slice(-4)).slice(0, -2);

    if (password !== teacher.pass) {
      return { message: "Invalid credentials" };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    cookies().set("teacherToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/teacher",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }

  redirect("/teacher/dashboard");
}

export async function studentLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await dbConnect();
    const student = await Student.findOne({ email });

    if (!student) {
      return { message: "Invalid credentials" };
    }

    const encPass = btoa(student.phone.slice(-4)).slice(0, -2);

    if (password !== student.pass) {
      return { message: "Invalid credentials" };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    cookies().set("studentToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/student",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }

  redirect("/student/dashboard");
}
