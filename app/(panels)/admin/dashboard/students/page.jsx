import { fetchAllStudents } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiUserSearchLine } from "react-icons/ri";
import StudentFilters from "./student-filters";

const Page = async ({ searchParams }) => {
  const filters = {
    dept: searchParams?.dept || "",
    sem: searchParams?.sem || "",
    sec: searchParams?.sec || "",
    id: searchParams?.id || "",
    page: searchParams?.page || "",
    limit: searchParams?.limit || "",
    sort: searchParams?.sort || "",
  };

  const { students, totalPages } = await fetchAllStudents(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <RiUserSearchLine className="text-2xl" />
          <h1 className="text-xl font-bold">Student Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/students/add-student"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50"
          >
            <FaUserPlus />
            Add Student
          </Link>
        </div>
      </div>

      <div className="p-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl border bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-blue-600">1,245</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <FaUserPlus className="text-xl" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-green-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Active This Week
                </p>
                <p className="text-2xl font-bold text-green-600">892</p>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <FaUserPlus className="text-xl" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-purple-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">
                  New This Month
                </p>
                <p className="text-2xl font-bold text-purple-600">56</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <FaUserPlus className="text-xl" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Attendance Rate
                </p>
                <p className="text-2xl font-bold text-amber-600">94%</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <FaUserPlus className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <StudentFilters />

        {/* Students Table */}
        <div className="w-full rounded-xl border border-blue-200 bg-white shadow-sm">
          {students.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0 text-center text-sm md:text-base">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <th className="rounded-tl-xl border-b border-r border-gray-200 p-3">
                        SL
                      </th>
                      <th className="border-b border-r border-gray-200 p-3">
                        Photo
                      </th>
                      <th className="border-b border-r border-gray-200 p-3">
                        ID
                      </th>
                      <th className="border-b border-r border-gray-200 p-3">
                        Name
                      </th>
                      <th className="border-b border-r border-gray-200 p-3">
                        Department
                      </th>
                      <th className="border-b border-r border-gray-200 p-3">
                        Semester
                      </th>
                      <th className="border-b border-r border-gray-200 p-3">
                        Section
                      </th>
                      <th className="rounded-tr-xl border-b border-gray-200 p-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={index}
                        className="transition-colors hover:bg-blue-50/50"
                      >
                        <td className="border-b border-r border-gray-200 p-3">
                          {((filters.page || 1) - 1) * (filters.limit || 50) +
                            index +
                            1}
                        </td>
                        <td className="border-b border-r border-gray-200 p-3">
                          <div className="mx-auto h-12 w-12 overflow-hidden border-2 border-white shadow">
                            <Image
                              src={student.photo}
                              width={48}
                              height={48}
                              alt={student.id}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="border-b border-r border-gray-200 p-3 font-medium">
                          {student.id}
                        </td>
                        <td className="border-b border-r border-gray-200 p-3">
                          {student.name}
                        </td>
                        <td className="border-b border-r border-gray-200 p-3">
                          <span className="rounded-full border bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                            {student.dept}
                          </span>
                        </td>
                        <td className="border-b border-r border-gray-200 p-3">
                          <span className="rounded-full border bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                            {student.sem}
                          </span>
                        </td>
                        <td className="border-b border-r border-gray-200 p-3">
                          <span className="rounded-full border bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                            {student.sec}
                          </span>
                        </td>
                        <td className="border-b border-gray-200 p-3">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/admin/dashboard/students/update-student?_id=${student._id}`}
                              className="flex items-center gap-1 rounded-lg border bg-amber-50 px-3 py-2 text-amber-600 transition hover:bg-amber-100"
                            >
                              <FaEdit className="text-sm" />
                              <span className="text-xs font-medium">Edit</span>
                            </Link>
                            <Link
                              href={`/admin/dashboard/students/delete-student?_id=${student._id}`}
                              className="flex items-center gap-1 rounded-lg border bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                            >
                              <MdDelete className="text-sm" />
                              <span className="text-xs font-medium">
                                Delete
                              </span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className={clsx(
                  "flex items-center justify-center border-t border-gray-200 p-4",
                  {
                    hidden: totalPages === 1,
                  },
                )}
              >
                <Pagination totalPages={totalPages} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                <RiUserSearchLine className="text-3xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                No students found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Link
                href="/admin/dashboard/students/add-student"
                className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
              >
                <FaUserPlus />
                Add New Student
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
