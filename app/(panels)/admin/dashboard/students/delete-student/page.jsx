import { removeStudent } from "@/app/lib/actions";
import { fetchStudent } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ searchParams }) => {
  const student = await fetchStudent(searchParams._id);
  const removeStudentWithId = removeStudent.bind(null, searchParams._id);

  return (
    <div className="space-y-3">
      <div className="header flex items-center justify-between rounded-b-md bg-blue-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Delete Students</h1>
        <div className="buttons">
          <Link
            href="/admin/dashboard/students"
            className="rounded bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow-inner hover:bg-gray-200 hover:shadow"
          >
            {"< Go Back"}
          </Link>
        </div>
      </div>
      <div className="rounded-lg border bg-gray-50 p-5">
        <h3 className="mb-4 font-medium text-blue-600">Student Details:</h3>

        <form action={removeStudentWithId} className="mt-5 flex flex-col gap-8">
          <div className="flex gap-2">
            <Image
              src={student.photo}
              alt={student.id}
              width={120}
              height={120}
              priority={true}
              className="h-36 w-36 rounded-md border bg-white object-cover p-2"
            />
            <div className="details flex flex-grow flex-col gap-1 rounded-md border bg-white px-3 py-2">
              <h1 className="text-lg font-bold text-blue-600">
                Name: {student.name}
              </h1>
              <p className="text-sm text-gray-500">Student ID: {student.id}</p>
              <p className="text-sm text-gray-500">
                Department: {student.dept}
              </p>
              <p className="text-sm text-gray-500">Semester: {student.sem}</p>
              <p className="text-sm text-gray-500">Section: {student.sec}</p>
            </div>
          </div>
          <div className="input_items flex flex-col gap-5">
            <div className="group flex items-center gap-8">
              <label htmlFor="name" className="w-32">
                Student Name:
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={student.name}
                readOnly
                disabled
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="id" className="w-32">
                Student ID:
              </label>
              <input
                name="id"
                id="id"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={student.id}
                readOnly
                disabled
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="phone" className="w-32">
                Phone Number:
              </label>
              <input
                name="phone"
                id="phone"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={student.phone}
                readOnly
                disabled
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="email" className="w-32">
                Email Address:
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={student.email}
                readOnly
                disabled
              />
            </div>
          </div>
          <div className="group flex items-center justify-center gap-5">
            <button
              type="submit"
              className="cursor-pointer rounded-lg border bg-rose-500 px-5 py-2 font-medium text-white hover:bg-rose-600"
            >
              Confirm Delete
            </button>
            <Link
              href="/admin/dashboard/students"
              className="cursor-pointer rounded-lg border bg-emerald-500 px-8 py-2 font-medium text-white hover:bg-emerald-600"
            >
              {"Cancel"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
