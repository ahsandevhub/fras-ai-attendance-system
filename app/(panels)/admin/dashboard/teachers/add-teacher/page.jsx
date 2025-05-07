"use client";

import { addTeacher } from "@/app/lib/actions";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { FaArrowLeft, FaChalkboardTeacher } from "react-icons/fa";
import {
  RiBuilding2Line,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
  RiUserStarLine,
} from "react-icons/ri";
import TeacherPhoto from "./teacher-photo";

const Page = () => {
  const { pending } = useFormStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaChalkboardTeacher className="text-2xl" />
          <h1 className="text-xl font-bold">Add New Teacher</h1>
        </div>
        <Link
          href="/admin/dashboard/teachers"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50"
        >
          <FaArrowLeft />
          Back to Teachers
        </Link>
      </div>

      <div className="my-4 px-4">
        {/* Form Container */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-4 text-lg font-semibold text-blue-800">
            <RiUserStarLine className="text-blue-500" />
            Teacher Information
          </h2>

          <form action={addTeacher} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Department */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiBuilding2Line className="text-blue-500" />
                  Department
                </label>
                <select
                  name="dept"
                  id="dept"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="EEE">Electrical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="English">English</option>
                  <option value="Math">Mathmatics</option>
                  <option value="BBA">Business Administration</option>
                </select>
              </div>

              {/* Teacher Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiUserLine className="text-blue-500" />
                  Full Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter teacher's full name"
                  required
                />
              </div>

              {/* Teacher's Tag */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiUserLine className="text-blue-500" />
                  Teacher Tag
                </label>
                <input
                  name="tag"
                  id="tag"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter unique tag (e.g., T-001)"
                  required
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiUserStarLine className="text-blue-500" />
                  Designation
                </label>
                <input
                  name="designation"
                  id="designation"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter designation (e.g., Professor)"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiPhoneLine className="text-blue-500" />
                  Phone Number
                </label>
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiMailLine className="text-blue-500" />
                  Email Address
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiUserLine className="text-blue-500" />
                  Profile Photo
                </label>
                <TeacherPhoto />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {pending ? "Adding Teacher..." : "Add Teacher"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
