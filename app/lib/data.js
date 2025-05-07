"use server";

import dbConnect from "@/app/lib/db";
import Student from "@/app/models/student";
import Admin from "../models/admin";
import Attendance from "../models/attendance";
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

export async function fetchAttendance({ dept, sem, sec, course }) {
  try {
    await dbConnect();
    const query = {};
    if (dept) query.dept = dept;
    if (sem) query.sem = sem;
    if (sec) query.sec = sec;
    if (course) query.course = course;

    const attendance = await Attendance.find(query)
      .populate({
        path: "instructor",
        select: "name",
        model: Teacher,
      })
      .populate({
        path: "course",
        select: "title code",
        model: Course,
      })
      .lean()
      .sort({ _id: 1 });

    if (!attendance || attendance.length === 0) {
      throw new Error("No attendance found");
    }

    const attendanceWithDetails = attendance.map((record) => ({
      ...record,
      _id: record._id.toString(),
      instructor: {
        _id: record.instructor?._id?.toString() || null,
        name: record.instructor?.name || "Unknown Instructor",
      },
      course: {
        _id: record.course?._id?.toString() || null,
        title: record.course?.title || "Unknown Course",
        code: record.course?.code || "N/A",
      },
    }));

    return attendanceWithDetails;
  } catch (error) {
    console.log("Failed to fetch attendance: ", error);
    return [];
  }
}

export async function fetchAttendanceById(id) {
  try {
    await dbConnect();

    const attendance = await Attendance.findById(id)
      .populate({
        path: "instructor",
        select: "name",
        model: Teacher,
      })
      .populate({
        path: "course",
        select: "title code",
        model: Course,
      })
      .lean();

    if (!attendance) {
      throw new Error("No attendance record found with that ID");
    }

    // Fetch student details for each attendance record
    const studentIds = attendance.attendance.map((item) => item.id);
    const students = await Student.find({ id: { $in: studentIds } }).lean();

    // Map student details to attendance records
    const attendanceWithStudentDetails = {
      ...attendance,
      _id: attendance._id.toString(),
      instructor: {
        _id: attendance.instructor?._id?.toString() || null,
        name: attendance.instructor?.name || "Unknown Instructor",
      },
      course: {
        _id: attendance.course?._id?.toString() || null,
        title: attendance.course?.title || "Unknown Course",
        code: attendance.course?.code || "N/A",
      },
      attendance: attendance.attendance.map((attendanceRecord) => {
        const student = students.find((s) => s.id === attendanceRecord.id);
        return {
          ...attendanceRecord,
          student: student
            ? {
                _id: student._id.toString(),
                id: student.id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                photo: student.photo,
                dept: student.dept,
                sem: student.sem,
                sec: student.sec,
              }
            : null,
        };
      }),
    };

    console.log(
      "Server response with student details:",
      attendanceWithStudentDetails,
    );
    return attendanceWithStudentDetails;
  } catch (error) {
    console.error("Failed to fetch attendance by ID: ", error);
    return null;
  }
}
