import { fetchStudent } from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Image from "next/image";
import {
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaCode,
  FaGraduationCap,
  FaHashtag,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  MdAlternateEmail,
  MdAssignment,
  MdClass,
  MdSchool,
} from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import Now from "./date-time";

const DashboardPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("studentToken")?.value;
  const { decoded } = await validateToken(token);
  const student = await fetchStudent(decoded._id);

  // Mock data for courses
  const courses = [
    {
      code: "CSE-0610-112",
      title: "Fourier Analysis",
      classes: 6,
      attended: 4,
      percentage: 76,
      status: "Permitted",
    },
    {
      code: "CSE-0610-113",
      title: "Data Structures",
      classes: 8,
      attended: 7,
      percentage: 88,
      status: "Good",
    },
    {
      code: "CSE-0610-114",
      title: "Database Systems",
      classes: 5,
      attended: 3,
      percentage: 60,
      status: "Warning",
    },
    {
      code: "CSE-0610-115",
      title: "Computer Networks",
      classes: 7,
      attended: 6,
      percentage: 86,
      status: "Good",
    },
    {
      code: "CSE-0610-114",
      title: "Database Systems",
      classes: 5,
      attended: 3,
      percentage: 60,
      status: "Warning",
    },
    {
      code: "CSE-0610-115",
      title: "Computer Networks",
      classes: 7,
      attended: 6,
      percentage: 86,
      status: "Good",
    },
  ];

  // Mock upcoming events
  const upcomingEvents = [
    {
      title: "Midterm Exam",
      course: "Data Structures",
      date: "May 15",
      time: "10:00 AM",
    },
    {
      title: "Assignment Due",
      course: "Database Systems",
      date: "May 18",
      time: "11:59 PM",
    },
    {
      title: "Project Submission",
      course: "Computer Networks",
      date: "May 22",
      time: "5:00 PM",
    },
  ];

  // Mock quick stats
  const stats = [
    {
      title: "Current CGPA",
      value: "3.75",
      icon: <FaGraduationCap className="text-2xl" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Attendance",
      value: "82%",
      icon: <FaChartLine className="text-2xl" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Assignments",
      value: "3",
      icon: <MdAssignment className="text-2xl" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Registered Courses",
      value: courses.length.toString(),
      icon: <FaBook className="text-2xl" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <RiDashboardFill className="text-2xl" />
          <h1 className="text-xl font-bold">Student Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white">
              <Image
                src={student.photo}
                width={32}
                height={32}
                alt="Student"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{student.name}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Welcome Section */}
        <div className="greetings mb-6 flex flex-col justify-between rounded-xl border border-green-100 bg-green-50 bg-gradient-to-r from-green-50 to-teal-50 p-6 shadow-sm md:flex-row">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-shrink-0">
              <Image
                src={student.photo}
                height={120}
                width={120}
                alt="Student"
                className="h-24 w-24 rounded-md border-4 border-white shadow-md"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800">
                Welcome back,{" "}
                <span className="text-green-600">{student.name}</span>!
              </h2>
              <p className="mb-3 text-gray-600">
                Here's your academic overview for today.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow">
                  <FaCode className="text-green-500" />
                  <span>
                    {student.dept} | Sem: {student.sem} | Sec: {student.sec}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow">
                  <FaHashtag className="text-green-500" />
                  <span>{student.id}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow">
                  <MdAlternateEmail className="text-green-500" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow">
                  <FaPhoneAlt className="text-green-500" />
                  <span>{student.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Now />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl border p-5 shadow-sm ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-white/30 p-3 backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Events */}
          <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-1">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <FaCalendarAlt className="text-green-600" /> Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="rounded-lg border-l-4 border-green-400 bg-green-50 p-3"
                >
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.course}</p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">{event.date}</span>
                    <span className="font-medium text-green-600">
                      {event.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <MdClass className="text-green-600" /> Attendance Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50 text-left *:border">
                    <th className="px-4 py-2">Course Code</th>
                    <th className="px-4 py-2">Course Title</th>
                    <th className="px-4 py-2 text-center">Classes</th>
                    <th className="px-4 py-2 text-center">Attended</th>
                    <th className="px-4 py-2 text-center">Percentage</th>
                    <th className="px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {courses.map((course, index) => (
                    <tr key={index} className="*:border hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{course.code}</td>
                      <td className="px-4 py-3">{course.title}</td>
                      <td className="px-4 py-3 text-center">
                        {course.classes}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {course.attended}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span>{course.percentage}%</span>
                          <div className="h-2 w-16 rounded-full bg-gray-200">
                            <div
                              className={`h-2 rounded-full ${
                                course.percentage >= 80
                                  ? "bg-green-500"
                                  : course.percentage >= 60
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${course.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            course.status === "Permitted" ||
                            course.status === "Good"
                              ? "bg-green-100 text-green-800"
                              : course.status === "Warning"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <MdSchool className="text-green-600" /> Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <a
              href="#"
              className="flex flex-col items-center rounded-lg bg-blue-50 p-4 text-center transition hover:bg-blue-100"
            >
              <div className="mb-2 rounded-full bg-blue-100 p-3 text-blue-600">
                <FaBook />
              </div>
              <span className="text-sm font-medium">Course Materials</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center rounded-lg bg-green-50 p-4 text-center transition hover:bg-green-100"
            >
              <div className="mb-2 rounded-full bg-green-100 p-3 text-green-600">
                <MdAssignment />
              </div>
              <span className="text-sm font-medium">Assignments</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center rounded-lg bg-purple-50 p-4 text-center transition hover:bg-purple-100"
            >
              <div className="mb-2 rounded-full bg-purple-100 p-3 text-purple-600">
                <FaChartLine />
              </div>
              <span className="text-sm font-medium">Grades</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center rounded-lg bg-amber-50 p-4 text-center transition hover:bg-amber-100"
            >
              <div className="mb-2 rounded-full bg-amber-100 p-3 text-amber-600">
                <FaClipboardList />
              </div>
              <span className="text-sm font-medium">Exam Schedule</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
