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
  title: "Admin Panel | Facial Recognation Attendence System (FRAS)",
  description:
    "Facial Recognation Attendence System (FRAS), Developed by: Ahsan DevHub",
};

const AdminLayout = async ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("adminToken")?.value;

  const { valid } = await validateToken(token);
  const isExist = cookies().has("adminToken");

  if (!isExist || !valid) {
    redirect("/admin");
  }

  const links = [
    { name: "Home", href: "/admin/dashboard", icon: <MdDashboardCustomize /> },
    {
      name: "Students",
      href: "/admin/dashboard/students",
      icon: <FaUserGraduate />,
    },
    {
      name: "Teachers",
      href: "/admin/dashboard/teachers",
      icon: <FaChalkboardTeacher />,
    },
    {
      name: "Courses",
      href: "/admin/dashboard/courses",
      icon: <GiNotebook />,
    },
  ];

  const colors = {
    text: "text-blue-600",
    hoverText: "hover:text-blue-600",
    bg: "bg-blue-600",
    hoverBg: "hover:bg-sky-100",
    lightBg: "bg-sky-100",
    border: "border-blue-200",
  };

  return (
    <div className="flex h-screen flex-col gap-4 md:flex-row md:overflow-hidden">
      <aside className="flex-none">
        <SideNav links={links} text="Admin Panel" colors={colors} />
      </aside>
      <main className="flex-grow overflow-auto">
        <NextTopLoader color="#e11d48" height={4} showSpinner={false} />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
