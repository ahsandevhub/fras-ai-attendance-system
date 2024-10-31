import { fetchStudentsForAttendance } from "@/app/lib/data";
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
    <div className="space-y-3">
      {/* Header */}
      <div className="header flex items-center justify-between rounded-b-md bg-rose-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Take Attendance</h1>
      </div>
      <Attendance students={students} labels={studentIds} filters={filters} />
    </div>
  );
};

export default Page;
