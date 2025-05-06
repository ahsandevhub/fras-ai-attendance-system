import { fetchAllTeachers } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const page = async () => {
  const teachers = await fetchAllTeachers();

  return (
    <div>
      <div className="header flex items-center justify-between rounded-b-md bg-blue-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Manage Teachers</h1>
        <div className="buttons">
          <Link
            href="/admin/dashboard/teachers/add-teacher"
            className="rounded bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow-inner hover:bg-gray-200 hover:shadow"
          >
            {"+ Add Teacher"}
          </Link>
        </div>
      </div>
      <div className="sticky top-0 z-50 h-2 w-full bg-white"></div>
      <div className="relative flex flex-col gap-4 xl:flex-row">
        <div className="sticky top-2 h-max border bg-white p-2 filter xl:w-64">
          <h2 className="mb-2 border-b pb-2 font-bold">Filter</h2>
          <form
            action=""
            className="flex flex-row flex-wrap justify-between gap-3 text-sm md:text-base xl:flex-col"
          >
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="dept">Department:</label>
              <select
                name="dept"
                id="dept"
                className="w-32 rounded border px-2 py-1 text-sm outline-none"
                // onChange={handleFilterChange}
                // value={filters.dept}
              >
                <option value="">All</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="Civil">Civil</option>
                <option value="Mechanical">Mechanical</option>
                <option value="English">English</option>
                <option value="BBA">BBA</option>
              </select>
            </div>
          </form>
        </div>
        <div className="flex flex-grow flex-col gap-5">
          {teachers.length > 0 ? (
            <table className="relative w-full border-separate border-spacing-0 text-sm md:text-base">
              <thead>
                <tr className="sticky top-2 bg-gray-100 *:border-b-2 *:border-r *:border-t *:border-gray-300 *:py-2 first:*:border-l">
                  <th>SL</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Dept.</th>
                  <th className="break-all">Designation</th>
                  <th>Tag</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers?.map((teacher, index) => (
                  <tr
                    key={index}
                    className="text-center *:border-b *:border-r *:border-gray-300 *:p-1 first:*:border-l odd:bg-white even:bg-gray-50"
                  >
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={teacher.photo}
                        width={50}
                        height={50}
                        alt={teacher.photo}
                        className="mx-auto h-12 w-12 object-cover"
                      />
                    </td>
                    <td>{teacher.name}</td>
                    <td>{teacher.dept}</td>
                    <td>{teacher.designation}</td>
                    <td>{teacher.tag}</td>
                    <td>
                      <div className="button_group flex flex-wrap items-center justify-center gap-2">
                        <Link
                          href={`/admin/dashboard/teachers/update-teacher?_id=${teacher._id}`}
                          className="flex w-max rounded border border-orange-300 bg-orange-100 p-1 font-medium text-orange-600 hover:bg-orange-600 hover:text-white"
                        >
                          <FaEdit className="text-lg" />
                        </Link>
                        <Link
                          href={`/admin/dashboard/teachers/delete-teacher?_id=${teacher._id}`}
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
            <div className="text-xl font-semibold italic text-rose-600">
              <p>No teachers found!</p>
            </div>
          )}
          {teachers.length > 25 && (
            <div className="pagination text-center">
              <button
                type="button"
                className="rounded border bg-gray-300 px-3 py-2"
              >
                Pagination here
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
