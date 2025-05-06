import { fetchCourses } from "@/app/lib/data";
import Link from "next/link";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete, MdFilterAlt } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";

const CoursesPage = async ({ searchParams }) => {
  const filters = {
    dept: searchParams?.dept || "",
    sem: searchParams?.sem || "",
    instructor: searchParams?.instructor || "",
  };

  const courses = await fetchCourses(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <h1 className="text-xl font-bold">Manage Courses</h1>
        <Link
          href="/admin/dashboard/courses/add-course"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50"
        >
          <FaPlus />
          Add Course
        </Link>
      </div>

      <div className="my-4 px-4">
        {/* Filter Section */}
        <div className="mb-6 rounded-xl border border-blue-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
              <MdFilterAlt className="text-xl" />
              Filter Courses
            </h2>
            <button className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
              <RiSearchLine />
              Search
            </button>
          </div>

          <form className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                name="dept"
                id="dept"
                className="form-input"
                defaultValue={filters.dept}
              >
                <option value="">All Departments</option>
                <option value="CSE">Computer Science</option>
                <option value="EEE">Electrical Engineering</option>
                <option value="Civil">Civil Engineering</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="English">English</option>
                <option value="BBA">Business Administration</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Semester</label>
              <select
                name="sem"
                id="sem"
                className="form-input"
                defaultValue={filters.sem}
              >
                <option value="">All Semesters</option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
                <option value="3rd">3rd Semester</option>
                <option value="4th">4th Semester</option>
                <option value="5th">5th Semester</option>
                <option value="6th">6th Semester</option>
                <option value="7th">7th Semester</option>
                <option value="8th">8th Semester</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Instructor</label>
              <select
                name="instructor"
                id="instructor"
                className="form-input"
                defaultValue={filters.instructor}
              >
                <option value="">All Instructors</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Prof. Johnson">Prof. Johnson</option>
                <option value="Dr. Williams">Dr. Williams</option>
                <option value="Prof. Brown">Prof. Brown</option>
                <option value="Dr. Davis">Dr. Davis</option>
              </select>
            </div>
          </form>
        </div>

        {/* Courses Table */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          {courses?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-700">
                No Courses Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or add a new course
              </p>
              <Link
                href="/admin/dashboard/courses/add-course"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <FaPlus />
                Add New Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800">
                      Semester
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800">
                      Code
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800">
                      Course Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800">
                      Instructor
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-blue-800">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course, index) => (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-700">
                        {course.dept}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                        {course.sem}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-blue-600">
                        {course.code}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {course.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                        {course.instructor}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/dashboard/courses/update-course?_id=${course._id}`}
                            className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                            title="Edit"
                          >
                            <FaEdit className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/dashboard/courses/delete-course?_id=${course._id}`}
                            className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                            title="Delete"
                          >
                            <MdDelete className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {courses?.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">20</span> courses
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="rounded-lg border border-blue-500 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
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
