import { fetchAttendanceById } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEdit,
  FaExclamationTriangle,
  FaUserGraduate,
} from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";

export default async function AttendanceDetails({ searchParams }) {
  const { id } = searchParams;

  try {
    const record = await fetchAttendanceById(id);

    if (!record) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <RiUserSearchLine className="text-2xl" />
              <h1 className="text-xl font-bold">Attendance Details</h1>
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <FaExclamationTriangle className="text-3xl text-amber-500" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-amber-800">
              Attendance Record Not Found
            </h3>
            <p className="mb-4 text-amber-600">
              The requested attendance record does not exist.
            </p>
            <Link
              href="/teacher/dashboard/attendance"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              <FaArrowLeft /> Back to Attendance
            </Link>
          </div>
        </div>
      );
    }

    const presentStudents = record.attendance.filter((s) => s.attend);
    const absentStudents = record.attendance.filter((s) => !s.attend);
    const presentPercentage = Math.round(
      (presentStudents.length / record.attendance.length) * 100,
    );

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <RiUserSearchLine className="text-2xl" />
            <h1 className="text-xl font-bold">Attendance Details</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/teacher/dashboard/attendance"
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow transition hover:bg-rose-50"
            >
              <FaArrowLeft />
              Back to Attendance
            </Link>
          </div>
        </div>

        <div className="p-4">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border bg-rose-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-rose-800">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-rose-600">
                    {record.attendance.length}
                  </p>
                </div>
                <div className="rounded-full bg-rose-100 p-3 text-rose-600">
                  <FaUserGraduate className="text-xl" />
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-green-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Present</p>
                  <p className="text-2xl font-bold text-green-600">
                    {presentStudents.length}
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <FaUserGraduate className="text-xl" />
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-red-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">Absent</p>
                  <p className="text-2xl font-bold text-red-600">
                    {absentStudents.length}
                  </p>
                </div>
                <div className="rounded-full bg-red-100 p-3 text-red-600">
                  <FaUserGraduate className="text-xl" />
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-amber-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Attendance Rate
                  </p>
                  <p className="text-2xl font-bold text-amber-600">
                    {presentPercentage}%
                  </p>
                </div>
                <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                  <FaUserGraduate className="text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Course Information Card */}
          <div className="mt-6 rounded-xl border border-rose-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                <FaCalendarAlt className="mr-2 inline text-rose-500" />
                Course Information
              </h2>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                {new Date(record.updatedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-600">Course Code</p>
                <p className="text-lg font-bold text-rose-600">
                  {record.course?.code || "N/A"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-600">
                  Course Title
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {record.course?.title || "Unknown"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-600">Instructor</p>
                <p className="text-lg font-bold text-gray-800">
                  {record.instructor?.name || "Unknown"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-600">Class</p>
                <p className="text-lg font-bold text-gray-800">
                  {record.dept} {record.sem} {record.sec}
                </p>
              </div>
            </div>
          </div>

          {/* Student Lists */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Present Students */}
            <div className="rounded-xl border border-green-200 bg-white shadow-sm">
              <div className="rounded-t-xl border-b border-green-200 bg-green-50 p-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800">
                  <FaUserGraduate className="text-green-500" />
                  Present Students ({presentStudents.length})
                </h3>
              </div>
              <div className="p-4">
                {presentStudents.length > 0 ? (
                  <ul className="space-y-3">
                    {presentStudents.map(({ id, student }) => (
                      <li
                        key={id}
                        className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        {student?.photo && (
                          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow">
                            <Image
                              src={student.photo}
                              width={48}
                              height={48}
                              alt={student.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="mb-1 font-medium text-gray-800">
                            {student?.name || "Unknown Student"}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600">
                            <span className="font-mono">{id}</span>
                            {student && (
                              <>
                                <span className="text-gray-400">•</span>
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                                  {student.dept}
                                </span>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                  {student.sem}
                                </span>
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-800">
                                  {student.sec}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                          Present
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                    <p className="text-gray-500">No students were present</p>
                  </div>
                )}
              </div>
            </div>

            {/* Absent Students */}
            <div className="rounded-xl border border-red-200 bg-white shadow-sm">
              <div className="rounded-t-xl border-b border-red-200 bg-red-50 p-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-800">
                  <FaUserGraduate className="text-red-500" />
                  Absent Students ({absentStudents.length})
                </h3>
              </div>
              <div className="p-4">
                {absentStudents.length > 0 ? (
                  <ul className="space-y-3">
                    {absentStudents.map(({ id, student }) => (
                      <li
                        key={id}
                        className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-3 transition hover:bg-gray-100"
                      >
                        {/* Student Photo */}
                        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow">
                          {student?.photo ? (
                            <Image
                              src={student.photo}
                              width={48}
                              height={48}
                              alt={student.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                              <FaUserGraduate className="text-xl" />
                            </div>
                          )}
                        </div>

                        {/* Student Details */}
                        <div className="flex-1">
                          <h4 className="mb-1 font-medium text-gray-800">
                            {student?.name || "Unknown Student"}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600">
                            <span className="font-mono">{id}</span>
                            {student && (
                              <>
                                <span className="text-gray-400">•</span>
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                                  {student.dept}
                                </span>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                  {student.sem}
                                </span>
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-800">
                                  {student.sec}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Absent Badge */}
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                          Absent
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                    <p className="text-gray-500">All students were present</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end">
            <Link
              href={`/dashboard/attendance/${id}/update`}
              className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-rose-700"
            >
              <FaEdit />
              Update Attendance
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching attendance details:", error);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <RiUserSearchLine className="text-2xl" />
            <h1 className="text-xl font-bold">Attendance Details</h1>
          </div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <FaExclamationTriangle className="text-3xl text-red-500" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-red-800">
            Error Loading Attendance
          </h3>
          <p className="mb-4 text-red-600">
            {error.message ||
              "An error occurred while loading the attendance record."}
          </p>
          <Link
            href="/dashboard/attendance"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <FaArrowLeft /> Back to Attendance
          </Link>
        </div>
      </div>
    );
  }
}
