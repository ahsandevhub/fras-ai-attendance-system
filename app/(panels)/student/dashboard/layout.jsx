import SideNav from "@/app/ui/SideNav";

export const metadata = {
  title: "Students Panel | Facial Recognation Attendence System (FRAS)",
  description:
    "Facial Recognation Attendence System (FRAS), Developed by: Ahsan DevHub",
};

const StudentLayout = ({ children }) => {
  const links = [
    { name: "My Profile", href: "/student/dashboard", icon: "HomeIcon" },
    { name: "Courses", href: "/student/dashboard/courses", icon: "HomeIcon" },
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
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="flex-none">
        <SideNav links={links} text="Students Panel" colors={colors} />
      </aside>
      <main className="m-4 flex-grow rounded-md border p-5 md:overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
