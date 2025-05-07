import {
  FaCalendarAlt,
  FaChartPie,
  FaCheckCircle,
  FaFilter,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import { MdOutlineClass, MdOutlineDateRange } from "react-icons/md";

const Page = () => {
  // Mock attendance data
  const attendanceData = [
    {
      id: 1,
      course: "CSE-0610-112",
      title: "Fourier Analysis",
      date: "25-Feb-2024",
      status: "present",
    },
    {
      id: 2,
      course: "CSE-0610-112",
      title: "Fourier Analysis",
      date: "28-Feb-2024",
      status: "present",
    },
    {
      id: 3,
      course: "CSE-0610-112",
      title: "Fourier Analysis",
      date: "02-Mar-2024",
      status: "absent",
    },
    {
      id: 4,
      course: "CSE-0610-113",
      title: "Data Structures",
      date: "26-Feb-2024",
      status: "present",
    },
    {
      id: 5,
      course: "CSE-0610-113",
      title: "Data Structures",
      date: "01-Mar-2024",
      status: "present",
    },
    {
      id: 6,
      course: "CSE-0610-114",
      title: "Database Systems",
      date: "27-Feb-2024",
      status: "absent",
    },
    {
      id: 7,
      course: "CSE-0610-114",
      title: "Database Systems",
      date: "03-Mar-2024",
      status: "present",
    },
  ];

  // Calculate attendance stats
  const totalClasses = attendanceData.length;
  const presentClasses = attendanceData.filter(
    (c) => c.status === "present",
  ).length;
  const attendancePercentage = Math.round(
    (presentClasses / totalClasses) * 100,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          {/* Replace with your attendance icon */}
          <FaChartPie className="text-2xl" />
          <h1 className="text-xl font-bold">My Courses Attendance</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-green-50 bg-opacity-20 px-3 py-1">
            <FaChartPie className="text-green-200" />
            <span className="text-sm font-medium">
              Overall:{" "}
              <span className="font-semibold">{attendancePercentage}%</span>
            </span>
          </div>
          {/* You can add more elements here if needed, like a user profile icon */}
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-green-200 bg-green-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-green-800">
                Total Classes
              </h3>
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <MdOutlineClass />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-900">
              {totalClasses}
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-blue-800">Present</h3>
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <FaCheckCircle />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-900">
              {presentClasses}
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-amber-800">
                Attendance Rate
              </h3>
              <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                <FaChartPie />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-900">
              {attendancePercentage}%
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filter Sidebar */}
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:w-72">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <FaFilter className="text-green-600" /> Filters
              </h2>
              <button className="text-sm text-green-600 hover:underline">
                Reset
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="course"
                  className="mb-1 flex items-center gap-2 text-sm font-medium"
                >
                  <MdOutlineClass /> Course
                </label>
                <select
                  id="course"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="all">All Courses</option>
                  <option value="CSE-0610-112">Fourier Analysis</option>
                  <option value="CSE-0610-113">Data Structures</option>
                  <option value="CSE-0610-114">Database Systems</option>
                  <option value="CSE-0610-115">Computer Networks</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-1 flex items-center gap-2 text-sm font-medium"
                >
                  <FaCheckCircle /> Status
                </label>
                <select
                  id="status"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                  <MdOutlineDateRange /> Date Range
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="From"
                  />
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="To"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                <FaSearch /> Apply Filters
              </button>
            </form>
          </div>

          {/* Attendance Table */}
          <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {attendanceData.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {record.course}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {record.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          {record.date}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {record.status === "present" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            <FaCheckCircle className="text-green-500" /> Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            <FaTimesCircle className="text-red-500" /> Absent
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-gray-200">
                            <div
                              className={`h-2 rounded-full ${
                                record.status === "present"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width:
                                  record.status === "present" ? "100%" : "0%",
                              }}
                            ></div>
                          </div>
                          {record.status === "present" ? "100%" : "0%"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary and Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">7</span> of{" "}
                <span className="font-medium">7</span> records
              </div>
              <div className="flex space-x-2">
                <button
                  disabled
                  className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
