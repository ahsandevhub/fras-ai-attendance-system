import { fetchAllStudents } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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
    <div>
      <div className="header flex items-center justify-between rounded-b-md bg-blue-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Manage Students</h1>
        <div className="buttons">
          <Link
            href="/admin/dashboard/students/add-student"
            className="rounded bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow-inner hover:bg-gray-200 hover:shadow"
          >
            + Add Student
          </Link>
        </div>
      </div>
      <div className="sticky top-0 z-50 h-2 w-full bg-white"></div>
      <div className="relative flex flex-col gap-4 xl:flex-row">
        <StudentFilters />
        <div className="flex flex-grow flex-col gap-5">
          {students.length > 0 ? (
            <table className="relative w-full border-separate border-spacing-0 text-sm md:text-base">
              <thead>
                <tr className="sticky top-2 bg-gray-100">
                  <th className="border-b-2 border-l border-r border-t border-gray-300 py-2">
                    SL
                  </th>
                  <th className="border-b-2 border-r border-t border-gray-300 py-2">
                    Photo
                  </th>
                  <th className="border-b-2 border-r border-t border-gray-300 py-2">
                    ID
                  </th>
                  <th className="border-b-2 border-r border-t border-gray-300 py-2">
                    Name
                  </th>
                  <th className="border-b-2 border-r border-t border-gray-300 py-2">
                    Department
                  </th>
                  <th className="border-b-2 border-r border-t border-gray-300 py-2">
                    Semester
                  </th>
                  <th className="border-b-2 border-r border-t border-gray-300 py-2">
                    Section
                  </th>
                  <th className="border-b-2 border-r border-t border-gray-300 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="text-center odd:bg-white even:bg-gray-50"
                  >
                    <td className="border-b border-l border-r border-gray-300 p-1">
                      {((filters.page || 1) - 1) * (filters.limit || 50) +
                        index +
                        1}
                    </td>
                    <td className="border-b border-r border-gray-300 p-1">
                      <Image
                        src={student.photo}
                        width={50}
                        height={50}
                        alt={student.id}
                        className="mx-auto h-12 w-12 object-cover"
                      />
                    </td>
                    <td className="border-b border-r border-gray-300 p-1">
                      {student.id}
                    </td>
                    <td className="border-b border-r border-gray-300 p-1">
                      {student.name}
                    </td>
                    <td className="border-b border-r border-gray-300 p-1">
                      {student.dept}
                    </td>
                    <td className="border-b border-r border-gray-300 p-1">
                      {student.sem}
                    </td>
                    <td className="border-b border-r border-gray-300 p-1">
                      {student.sec}
                    </td>
                    <td className="border-b border-r border-gray-300 p-1">
                      <div className="button_group flex flex-wrap items-center justify-center gap-2">
                        <Link
                          href={`/admin/dashboard/students/update-student?_id=${student._id}`}
                          className="flex w-max rounded border border-orange-300 bg-orange-100 p-1 font-medium text-orange-600 hover:bg-orange-600 hover:text-white"
                        >
                          <FaEdit className="text-lg" />
                        </Link>
                        <Link
                          href={`/admin/dashboard/students/delete-student?_id=${student._id}`}
                          className="flex w-max rounded border border-rose-300 bg-red-100 p-1 font-medium text-rose-600 hover:bg-rose-600 hover:text-white"
                        >
                          <MdDelete className="text-lg" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="border border-gray-200 bg-gray-50 p-2">
              <p>No students found!</p>
            </div>
          )}
          <div
            className={clsx("flex items-center justify-center pb-5", {
              hidden: totalPages === 1,
            })}
          >
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
