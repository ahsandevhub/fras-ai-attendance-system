import { updateStudent } from "@/app/lib/actions";
import { fetchStudent } from "@/app/lib/data";
import Link from "next/link";
import { FaArrowLeft, FaUserEdit } from "react-icons/fa";
import {
  RiBuilding2Line,
  RiCalendarLine,
  RiGroupLine,
  RiIdCardLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
} from "react-icons/ri";
import StudentImage from "./student-image";

const Page = async ({ searchParams }) => {
  const student = await fetchStudent(searchParams._id);
  const updateStudentWithId = updateStudent.bind(null, searchParams._id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaUserEdit className="text-2xl" />
          <h1 className="text-xl font-bold">Update Student</h1>
        </div>
        <Link
          href="/admin/dashboard/students"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50"
        >
          <FaArrowLeft />
          Back to Students
        </Link>
      </div>

      <div className="p-4">
        {/* Form Container */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-4 text-lg font-semibold text-blue-800">
            Student Information
          </h2>

          <form
            action={updateStudentWithId}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Left Column - Student Details */}
            <div className="space-y-6">
              {/* Department */}
              <div className="form-group">
                <label className="form-label">
                  <RiBuilding2Line className="form-icon" />
                  Department
                </label>
                <select
                  name="dept"
                  id="dept"
                  className="form-input"
                  required
                  defaultValue={student.dept}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="EEE">Electrical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="English">English</option>
                  <option value="BBA">Business Administration</option>
                </select>
              </div>

              {/* Semester */}
              <div className="form-group">
                <label className="form-label">
                  <RiCalendarLine className="form-icon" />
                  Semester
                </label>
                <select
                  name="sem"
                  id="sem"
                  className="form-input"
                  required
                  defaultValue={student.sem}
                >
                  <option value="" disabled>
                    Select Semester
                  </option>
                  <option value="1st">1st Semester</option>
                  <option value="2nd">2nd Semester</option>
                  <option value="3rd">3rd Semester</option>
                  <option value="4th">4th Semester</option>
                  <option value="5th">5th Semester</option>
                  <option value="6th">6th Semester</option>
                  <option value="7th">7th Semester</option>
                  <option value="8th">8th Semester</option>
                </select>
              </div>

              {/* Section */}
              <div className="form-group">
                <label className="form-label">
                  <RiGroupLine className="form-icon" />
                  Section
                </label>
                <select
                  name="sec"
                  id="sec"
                  className="form-input"
                  required
                  defaultValue={student.sec}
                >
                  <option value="" disabled>
                    Select Section
                  </option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                  <option value="E">Section E</option>
                </select>
              </div>

              {/* Student ID */}
              <div className="form-group">
                <label className="form-label">
                  <RiIdCardLine className="form-icon" />
                  Student ID
                </label>
                <input
                  name="id"
                  id="id"
                  type="text"
                  className="form-input"
                  placeholder="Enter student ID"
                  required
                  defaultValue={student.id}
                />
              </div>

              {/* Student Name */}
              <div className="form-group">
                <label className="form-label">
                  <RiUserLine className="form-icon" />
                  Full Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter student's full name"
                  required
                  defaultValue={student.name}
                />
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label className="form-label">
                  <RiPhoneLine className="form-icon" />
                  Phone Number
                </label>
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  className="form-input"
                  placeholder="Enter phone number"
                  required
                  defaultValue={student.phone}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  <RiMailLine className="form-icon" />
                  Email Address
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter email address"
                  required
                  defaultValue={student.email}
                />
              </div>
            </div>

            {/* Right Column - Photo Upload */}
            <div className="flex flex-col">
              <div className="sticky top-24 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <div className="mb-4 text-gray-500">
                  <StudentImage src={student.photo} />
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  Update student photo
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or JPEG (Max. 5MB)
                </p>
              </div>

              {/* Additional Fields or Notes can go here */}
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 text-sm font-medium text-blue-800">
                  Notes
                </h3>
                <textarea
                  name="notes"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  rows={4}
                  placeholder="Any additional notes about the student..."
                  defaultValue={student.notes || ""}
                ></textarea>
              </div>
            </div>

            {/* Full Width Submit Button */}
            <div className="pt-4 md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
