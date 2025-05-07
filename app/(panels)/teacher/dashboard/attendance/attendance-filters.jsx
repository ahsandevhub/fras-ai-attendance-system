// app/(dashboard)/attendance/filters.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaRedo } from "react-icons/fa";
import {
  RiBookLine,
  RiBuilding2Line,
  RiCalendarLine,
  RiGroupLine,
} from "react-icons/ri";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    value ? params.set(name, value) : params.delete(name);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => replace(pathname);

  return (
    <div className="mb-6 rounded-xl border border-rose-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FaFilter className="text-rose-600" />
          Filter Students
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
        >
          <FaRedo className="text-xs" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Department Filter */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiBuilding2Line className="text-base text-rose-500" />
            Department
          </label>
          <select
            name="dept"
            defaultValue={searchParams.get("dept") || ""}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="">All Departments</option>
            <option value="CSE">Computer Science</option>
            <option value="EEE">Electrical</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>

        {/* Semester Filter */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiCalendarLine className="text-base text-rose-500" />
            Semester
          </label>
          <select
            name="sem"
            defaultValue={searchParams.get("sem") || ""}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="">All Semesters</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option
                key={i}
                value={`${i + 1}${i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}`}
              >
                {i + 1}
                {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}{" "}
                Semester
              </option>
            ))}
          </select>
        </div>

        {/* Section Filter */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiGroupLine className="text-base text-rose-500" />
            Section
          </label>
          <select
            name="sec"
            defaultValue={searchParams.get("sec") || ""}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="">All Sections</option>
            {["A", "B", "C", "D"].map((section) => (
              <option key={section} value={section}>
                Section {section}
              </option>
            ))}
          </select>
        </div>

        {/* Course Filter */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiBookLine className="text-base text-rose-500" />
            Course
          </label>
          <select
            name="course"
            defaultValue={searchParams.get("course") || ""}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="">All Courses</option>
          </select>
        </div>
      </div>
    </div>
  );
}
