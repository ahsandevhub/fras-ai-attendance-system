"use client";

import { addCourse } from "@/app/lib/actions";
import { fetchAllTeacherName } from "@/app/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import {
  RiBook2Line,
  RiBook3Line,
  RiBuilding3Line,
  RiCalendar2Line,
  RiEdit2Line,
  RiListCheck3,
  RiUser3Line,
} from "react-icons/ri";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [teacherNames, setTeacherNames] = useState([]);
  const [formData, setFormData] = useState({
    dept: "",
    sem: "",
    title: "",
    code: "",
    credit: "",
    instructor: "",
  });
  const [queryDept, setQueryDept] = useState("");
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchTeacherNames = async () => {
      try {
        const response = await fetchAllTeacherName(queryDept);

        setTeacherNames(response);
      } catch (error) {
        console.error("Error fetching teacher names:", error);
        setTeacherNames([]);
      }
    };

    fetchTeacherNames();
  }, [queryDept]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addCourse(formData);
      toast.success(result.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
      router.push("/admin/dashboard/courses");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add course.", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaPlusCircle className="text-2xl" />
          <h1 className="text-xl font-bold">Add New Course</h1>
        </div>
        <Link
          href="/admin/dashboard/courses"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50"
        >
          <FaArrowLeft />
          Back to Courses
        </Link>
      </div>

      <div className="my-4 px-4">
        {/* Form Container */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-4 text-lg font-semibold text-blue-800">
            <RiBook3Line className="text-blue-500" />
            Course Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Department */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiBuilding3Line className="text-blue-500" />
                  Department
                </label>
                <select
                  name="dept"
                  id="dept"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.dept}
                  onChange={handleInputChange}
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

              {/* Semester */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiCalendar2Line className="text-blue-500" />
                  Semester
                </label>
                <select
                  name="sem"
                  id="sem"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.sem}
                  onChange={handleInputChange}
                  required
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

              {/* Course Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiBook2Line className="text-blue-500" />
                  Course Title
                </label>
                <input
                  name="title"
                  id="title"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title..."
                  required
                />
              </div>

              {/* Course Code */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiListCheck3 className="text-blue-500" />
                  Course Code
                </label>
                <input
                  name="code"
                  id="code"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter course code..."
                  required
                />
              </div>

              {/* Credit */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiEdit2Line className="text-blue-500" />
                  Credit
                </label>
                <input
                  name="credit"
                  id="credit"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.credit}
                  onChange={handleInputChange}
                  placeholder="Enter credit..."
                  required
                />
              </div>

              {/* Instructor */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RiUser3Line className="text-blue-500" />
                  Instructor
                </label>
                <div className="flex gap-3">
                  <select
                    name="queryDept"
                    id="queryDept"
                    className="w-36 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={queryDept}
                    onChange={(e) => setQueryDept(e.target.value)}
                  >
                    <option value="" disabled>
                      Department
                    </option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="Civil">Civil</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="English">English</option>
                    <option value="Math">Mathmatics</option>
                    <option value="BBA">BBA</option>
                  </select>
                  <select
                    name="instructor"
                    id="instructor"
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select Instructor
                    </option>
                    {teacherNames.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {`${teacher.name} (${teacher.tag})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {pending ? "Adding Course..." : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
