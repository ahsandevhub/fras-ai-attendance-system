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
    <div className="space-y-3">
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-blue-500 px-4 py-2 text-white">
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
      <div className="flex flex-col gap-4 xl:flex-row">
        <StudentFilters />
        <div className="flex flex-grow flex-col gap-5">
          {students.length > 0 ? (
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="sticky top-[60px] z-10 bg-gray-100 shadow">
                  <th className="border py-2">SL</th>
                  <th className="border py-2">Photo</th>
                  <th className="border py-2">ID</th>
                  <th className="border py-2">Name</th>
                  <th className="break-all border py-2">Department</th>
                  <th className="break-all border py-2">Semester</th>
                  <th className="break-all border py-2">Section</th>
                  <th className="break-all border py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border text-center">
                    <td className="border p-1">{index + 1}</td>
                    <td className="border p-1">
                      <Image
                        src={student.photo}
                        width={50}
                        height={50}
                        alt={student.id}
                        className="mx-auto h-12 w-12 object-cover"
                      />
                    </td>
                    <td className="border p-1">{student.id}</td>
                    <td className="border p-1">{student.name}</td>
                    <td className="border p-1">{student.dept}</td>
                    <td className="border p-1">{student.sem}</td>
                    <td className="border p-1">{student.sec}</td>
                    <td className="border p-1">
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
            className={clsx("flex items-center justify-center py-5", {
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
