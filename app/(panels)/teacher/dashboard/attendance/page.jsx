// app/(dashboard)/attendance/page.tsx
import { fetchAttendance } from "@/app/lib/data";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiLayoutGrid2Line } from "react-icons/ri";
import Filters from "./attendance-filters";
import AttendanceTable from "./attendance-table";

const Page = async ({ searchParams }) => {
  const filters = {
    dept: searchParams?.dept || "",
    sem: searchParams?.sem || "",
    sec: searchParams?.sec || "",
    course: searchParams?.course || "",
  };

  const attendances = await fetchAttendance(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <RiLayoutGrid2Line className="text-2xl" />
          <h1 className="text-xl font-bold">Attendance</h1>
        </div>
        <Link
          href="/teacher/dashboard/attendance/take-attendance"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow transition hover:bg-rose-50"
        >
          <AiOutlinePlusCircle className="text-xl" />
          Take Attendance
        </Link>
      </div>

      <div className="my-4 px-4">
        <Filters />
        <AttendanceTable attendances={attendances} filters={filters} />
      </div>
    </div>
  );
};

export default Page;
