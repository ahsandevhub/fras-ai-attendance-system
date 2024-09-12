"use server";

import { dbConnect } from "@/app/lib/db";
import Student from "@/app/models/student";
import Teacher from "@/app/models/teacher";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import Course from "../models/course";

// Initialize S3 client
const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = "frasbucket";

// Helper function to upload image to S3
async function uploadToS3(newFilename, buffer, fileType, folder) {
  const uploadParams = {
    Bucket: bucketName,
    Key: `${folder}/${newFilename}`,
    Body: buffer,
    ContentType: fileType,
  };
  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  return `https://${bucketName}.s3.amazonaws.com/${folder}/${newFilename}`;
}

// Helper function to delete image from S3
async function deleteFromS3(key) {
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new DeleteObjectCommand(deleteParams);
  await s3.send(command);
}

export async function addStudent(formData) {
  try {
    await dbConnect();

    const studentData = {
      dept: formData.get("dept"),
      sem: formData.get("sem"),
      sec: formData.get("sec"),
      id: formData.get("id"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      photo: formData.get("photo"),
    };

    const file = studentData.photo;
    const newFilename = `${studentData.id}.${file.name.split(".").pop()}`;

    // Convert image to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload image to S3
    const s3Url = await uploadToS3(
      newFilename,
      buffer,
      file.type,
      "images/students",
    );

    // Update student data with the S3 file URL
    studentData.photo = s3Url;

    // Save student data to the database
    await Student.create({ ...studentData, pass: "123456" });
  } catch (error) {
    console.error("Failed to add student: ", error);
    throw new Error("Failed to add student!");
  }

  revalidatePath("/admin/dashboard/students?sort=desc");
  redirect("/admin/dashboard/students?sort=desc");
}

export async function updateStudent(_id, formData) {
  try {
    await dbConnect();

    // Fetch the student to check if a photo already exists
    const existingStudent = await Student.findById(_id);
    if (!existingStudent) {
      throw new Error("Student not found!");
    }

    const studentData = {
      dept: formData.get("dept"),
      sem: formData.get("sem"),
      sec: formData.get("sec"),
      id: formData.get("id"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    };

    const newPhoto = formData.get("photo");

    if (newPhoto && newPhoto.size > 0) {
      const newFilename = `${studentData.id}.${newPhoto.name.split(".").pop()}`;
      const arrayBuffer = await newPhoto.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // If the student has an old photo, delete it from S3
      if (existingStudent.photo) {
        const oldPhotoKey = path.basename(existingStudent.photo);
        await deleteFromS3(`images/students/${oldPhotoKey}`);
      }

      // Upload the new photo to S3
      const s3Url = await uploadToS3(
        newFilename,
        buffer,
        newPhoto.type,
        "images/students",
      );
      studentData.photo = s3Url;
    }

    // Update the student in the database
    await Student.findByIdAndUpdate(_id, { ...studentData }, { new: true });
  } catch (error) {
    console.error("Failed to update student:", error);
    throw new Error("Failed to update student!");
  }

  revalidatePath(`/admin/dashboard/students?id=${formData.get("id")}`);
  redirect(`/admin/dashboard/students?id=${formData.get("id")}`);
}

export async function removeStudent(_id) {
  try {
    await dbConnect();
    const student = await Student.findById(_id);

    if (!student) {
      throw new Error("Student not found!");
    }

    await Student.findByIdAndDelete(_id);

    // If the student has a photo, delete it from S3
    if (student.photo) {
      const photoKey = path.basename(student.photo);
      await deleteFromS3(`images/students/${photoKey}`);
    }
  } catch (error) {
    console.error("Failed to remove student:", error);
    throw new Error("Failed to remove student!");
  }

  revalidatePath("/admin/dashboard/students");
  redirect("/admin/dashboard/students");
}

export async function addTeacher(formData) {
  try {
    await dbConnect();

    const teacherData = {
      dept: formData.get("dept"),
      name: formData.get("name"),
      tag: formData.get("tag"),
      designation: formData.get("designation"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      photo: formData.get("photo"),
    };

    const file = teacherData.photo;
    const sanitizedDept = teacherData.dept.replace(/[^a-zA-Z0-9]/g, "_");
    const sanitizedName = teacherData.name.replace(/[^a-zA-Z0-9]/g, "_");
    const sanitizedTag = teacherData.tag.replace(/[^a-zA-Z0-9]/g, "_");
    const newFilename = `${sanitizedDept}_${sanitizedName}_${sanitizedTag}.${file.name.split(".").pop()}`;

    // Convert image to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload image to S3
    const s3Url = await uploadToS3(
      newFilename,
      buffer,
      file.type,
      "images/teachers",
    );

    // Update teacher data with the S3 file URL
    teacherData.photo = s3Url;

    // Save teacher data to the database
    await Teacher.create({ ...teacherData, pass: "123456" });
  } catch (error) {
    console.error("Failed to add teacher:", error);
    throw new Error("Failed to add teacher!");
  }

  revalidatePath("/admin/dashboard/teachers?sort=desc");
  redirect("/admin/dashboard/teachers?sort=desc");
}

export async function removeTeacher(id) {
  try {
    await dbConnect();
    const result = await Teacher.findByIdAndDelete(id);

    if (!result) {
      return { error: "Teacher not found", status: 404 };
    }

    return { message: "Teacher removed successfully!", status: 200 };
  } catch (error) {
    console.error("Failed to remove teacher:", error);
    return { error: "Failed to remove teacher!", status: 500 };
  }
}

export async function addCourse(formData) {
  try {
    await dbConnect();
    const newCourse = await Course.create(formData);

    return {
      message: "Course added successfully!",
      status: 200,
      id: newCourse._id.toString(),
    };
  } catch (error) {
    console.error("Failed to add course:", error);
    return { error: "Failed to add course!", status: 500 };
  }
}
