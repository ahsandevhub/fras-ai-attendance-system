import { validateToken } from "@/app/lib/jwt";
import SideNav from "@/app/ui/SideNav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";

export const metadata = {
  title: "Teachers Panel | Facial Recognation Attendence System (FRAS)",
  description:
    "Facial Recognation Attendence System (FRAS), Developed by: Ahsan DevHub",
};

const TeacherLayout = async ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("teacherToken")?.value;

  const { valid } = await validateToken(token);
  const isExist = cookies().has("teacherToken");

  if (!isExist || !valid) {
    redirect("/teacher");
  }

  const links = [
    {
      name: "Home",
      href: "/teacher/dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      name: "Attendence",
      href: "/teacher/dashboard/attendence",
      icon: <GiNotebook />,
    },
    {
      name: "Students",
      href: "/teacher/dashboard/students",
      icon: <FaUserGraduate />,
    },
    {
      name: "My Courses",
      href: "/teacher/dashboard/my-courses",
      icon: <FaChalkboardTeacher />,
    },
  ];

  const colors = {
    text: "text-rose-600",
    hoverText: "hover:text-rose-600",
    bg: "bg-rose-600",
    hoverBg: "hover:bg-red-100",
    lightBg: "bg-red-100",
    border: "border-rose-200",
  };

  return (
    <div className="flex h-screen flex-col gap-4 md:flex-row md:overflow-hidden">
      <aside className="flex-none">
        <SideNav links={links} text="Teacher Panel" colors={colors} />
      </aside>
      <main className="flex-grow overflow-auto pr-3">
        <NextTopLoader color="#f59e0b" height={4} showSpinner={false} />
        {children}
      </main>
    </div>
  );
};

export default TeacherLayout;
