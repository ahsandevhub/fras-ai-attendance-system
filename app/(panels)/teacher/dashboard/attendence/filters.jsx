"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    handleSearch(name, value);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("dept");
    params.delete("sem");
    params.delete("sec");
    params.delete("course");
    router.replace(`${pathname}?${params.toString()}`);

    document.getElementById("filterForm").reset();
  };

  return (
    <div className="filter_container rounded-md border bg-gray-100 px-2 py-2">
      <form id="filterForm" className="flex gap-5">
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="dept">Department:</label>
          <select
            name="dept"
            id="dept"
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
            onChange={handleFilterChange}
            defaultValue={searchParams.get("dept") || ""}
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
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="sem">Semester:</label>
          <select
            name="sem"
            id="sem"
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
            onChange={handleFilterChange}
            defaultValue={searchParams.get("sem") || ""}
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
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="sec">Section:</label>
          <select
            name="sec"
            id="sec"
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
            onChange={handleFilterChange}
            defaultValue={searchParams.get("sec") || ""}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="course">Course:</label>
          <select
            name="course"
            id="course"
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
            onChange={handleFilterChange}
            defaultValue={searchParams.get("course") || ""}
          >
            <option value="" disabled>
              Select
            </option>
          </select>
        </div>
        <button
          type="button"
          className="w-24 rounded border border-rose-200 bg-rose-50 px-2 py-1 text-sm font-semibold text-rose-600 shadow-inner hover:bg-rose-100 hover:shadow-sm"
          onClick={clearFilters}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Filters;
