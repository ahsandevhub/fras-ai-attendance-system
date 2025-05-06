import { addTeacher } from "@/app/lib/actions";
import Link from "next/link";
import TeacherPhoto from "./teacher-photo";

const Page = () => {
  return (
    <div>
      <div className="header flex items-center justify-between rounded-b-md bg-blue-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Add Teacher</h1>
        <div className="buttons">
          <Link
            href="/admin/dashboard/teachers"
            className="rounded bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow-inner hover:bg-gray-200 hover:shadow"
          >
            {"< Go Back"}
          </Link>
        </div>
      </div>
      <div className="sticky top-0 z-50 h-2 w-full bg-white"></div>
      <div className="rounded-lg border bg-gray-50 p-5">
        <h3 className="mb-4 font-medium text-blue-600">Teacher Details Form</h3>
        <form action={addTeacher} className="flex flex-col gap-5">
          <div className="input_items flex flex-col gap-5">
            <div className="group flex items-center gap-8">
              <label htmlFor="dept" className="w-32">
                Department:
              </label>
              <select
                name="dept"
                id="dept"
                className="flex-grow rounded border px-2 py-2 text-sm outline-none"
                required
                defaultValue={""}
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
              <label htmlFor="name" className="w-32">
                Teacher Name:
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                placeholder="Enter name..."
                required
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="tag" className="w-32">
                Teacher's Tag:
              </label>
              <input
                name="tag"
                id="tag"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                placeholder="Enter teacher's tag..."
                required
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="designation" className="w-32">
                Designation:
              </label>
              <input
                name="designation"
                id="designation"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                placeholder="Enter designation..."
                required
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
              />
            </div>
            <TeacherPhoto />
            <div className="group flex items-center justify-center gap-8">
              <input
                type="submit"
                value="Add Teacher"
                className="cursor-pointer rounded-lg border bg-blue-500 px-8 py-2 font-medium text-white hover:bg-blue-600"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
