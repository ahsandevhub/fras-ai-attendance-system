"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaRedo } from "react-icons/fa";
import { RiBuilding2Line, RiCalendarLine } from "react-icons/ri";

const CourseFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filters = {
    dept: searchParams.get("dept")?.toString() || "",
    sem: searchParams.get("sem")?.toString() || "",
    instructor: searchParams.get("instructor")?.toString() || "",
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    replace(pathname);
  };

  return (
    <div className="my-4 flex-none rounded-xl border border-blue-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FaFilter className="text-blue-600" />
          Filter Courses
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
        >
          <FaRedo className="text-xs" />
          Reset
        </button>
      </div>

      <div className="flex justify-between gap-4">
        {/* Department Filter */}
        <div className="flex w-full flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiBuilding2Line className="text-base text-blue-500" />
            Department
          </label>
          <select
            name="dept"
            value={filters.dept}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="EEE">Electrical</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
            <option value="English">English</option>
            <option value="Math">Mathmatics</option>
            <option value="BBA">Business Admin</option>
          </select>
        </div>

        {/* Semester Filter */}
        <div className="flex w-full flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiCalendarLine className="text-base text-blue-500" />
            Semester
          </label>
          <select
            name="sem"
            value={filters.sem}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Semesters</option>
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

        {/* Instructor Filter */}
        <div className="flex w-full flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Instructor
          </label>
          <input
            type="text"
            name="instructor"
            value={filters.instructor}
            onChange={handleFilterChange}
            placeholder="Enter Instructor Name"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;
