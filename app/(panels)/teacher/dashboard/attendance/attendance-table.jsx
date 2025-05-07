"use client";

import Pagination from "@/app/ui/pagination";
import Link from "next/link";
import { FaCalendarAlt, FaEdit, FaEye } from "react-icons/fa";

export default function AttendanceTable({
  attendances = [],
  filters = {},
  totalPages = 1,
  error = null,
}) {
  const formatDateTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  console.log("Attendance:", attendances);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mb-4 rounded-full bg-red-100 p-4 text-red-600">
          <FaCalendarAlt className="text-3xl" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          Failed to load attendance records
        </h3>
        <p className="mb-4 text-gray-600">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (attendances.length === 0) {
    const noFiltersApplied =
      !filters.dept && !filters.sem && !filters.sec && !filters.course;

    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
        <div className="mb-4 rounded-full bg-rose-100 p-4 text-rose-600">
          <FaCalendarAlt className="text-3xl" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          {noFiltersApplied
            ? "No attendance records available"
            : "No matching records found"}
        </h3>
        <p className="mb-4 text-gray-600">
          {noFiltersApplied
            ? "Create a new attendance record to get started"
            : "Try adjusting your filters or create a new record"}
        </p>
        <Link
          href="/teacher/dashboard/attendance/take-attendance"
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          Create New Attendance
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-rose-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-center text-sm md:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-rose-50 to-indigo-50">
              <th className="border-b border-r border-gray-200 p-3">SL</th>
              <th className="border-b border-r border-gray-200 p-3">
                Date & Time
              </th>
              <th className="border-b border-r border-gray-200 p-3">Dept</th>
              <th className="border-b border-r border-gray-200 p-3">Sem</th>
              <th className="border-b border-r border-gray-200 p-3">Sec</th>
              <th className="border-b border-r border-gray-200 p-3">
                Course Code
              </th>
              <th className="border-b border-r border-gray-200 p-3">
                Course Name
              </th>
              <th className="border-b border-r border-gray-200 p-3">
                Attendance
              </th>
              <th className="border-b border-gray-200 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((record, index) => {
              const present = record.attendance.filter((a) => a.attend).length;
              const absent = record.attendance.filter((a) => !a.attend).length;
              const total = present + absent;
              const presentPercentage =
                total > 0 ? Math.round((present / total) * 100) : 0;
              const absentPercentage = total > 0 ? 100 - presentPercentage : 0;

              return (
                <tr
                  key={record._id}
                  className="transition-colors hover:bg-rose-50/50"
                >
                  <td className="border-b border-r border-gray-200 p-3">
                    {((filters.page || 1) - 1) * (filters.limit || 50) +
                      index +
                      1}
                  </td>
                  <td className="border-b border-r border-gray-200 p-3">
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                      {formatDateTime(record.updatedAt)}
                    </span>
                  </td>
                  <td className="border-b border-r border-gray-200 p-3">
                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {record.dept}
                    </span>
                  </td>
                  <td className="border-b border-r border-gray-200 p-3">
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      {record.sem}
                    </span>
                  </td>
                  <td className="border-b border-r border-gray-200 p-3">
                    <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                      {record.sec}
                    </span>
                  </td>
                  <td className="border-b border-r border-gray-200 p-3">
                    <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                      {record.course?.code || "N/A"}
                    </span>
                  </td>
                  <td className="border-b border-r border-gray-200 p-3">
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                      {record.course?.title || "Unknown"}
                    </span>
                  </td>
                  <td className="border-b border-r border-gray-200 p-3">
                    <div className="flex items-center justify-center gap-3">
                      {/* Animated Wave Progress */}
                      <div className="relative h-10 w-10">
                        <svg
                          viewBox="0 0 36 36"
                          className="absolute h-full w-full"
                        >
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeDasharray={`${presentPercentage}, 100`}
                            className="animate-[wave_1.5s_ease-in-out_infinite]"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-700">
                          {presentPercentage}%
                        </span>
                      </div>

                      {/* Vertical Stats */}
                      <div className="text-xs">
                        <div className="flex items-center text-green-600">
                          <span className="mr-1 block h-2 w-2 rounded-full bg-green-500"></span>
                          Present: {present}
                        </div>
                        <div className="flex items-center text-red-600">
                          <span className="mr-1 block h-2 w-2 rounded-full bg-red-500"></span>
                          Absent: {absent}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 p-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/teacher/dashboard/attendance/view-attendance?id=${record._id}`}
                        className="flex items-center gap-1 rounded-lg border bg-rose-50 px-3 py-2 text-rose-600 hover:bg-rose-100"
                      >
                        <FaEye className="text-sm" />
                        <span className="text-xs">View</span>
                      </Link>
                      <Link
                        href={`/teacher/dashboard/attendance/update-attendance?id=${record._id}`}
                        className="flex items-center gap-1 rounded-lg border bg-amber-50 px-3 py-2 text-amber-600 hover:bg-amber-100"
                      >
                        <FaEdit className="text-sm" />
                        <span className="text-xs">Edit</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 text-center">
        {totalPages > 1 ? (
          <Pagination totalPages={totalPages} />
        ) : (
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
            <span className="font-medium">Showing</span>
            <span className="mx-1 rounded bg-white px-2 py-0.5 font-bold text-rose-600">
              1
            </span>
            <span className="font-medium">of</span>
            <span className="mx-1 rounded bg-white px-2 py-0.5 font-bold text-gray-600">
              1
            </span>
            <span className="font-medium">page</span>
          </div>
        )}
      </div>
    </div>
  );
}
