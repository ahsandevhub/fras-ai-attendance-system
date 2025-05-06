import { fetchTeacher } from "@/app/lib/data";
import { validateToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import Image from "next/image";
import { FaCode, FaHashtag, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Now from "./date-time";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("teacherToken")?.value;
  const { decoded } = await validateToken(token);
  const teacher = await fetchTeacher(decoded._id);

  return (
    <div className="space-y-3">
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-rose-500 px-4 py-2 text-white">
        <h1 className="font-semibold">Teacher Dashboard</h1>
      </div>
      <div className="greetings flex justify-between rounded border bg-gray-100 px-4 py-3 shadow-inner">
        <div className="user flex gap-3">
          <div className="photo">
            <Image
              src={teacher.photo}
              height={250}
              width={250}
              alt="Teacher"
              className="h-32 w-auto rounded border border-gray-200 bg-white p-1"
            />
          </div>
          <div className="details">
            <p className="text-lg font-bold text-rose-600">{teacher.name}</p>
            <ul className="text-sm text-gray-800 *:flex *:items-center *:gap-1">
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
            </ul>
          </div>
        </div>
        <Now />
      </div>
    </div>
  );
};

export default Page;
