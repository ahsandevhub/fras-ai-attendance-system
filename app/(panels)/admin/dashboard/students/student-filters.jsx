"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const StudentFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filters = {
    dept: searchParams.get("dept")?.toString() || "",
    sem: searchParams.get("sem")?.toString() || "",
    sec: searchParams.get("sec")?.toString() || "",
    id: searchParams.get("id")?.toString() || "",
    limit: searchParams.get("limit")?.toString() || "",
    sort: searchParams.get("sort")?.toString() || "",
  };

  // Handle the change for each input
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
    // Create a new URLSearchParams instance with no parameters
    const params = new URLSearchParams();

    // Update the URL with no parameters
    replace(`${pathname}?${params.toString()}`);
  };

  // const handleFilterChange = useDebouncedCallback((e) => {
  //   const { name, value } = e.target;
  //   const params = new URLSearchParams(searchParams);

  //   if (value) {
  //     params.set(name, value);
  //   } else {
  //     params.delete(name);
  //   }

  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  return (
    <div className="sticky top-[60px] h-max border p-2 filter xl:w-64">
      <div className="mb-2 flex items-center justify-between border-b pb-2">
        <h2 className="font-bold">Filter</h2>
        <button
          type="button"
          onClick={handleReset}
          className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
      <form className="flex flex-row flex-wrap justify-between gap-3 text-sm md:text-base xl:flex-col">
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="sort">Sort:</label>
          <select
            name="sort"
            id="sort"
            defaultValue={filters.sort}
            onChange={handleFilterChange}
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
          >
            <option value="">FIFO</option>
            <option value="desc">LIFO</option>
          </select>
        </div>
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="limit">Show:</label>
          <select
            name="limit"
            id="limit"
            defaultValue={filters.limit}
            onChange={handleFilterChange}
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
          >
            <option value="50">50/page</option>
            <option value="100">100/page</option>
          </select>
        </div>
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="dept">Department:</label>
          <select
            name="dept"
            id="dept"
            defaultValue={filters.dept}
            onChange={handleFilterChange}
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
          >
            <option value="">All</option>
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
            defaultValue={filters.sem}
            onChange={handleFilterChange}
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
          >
            <option value="">All</option>
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
            defaultValue={filters.sec}
            onChange={handleFilterChange}
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
          >
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div className="group flex items-center justify-between gap-2">
          <label htmlFor="id">ID:</label>
          <input
            name="id"
            id="id"
            defaultValue={filters.id}
            onChange={handleFilterChange}
            className="w-32 rounded border px-2 py-1 text-sm outline-none"
            placeholder="Search ID..."
          />
        </div>
      </form>
    </div>
  );
};

export default StudentFilters;
