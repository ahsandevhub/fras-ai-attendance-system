import { removeStudent } from "@/app/lib/actions";
import { fetchStudent } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaTimes, FaTrashAlt } from "react-icons/fa";
import {
  RiBuilding2Line,
  RiCalendarLine,
  RiGroupLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
} from "react-icons/ri";

const Page = async ({ searchParams }) => {
  const student = await fetchStudent(searchParams._id);
  const removeStudentWithId = removeStudent.bind(null, searchParams._id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaTrashAlt className="text-2xl" />
          <h1 className="text-xl font-bold">Delete Student</h1>
        </div>
        <Link
          href="/admin/dashboard/students"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow transition hover:bg-rose-50"
        >
          <FaArrowLeft />
          Back to Students
        </Link>
      </div>

      <div className="my-4 px-4">
        {/* Warning Alert */}
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-rose-800">
            <FaTrashAlt />
            Confirm Deletion
          </h2>
          <p className="mt-2 text-sm text-rose-700">
            Are you sure you want to permanently delete this student record?
            This action cannot be undone.
          </p>
        </div>

        {/* Student Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-4 text-lg font-semibold text-gray-800">
            Student Information
          </h2>

          <div className="flex flex-col gap-6 md:flex-row">
            {/* Student Photo */}
            <div className="flex flex-col items-center">
              <div className="relative h-48 w-48 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
                <Image
                  src={student.photo}
                  alt={student.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Student ID: {student.id}
              </p>
            </div>

            {/* Student Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <RiUserLine />
                    Full Name
                  </div>
                  <p className="mt-1 text-lg font-semibold">{student.name}</p>
                </div>

                {/* Department */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <RiBuilding2Line />
                    Department
                  </div>
                  <p className="mt-1 text-lg font-semibold">{student.dept}</p>
                </div>

                {/* Semester */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <RiCalendarLine />
                    Semester
                  </div>
                  <p className="mt-1 text-lg font-semibold">{student.sem}</p>
                </div>

                {/* Section */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <RiGroupLine />
                    Section
                  </div>
                  <p className="mt-1 text-lg font-semibold">{student.sec}</p>
                </div>

                {/* Phone */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <RiPhoneLine />
                    Phone Number
                  </div>
                  <p className="mt-1 text-lg font-semibold">{student.phone}</p>
                </div>

                {/* Email */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <RiMailLine />
                    Email Address
                  </div>
                  <p className="mt-1 text-lg font-semibold">{student.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Form */}
          <form action={removeStudentWithId} className="mt-8">
            <div className="flex flex-col gap-4 md:flex-row md:justify-center">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 font-medium text-white shadow-md transition hover:from-rose-700 hover:to-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                <FaTrashAlt />
                Confirm Delete
              </button>
              <Link
                href="/admin/dashboard/students"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-md transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <FaTimes />
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
