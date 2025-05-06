import { updateStudent } from "@/app/lib/actions";
import { fetchStudent } from "@/app/lib/data";
import Link from "next/link";
import StudentImage from "./student-image";

const Page = async ({ searchParams }) => {
  const student = await fetchStudent(searchParams._id);

  const updateStudentWithId = updateStudent.bind(null, searchParams._id);
  return (
    <div className="space-y-3">
      <div className="header flex items-center justify-between rounded-b-md bg-blue-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Update Students</h1>
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
        <h3 className="mb-4 font-medium text-blue-600">Student Details Form</h3>
        <form action={updateStudentWithId} className="flex flex-col gap-5">
          <div className="group flex items-center gap-8">
            <label htmlFor="dept" className="w-32">
              Department:
            </label>
            <select
              name="dept"
              id="dept"
              className="flex-grow rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={student.dept}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
              <option value="English">English</option>
              <option value="BBA">BBA</option>
            </select>
          </div>
          <div className="group flex items-center gap-8">
            <label htmlFor="sem" className="w-32">
              Semester:
            </label>
            <select
              name="sem"
              id="sem"
              className="flex-grow rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={student.sem}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
            </select>
          </div>
          <div className="group flex items-center gap-8">
            <label htmlFor="sec" className="w-32">
              Section:
            </label>
            <select
              name="sec"
              id="sec"
              className="flex-grow rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={student.sec}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
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
              placeholder="Enter Student Id..."
              required
              defaultValue={student.id}
            />
          </div>
          <div className="group flex items-center gap-8">
            <label htmlFor="name" className="w-32">
              Student Name:
            </label>
            <input
              name="name"
              id="name"
              type="text"
              className="flex-grow rounded border px-3 py-2 text-sm outline-none"
              placeholder="Enter name..."
              required
              defaultValue={student.name}
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
              placeholder="Enter phone..."
              required
              defaultValue={student.phone}
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
              placeholder="Enter email..."
              required
              defaultValue={student.email}
            />
          </div>
          <StudentImage src={student.photo} />
          <div className="group flex items-center justify-center gap-8">
            <input
              type="submit"
              value="Update Student"
              className="cursor-pointer rounded-lg border bg-blue-500 px-8 py-2 font-medium text-white hover:bg-blue-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
