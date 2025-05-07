"use client";

import { fetchStudentsForAttendance } from "@/app/lib/data";
import Link from "next/link";
import { FaArrowLeft, FaClipboardCheck } from "react-icons/fa";
import Attendance from "./attendance2";

const Page = async ({ searchParams }) => {
  const filters = {
    dept: searchParams?.dept || "",
    sem: searchParams?.sem || "",
    sec: searchParams?.sec || "",
  };

  let students = [];
  let studentIds = [];

  if (filters.dept && filters.sem && filters.sec) {
    students = await fetchStudentsForAttendance(filters);
  }

  if (students.length !== 0) {
    studentIds = students.map((item) => item.id);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaClipboardCheck className="text-2xl" />
          <h1 className="text-xl font-bold">Take Attendance</h1>
        </div>
        <Link
          href="/admin/dashboard/attendance"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow transition hover:bg-rose-50"
        >
          <FaArrowLeft />
          Back to Attendance
        </Link>
      </div>

      {/* Content */}
      <div className="my-4 px-4">
        <Attendance students={students} labels={studentIds} filters={filters} />
      </div>
    </div>
  );
};

export default Page;
