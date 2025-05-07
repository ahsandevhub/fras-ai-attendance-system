import { fetchCourses, fetchTeacher } from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";
import { RiBuilding2Line } from "react-icons/ri";
import CourseFilters from "./course-filters";

const CoursesPage = async ({ searchParams }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("teacherToken")?.value;
  const { decoded } = await validateToken(token);
  const teacher = await fetchTeacher(decoded._id);

  const filters = {
    dept: searchParams?.dept || "",
    sem: searchParams?.sem || "",
    instructor: teacher._id || "",
  };

  let courses;
  let error = null;

  try {
    courses = await fetchCourses(filters);
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    error = "No courses found. Please ask admin to assign courses to you.";
    courses = []; // Set empty array to prevent rendering errors
  }

  const isEmpty = courses?.length === 0;
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaChalkboardTeacher className="text-2xl" />
          <h1 className="text-xl font-bold">My Courses</h1>
        </div>
      </div>

      <div className="my-4 px-4">
        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Summary - Only show if we have courses */}
        {!error && (
          <div className="mb-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-rose-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-rose-800">
                    Total Courses
                  </p>
                  <p className="text-2xl font-bold text-rose-600">
                    {courses?.length || 0}
                  </p>
                </div>
                <div className="rounded-full bg-rose-100 p-3 text-rose-600">
                  <FaChalkboardTeacher className="text-xl" />
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-green-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Departments
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {new Set(courses?.map((c) => c.dept)).size || 0}
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <RiBuilding2Line className="text-xl" />
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-purple-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-800">
                    Semesters
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(courses?.map((c) => c.sem)).size || 0}
                  </p>
                </div>
                <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                  <FaChalkboardTeacher className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <CourseFilters />

        {/* Courses Table */}
        <div className="rounded-xl border border-rose-200 bg-white shadow-sm">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-rose-100 p-4 text-rose-600">
                <FaChalkboardTeacher className="text-3xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                {hasFilters
                  ? "No matching courses found"
                  : "No courses available"}
              </h3>
              <p className="text-gray-600">
                {hasFilters
                  ? "Try adjusting your filters or add a new course."
                  : "Get started by adding your first course."}
              </p>
              <Link
                href="/admin/dashboard/courses/add-course"
                target="_blank"
                className="mt-4 flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-rose-700"
              >
                <FaPlus />
                Add New Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-center text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-rose-50 to-indigo-50">
                    <th className="rounded-tl-xl border-b border-r border-gray-200 p-3">
                      SL
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Department
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Semester
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Code
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Course Name
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Instructor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr
                      key={course._id}
                      className="transition-colors hover:bg-rose-50/50"
                    >
                      <td className="border-b border-r border-gray-200 p-3">
                        {index + 1}
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        <span className="rounded-full border bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800">
                          {course.dept}
                        </span>
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        {course.sem}
                      </td>
                      <td className="border-b border-r border-gray-200 p-3 font-medium">
                        {course.code}
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        {course.title}
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        {course?.instructor || "Not assigned"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!isEmpty && courses.length > 10 && (
            <div className="flex items-center justify-center border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <span className="px-3 text-sm text-gray-600">Page 1 of 3</span>
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
