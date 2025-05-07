import { fetchAllTeachers } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaEdit,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { RiBuilding2Line } from "react-icons/ri";
import TeacherFilters from "./teacher-filters";

const Page = async ({ searchParams }) => {
  const filters = {
    dept: searchParams?.dept || "",
  };

  const teachers = await fetchAllTeachers(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaChalkboardTeacher className="text-2xl" />
          <h1 className="text-xl font-bold">Manage Teachers</h1>
        </div>
        <Link
          href="/admin/dashboard/teachers/add-teacher"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50"
        >
          <FaPlus />
          Add Teacher
        </Link>
      </div>

      <div className="my-4 px-4">
        {/* Stats Summary */}
        <div className="mb-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Active Teachers
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {teachers.filter((t) => t.status === "active").length}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
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
                  {new Set(teachers.map((t) => t.dept)).size}
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
                  Designations
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(teachers.map((t) => t.designation)).size}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <FaChalkboardTeacher className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <TeacherFilters />

        {/* Teachers Table */}
        <div className="rounded-xl border border-blue-200 bg-white shadow-sm">
          {teachers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-center text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <th className="rounded-tl-xl border-b border-r border-gray-200 p-3">
                      SL
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Photo
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Name
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Department
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Designation
                    </th>
                    <th className="border-b border-r border-gray-200 p-3">
                      Tag
                    </th>
                    <th className="rounded-tr-xl border-b border-gray-200 p-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr
                      key={index}
                      className="transition-colors hover:bg-blue-50/50"
                    >
                      <td className="border-b border-r border-gray-200 p-3">
                        {index + 1}
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        <div className="mx-auto h-12 w-12 overflow-hidden rounded border-2 border-white shadow">
                          <Image
                            src={teacher.photo}
                            width={48}
                            height={48}
                            alt={teacher.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="border-b border-r border-gray-200 p-3 font-medium">
                        {teacher.name}
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        <span className="rounded-full border bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                          {teacher.dept}
                        </span>
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        {teacher.designation}
                      </td>
                      <td className="border-b border-r border-gray-200 p-3">
                        <span className="rounded-full border bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                          {teacher.tag}
                        </span>
                      </td>
                      <td className="border-b border-gray-200 p-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/dashboard/teachers/update-teacher?_id=${teacher._id}`}
                            className="flex items-center gap-1 rounded-lg border bg-amber-50 px-3 py-2 text-amber-600 transition hover:bg-amber-100"
                          >
                            <FaEdit className="text-sm" />
                            <span className="text-xs font-medium">Edit</span>
                          </Link>
                          <Link
                            href={`/admin/dashboard/teachers/delete-teacher?_id=${teacher._id}`}
                            className="flex items-center gap-1 rounded-lg border bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                          >
                            <FaTrashAlt className="text-sm" />
                            <span className="text-xs font-medium">Delete</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                <FaChalkboardTeacher className="text-3xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                No teachers found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or add a new teacher.
              </p>
              <Link
                href="/admin/dashboard/teachers/add-teacher"
                className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
              >
                <FaPlus />
                Add New Teacher
              </Link>
            </div>
          )}

          {/* Pagination - Replace with your actual pagination component */}
          {teachers.length > 25 && (
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

export default Page;
