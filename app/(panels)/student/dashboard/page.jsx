import { fetchStudent } from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Image from "next/image";
import { FaCode, FaHashtag, FaPhoneAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Now from "./date-time";

const DashboardPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("studentToken")?.value;
  const { decoded } = await validateToken(token);
  const student = await fetchStudent(decoded._id);

  return (
    <div className="space-y-3">
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-green-600 px-4 py-2 text-white">
        <h1 className="font-semibold">Student Dashboard</h1>
      </div>
      <div className="greetings flex justify-between rounded border bg-gray-100 px-4 py-3 shadow-inner">
        <div className="user flex gap-3">
          <div className="photo">
            <Image
              src={student.photo}
              height={250}
              width={250}
              className="h-28 w-auto rounded border border-gray-200 bg-white p-1"
            />
          </div>
          <div className="details">
            <p className="text-lg font-bold text-green-600">
              Welcome, {student.name}!
            </p>
            <ul className="text-sm text-gray-800 *:flex *:items-center *:gap-1">
              <li>
                <FaCode className="text-gray-500" />{" "}
                {`Dept: ${student.dept};
                Sem: ${student.sem}; Sec: ${student.sec}`}
              </li>
              <li>
                <FaHashtag className="text-gray-500" /> {student.id}
              </li>
              <li>
                <MdAlternateEmail className="text-gray-500" /> {student.email}
              </li>
              <li>
                <FaPhoneAlt className="text-gray-500" /> {student.phone}
              </li>
            </ul>
          </div>
        </div>
        <Now />
      </div>
      <div className="flex gap-5">
        <div className="attendence flex-grow">
          <table className="w-full border">
            <thead>
              <tr className="border">
                <th className="border px-3 py-2">SL</th>
                <th className="border py-2">Course Code</th>
                <th className="border py-2">Course Title</th>
                <th className="border py-2">Total Classes</th>
                <th className="border py-2">Attendence</th>
                <th className="border py-2">Percentage</th>
                <th className="border py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border text-center">
                <td className="border p-1">1</td>
                <td className="border p-1">CSE-0610-112</td>
                <td className="border p-1">
                  Fourier Analysis and Laplace Transform
                </td>
                <td className="border p-1">6</td>
                <td className="border p-1">4</td>
                <td className="border p-1">76%</td>
                <td className="border p-1">Permitted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
