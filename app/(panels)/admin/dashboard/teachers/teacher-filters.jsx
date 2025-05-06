"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaRedo, FaSearch } from "react-icons/fa";
import { MdOutlineListAlt, MdOutlineSort } from "react-icons/md";
import { RiBuilding2Line, RiUserLine } from "react-icons/ri";

const TeacherFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filters = {
    dept: searchParams.get("dept")?.toString() || "",
    sem: searchParams.get("sem")?.toString() || "",
    sec: searchParams.get("sec")?.toString() || "",
    id: searchParams.get("id")?.toString() || "",
    name: searchParams.get("name")?.toString() || "",
    limit: searchParams.get("limit")?.toString() || "50",
    sort: searchParams.get("sort")?.toString() || "",
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
      params.set("page", "1"); // Reset to first page on filter change
    } else {
      params.delete(name);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    replace(pathname);
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <FaFilter className="text-lg" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Filter Teachers
          </h2>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        >
          <FaRedo className="text-sm" />
          Reset Filters
        </button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search by Name */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiUserLine className="text-blue-500" />
            Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search by name..."
            />
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <RiBuilding2Line className="text-blue-500" />
            Department
          </label>
          <select
            name="dept"
            value={filters.dept}
            onChange={handleFilterChange}
            className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            <option value="CSE">Computer Science</option>
            <option value="EEE">Electrical Engineering</option>
            <option value="Civil">Civil Engineering</option>
            <option value="Mechanical">Mechanical Engineering</option>
            <option value="English">English</option>
            <option value="BBA">Business Administration</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <MdOutlineSort className="text-blue-500" />
            Sort By
          </label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Default (Newest First)</option>
            <option value="asc">Oldest First</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
          </select>
        </div>

        {/* Items Per Page */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <MdOutlineListAlt className="text-blue-500" />
            Items Per Page
          </label>
          <select
            name="limit"
            value={filters.limit}
            onChange={handleFilterChange}
            className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="10">10 items</option>
            <option value="25">25 items</option>
            <option value="50">50 items</option>
            <option value="100">100 items</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TeacherFilters;
