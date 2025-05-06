import { fetchAdmin } from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Image from "next/image";
import {
  FaBell,
  FaBook,
  FaChalkboardTeacher,
  FaChartPie,
  FaCog,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";
import {
  MdAlternateEmail,
  MdClass,
  MdDashboard,
  MdSettings,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Now from "./date-time";

const DashboardPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("adminToken")?.value;
  const { decoded } = await validateToken(token);
  const admin = await fetchAdmin(decoded._id);

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Students",
      value: "1,245",
      icon: <FaUsers className="text-2xl" />,
      color: "bg-blue-100 text-blue-600",
      change: "+12% from last month",
    },
    {
      title: "Total Teachers",
      value: "48",
      icon: <FaChalkboardTeacher className="text-2xl" />,
      color: "bg-green-100 text-green-600",
      change: "+2 new hires",
    },
    {
      title: "Active Courses",
      value: "36",
      icon: <FaBook className="text-2xl" />,
      color: "bg-purple-100 text-purple-600",
      change: "3 new this semester",
    },
    {
      title: "System Health",
      value: "98%",
      icon: <FaChartPie className="text-2xl" />,
      color: "bg-amber-100 text-amber-600",
      change: "All systems normal",
    },
  ];

  const recentActivities = [
    {
      action: "Added new course 'AI Fundamentals'",
      time: "10 mins ago",
      icon: <FaBook />,
    },
    {
      action: "Approved 5 teacher applications",
      time: "1 hour ago",
      icon: <FaChalkboardTeacher />,
    },
    {
      action: "Updated attendance system",
      time: "3 hours ago",
      icon: <FaCog />,
    },
    {
      action: "Generated monthly reports",
      time: "Yesterday",
      icon: <FaChartPie />,
    },
  ];

  const pendingTasks = [
    { task: "Review 12 student applications", priority: "High" },
    { task: "Schedule semester exams", priority: "Medium" },
    { task: "Update system privacy policy", priority: "Low" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <RiAdminFill className="text-2xl" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-blue-500">
            <FaBell />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white">
              <Image
                src={admin.photo}
                width={32}
                height={32}
                alt="Admin"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{admin.name}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Welcome Section */}
        <div className="greetings mb-6 flex flex-col justify-between rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm md:flex-row">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-shrink-0">
              <Image
                src={admin.photo}
                height={120}
                width={120}
                alt="Admin"
                className="h-24 w-24 rounded-md border-4 border-white shadow-md"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-800">
                Welcome back,{" "}
                <span className="text-blue-600">{admin.name}</span>!
              </h2>
              <p className="mb-3 text-gray-600">
                Here's what's happening with your institution today.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow">
                  <MdAlternateEmail className="text-blue-500" />
                  <span>{admin.email}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow">
                  <FaPhoneAlt className="text-blue-500" />
                  <span>{admin.phone}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow">
                  <RiAdminFill className="text-blue-500" />
                  <span>System Administrator</span>
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
                  <p className="text-xs opacity-80">{stat.change}</p>
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
          {/* Quick Actions */}
          <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-1">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <MdDashboard className="text-blue-600" /> Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="flex w-full items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-left transition hover:bg-blue-100">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <FaUsers />
                </div>
                <span className="font-medium">Manage Students</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg bg-green-50 px-4 py-3 text-left transition hover:bg-green-100">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <FaChalkboardTeacher />
                </div>
                <span className="font-medium">Manage Teachers</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg bg-purple-50 px-4 py-3 text-left transition hover:bg-purple-100">
                <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                  <MdClass />
                </div>
                <span className="font-medium">Manage Courses</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg bg-amber-50 px-4 py-3 text-left transition hover:bg-amber-100">
                <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                  <MdSettings />
                </div>
                <span className="font-medium">System Settings</span>
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <FaBell className="text-blue-600" /> Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Pending Tasks */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <FaClipboardCheck className="text-blue-600" /> Pending Tasks
            </h3>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="font-medium">{task.task}</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Overview */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <FaChartPie className="text-blue-600" /> System Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-800">
                  Storage Usage
                </p>
                <div className="my-2 h-2 w-full rounded-full bg-blue-200">
                  <div className="h-2 w-3/4 rounded-full bg-blue-600"></div>
                </div>
                <p className="text-xs text-blue-600">75% of 500GB used</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">
                  Active Users
                </p>
                <div className="my-2 h-2 w-full rounded-full bg-green-200">
                  <div className="h-2 w-1/2 rounded-full bg-green-600"></div>
                </div>
                <p className="text-xs text-green-600">42 currently online</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-sm font-medium text-purple-800">
                  Attendance Today
                </p>
                <div className="my-2 h-2 w-full rounded-full bg-purple-200">
                  <div className="h-2 w-4/5 rounded-full bg-purple-600"></div>
                </div>
                <p className="text-xs text-purple-600">84% marked so far</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">
                  System Load
                </p>
                <div className="my-2 h-2 w-full rounded-full bg-amber-200">
                  <div className="h-2 w-1/3 rounded-full bg-amber-600"></div>
                </div>
                <p className="text-xs text-amber-600">33% CPU usage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
