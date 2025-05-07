"use server";

import dbConnect from "@/app/lib/db";
import Student from "@/app/models/student";
import Admin from "../models/admin";
import Course from "../models/course";
import Teacher from "../models/teacher";

export async function fetchAdmin(_id) {
  try {
    await dbConnect();

    const admin = await Admin.findById(_id).lean();

    if (!admin) {
      throw new Error("Admin not found!");
    }

    admin._id = admin._id.toString();
    return admin;
  } catch (error) {
    throw new Error("Failed to fetch Admin!");
  }
}

export async function fetchTeacher(_id) {
  try {
    await dbConnect();

    const teacher = await Teacher.findById(_id).lean();

    if (!teacher) {
      throw new Error("Teacher not found!");
    }

    teacher._id = teacher._id.toString();
    return teacher;
  } catch (error) {
    throw new Error("Failed to fetch Teacher!");
  }
}

export async function fetchStudent(_id) {
  try {
    await dbConnect();

    const student = await Student.findById(_id).lean();

    if (!student) {
      throw new Error("Student not found!");
    }

    student._id = student._id.toString();
    return student;
  } catch (error) {
    throw new Error("Failed to fetch student!");
  }
}

export async function fetchAllStudents({
  dept,
  sem,
  sec,
  id,
  limit,
  page,
  sort,
}) {
  try {
    await dbConnect();

    const query = {};
    if (dept) query.dept = dept;
    if (sem) query.sem = sem;
    if (sec) query.sec = sec;
    if (id) query.id = { $regex: id, $options: "i" };

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 50;
    const skip = (pageNumber - 1) * pageSize;

    const students = await Student.find(query)
      .sort({ _id: sort === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .sort({ id: 1 });

    const totalStudnets = await Student.countDocuments(query);

    if (!students) {
      throw new Error("Students not found!");
    }

    const studentsWithStringId = students.map((student) => ({
      ...student,
      _id: student._id.toString(),
    }));

    return {
      students: studentsWithStringId,
      totalPages: Math.ceil(totalStudnets / pageSize),
    };
  } catch (error) {
    throw new Error("Failed to fetch students!");
  }
}

export async function fetchStudentsForAttendance({ dept, sem, sec }) {
  try {
    await dbConnect();

    const query = {};
    if (dept) query.dept = dept;
    if (sem) query.sem = sem;
    if (sec) query.sec = sec;

    const students = await Student.find(query).lean().sort({ id: 1 });

    if (!students) {
      throw new Error("Students not found!");
    }

    const studentsWithStringId = students.map((student) => ({
      ...student,
      _id: student._id.toString(),
    }));

    return studentsWithStringId;
  } catch (error) {
    throw new Error("Failed to fetch students!");
  }
}

export async function fetchStudentIds({ dept, sem, sec }) {
  try {
    await dbConnect();
    const query = {};
    if (dept) query.dept = dept;
    if (sem) query.sem = sem;
    if (sec) query.sec = sec;

    const students = await Student.find(query, { id: 1, _id: 0 }).lean();
    if (!students || students.length === 0) {
      throw new Error("No students found!");
    }

    const studentIds = students.map((student) => student.id);
    return studentIds;
  } catch (error) {
    throw new Error("Failed to fetch student IDs!");
  }
}

export async function fetchAllTeachers({ dept }) {
  try {
    await dbConnect();
    const query = {};
    if (dept) query.dept = dept;

    const teachers = await Teacher.find(query).lean().sort({ _id: 1 });

    if (!teachers) {
      throw new Error("No teacher found!");
    }

    const teachersWithStringId = teachers.map((teacher) => ({
      ...teacher,
      _id: teacher._id.toString(),
    }));

    return teachersWithStringId;
  } catch (error) {
    throw new Error("Failed to fetch teachers!");
  }
}

export async function fetchAllTeacherName(dept) {
  try {
    await dbConnect();
    const query = {};
    if (dept) query.dept = dept;

    const teachers = await Teacher.find(query, { name: 1, tag: 1 })
      .lean()
      .sort({ _id: 1 });

    if (!teachers || teachers.length === 0) {
      throw new Error("No teacher name found!");
    }

    const teacherNames = teachers.map((teacher) => ({
      _id: teacher._id.toString(),
      name: teacher.name,
      tag: teacher.tag,
    }));

    return teacherNames;
  } catch (error) {
    throw new Error("Failed to fetch teachers name!");
  }
}

export async function fetchCourses({ dept, sem, instructor }) {
  try {
    await dbConnect();
    const query = {};
    if (dept) query.dept = dept;
    if (sem) query.sem = sem;
    if (instructor) query.instructor = instructor;

    const courses = await Course.find(query).lean().sort({ _id: 1 });

    if (!courses || courses.length === 0) {
      throw new Error("No Course found");
    }

    // Fetch instructor names for each course
    const coursesWithInstructorNames = await Promise.all(
      courses.map(async (course) => {
        const instructorDoc = await Teacher.findById(course.instructor, {
          name: 1,
        }).lean();
        return {
          ...course,
          _id: course._id.toString(),
          instructor: instructorDoc ? instructorDoc.name : "Unknown Instructor",
        };
      }),
    );

    return coursesWithInstructorNames;
  } catch (error) {
    console.log("Failed to fetch courses: ", error);

    throw new Error("Failed to fetch courses!");
  }
}
