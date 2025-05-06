import { validateToken } from "@/app/lib/jwt";
import SideNav from "@/app/ui/SideNav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { FaUserGraduate } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";

export const metadata = {
  title: "Students Panel | Facial Recognation Attendence System (FRAS)",
  description:
    "Facial Recognation Attendence System (FRAS), Developed by: Ahsan DevHub",
};

const StudentLayout = async ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("studentToken")?.value;

  const { valid } = await validateToken(token);
  const isExist = cookies().has("studentToken");

  if (!isExist || !valid) {
    redirect("/student");
  }

  const links = [
    {
      name: "My Profile",
      href: "/student/dashboard",
      icon: <FaUserGraduate />,
    },
    {
      name: "Courses",
      href: "/student/dashboard/courses",
      icon: <GiNotebook />,
    },
  ];

  const colors = {
    text: "text-green-600",
    hoverText: "hover:text-green-600",
    bg: "bg-green-600",
    hoverBg: "hover:bg-green-100",
    lightBg: "bg-green-100",
    border: "border-green-200",
  };

  return (
    <div className="flex h-screen flex-col gap-4 md:flex-row md:overflow-hidden">
      <aside className="flex-none">
        <SideNav
          homepage="/student/dashboard"
          links={links}
          text="Student Panel"
          colors={colors}
        />
      </aside>
      <main className="mr-3 flex-grow overflow-auto">
        <NextTopLoader color="#f59e0b" height={4} showSpinner={false} />
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
