import { fetchAdmin } from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Now from "./date-time";

const DashboardPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("adminToken")?.value;
  const { decoded } = await validateToken(token);
  const admin = await fetchAdmin(decoded._id);

  return (
    <div className="space-y-3">
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-blue-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Admin Dashboard</h1>
        <div className="buttons">
          <Link
            href="/admin/dashboard/students/add-student"
            className="rounded bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow-inner hover:bg-gray-200 hover:shadow"
          >
            + Add Student
          </Link>
        </div>
      </div>
      <div className="greetings flex justify-between rounded border bg-gray-100 px-4 py-3">
        <div className="user flex gap-3">
          <div className="photo">
            <Image
              src={admin.photo}
              height={250}
              width={250}
              className="h-24 w-auto rounded border border-gray-200 bg-white p-1"
            />
          </div>
          <div className="details">
            <p className="text-lg font-bold text-purple-600">
              Welcome, {admin.name}!
            </p>
            <ul className="text-sm text-gray-800 *:flex *:items-center *:gap-1">
              <li>
                <FaUser className="text-gray-500" /> {admin.name}
              </li>
              <li>
                <MdAlternateEmail className="text-gray-500" /> {admin.email}
              </li>
              <li>
                <FaPhoneAlt className="text-gray-500" /> {admin.phone}
              </li>
            </ul>
          </div>
        </div>
        <Now />
      </div>
    </div>
  );
};

export default DashboardPage;
