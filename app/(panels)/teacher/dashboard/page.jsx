import { fetchTeacher } from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChartLine,
  FaClipboardList,
  FaCode,
  FaHashtag,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdAlternateEmail, MdClass, MdGroups } from "react-icons/md";
import Now from "./date-time";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("teacherToken")?.value;
  const { decoded } = await validateToken(token);
  const teacher = await fetchTeacher(decoded._id);

  // Mock data for dashboard cards
  const stats = [
    {
      title: "Today's Classes",
      value: 3,
      icon: <MdClass className="text-2xl" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Students",
      value: 87,
      icon: <MdGroups className="text-2xl" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Attendance Rate",
      value: "92%",
      icon: <FaChartLine className="text-2xl" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending Tasks",
      value: 2,
      icon: <FaClipboardList className="text-2xl" />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  // Mock upcoming classes
  const upcomingClasses = [
    { course: "CS-101", time: "09:00 AM", room: "B-204", status: "Upcoming" },
    { course: "AI-301", time: "11:30 AM", room: "A-105", status: "Upcoming" },
    { course: "DS-201", time: "02:00 PM", room: "C-302", status: "Later" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-3 text-white shadow-md">
        <div className="flex items-center gap-2">
          <GiTeacher className="text-xl" />
          <h1 className="text-lg font-bold">Teacher Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{teacher.designation}</span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* Greetings Section */}
        <div className="greetings flex flex-col justify-between rounded-lg border bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 shadow-sm md:flex-row">
          <div className="user flex flex-col gap-4 sm:flex-row">
            <div className="photo flex-shrink-0">
              <Image
                src={teacher.photo}
                height={250}
                width={250}
                alt="Teacher"
                className="h-32 w-32 rounded-md border-4 border-white shadow-md"
              />
            </div>
            <div className="details">
              <p className="text-2xl font-bold text-rose-600">{teacher.name}</p>
              <p className="mb-2 text-sm text-gray-600">
                Welcome back to your dashboard
              </p>
              <ul className="grid grid-cols-1 gap-1 text-sm text-gray-800 *:flex *:items-center *:gap-2 sm:grid-cols-2">
                <li>
                  <FaCode className="text-gray-500" /> Department of{" "}
                  {teacher.dept}
                </li>
                <li>
                  <FaHashtag className="text-gray-500" /> {teacher.designation}
                </li>
                <li>
                  <FaUser className="text-gray-500" /> {teacher.tag}
                </li>
                <li>
                  <MdAlternateEmail className="text-gray-500" /> {teacher.email}
                </li>
                <li>
                  <FaPhoneAlt className="text-gray-500" /> {teacher.phone}
                </li>
                <li>
                  <FaChalkboardTeacher className="text-gray-500" /> 5 Years
                  Experience
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Now />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-lg border p-4 shadow-sm ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full p-3">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Classes and Quick Actions */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Upcoming Classes */}
          <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-2">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
              <FaCalendarAlt className="text-rose-500" /> Today's Schedule
            </h2>
            <div className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded border-l-4 border-rose-400 bg-gray-50 p-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">{cls.course}</p>
                    <p className="text-sm text-gray-600">
                      {cls.time} • {cls.room}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      cls.status === "Upcoming"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {cls.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center rounded-lg bg-blue-50 p-4 text-center transition hover:bg-blue-100">
                <div className="mb-2 rounded-full bg-blue-100 p-3 text-blue-600">
                  <FaClipboardList />
                </div>
                <span className="text-sm font-medium">Take Attendance</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-4 text-center transition hover:bg-green-100">
                <div className="mb-2 rounded-full bg-green-100 p-3 text-green-600">
                  <FaChartLine />
                </div>
                <span className="text-sm font-medium">View Reports</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg bg-purple-50 p-4 text-center transition hover:bg-purple-100">
                <div className="mb-2 rounded-full bg-purple-100 p-3 text-purple-600">
                  <MdGroups />
                </div>
                <span className="text-sm font-medium">My Students</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg bg-yellow-50 p-4 text-center transition hover:bg-yellow-100">
                <div className="mb-2 rounded-full bg-yellow-100 p-3 text-yellow-600">
                  <FaChalkboardTeacher />
                </div>
                <span className="text-sm font-medium">My Classes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-b pb-3 last:border-b-0"
              >
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <FaUser className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Marked attendance for{" "}
                    <span className="text-rose-600">CS-101</span> class
                  </p>
                  <p className="text-xs text-gray-500">
                    2 hours ago • 87 students recorded
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
