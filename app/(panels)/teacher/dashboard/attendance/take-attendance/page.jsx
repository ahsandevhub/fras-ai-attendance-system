import {
  fetchCourses,
  fetchStudentsForAttendance,
  fetchTeacher,
} from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaArrowLeft, FaClipboardCheck } from "react-icons/fa";
import Attendance from "./attendance";

const Page = async ({ searchParams }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("teacherToken")?.value;
  const { decoded } = await validateToken(token);
  const teacher = await fetchTeacher(decoded._id);

  const filters = {
    dept: searchParams?.dept || "",
    sem: searchParams?.sem || "",
    sec: searchParams?.sec || "",
    course: searchParams?.course || "",
  };

  let students = [];
  let studentIds = [];

  if (filters.dept && filters.sem && filters.sec) {
    students = await fetchStudentsForAttendance(filters);
  }

  let courses;
  let error = null;

  try {
    courses = await fetchCourses({ ...filters, instructor: teacher._id || "" });
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    error = "No courses found. Please ask admin to assign courses to you.";
    courses = []; // Set empty array to prevent rendering errors
  }

  if (students.length !== 0) {
    studentIds = students.map((item) => item.id);
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaClipboardCheck className="text-2xl" />
          <h1 className="text-xl font-bold">Take Attendance</h1>
        </div>
        <Link
          href="/teacher/dashboard/attendance"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow transition hover:bg-rose-50"
        >
          <FaArrowLeft />
          Back to Attendance
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        <Attendance
          courses={courses}
          students={students}
          labels={studentIds}
          filters={filters}
          instructor={teacher._id}
        />
      </div>
    </div>
  );
};

export default Page;
