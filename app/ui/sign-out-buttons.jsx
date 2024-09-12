import { adminSignOut } from "@/auth";
import { IoMdPower } from "react-icons/io";

export const AdminSignOut = () => {
  return (
    <form action={adminSignOut}>
      <button
        type="submit"
        className={`flex h-[48px] w-full items-center gap-2 rounded-md border bg-gray-50 p-3 text-sm font-medium ${colors.hoverBg} hover:${colors.text} flex-none`}
      >
        <IoMdPower className="text-lg" />
        <div className="">Sign Out</div>
      </button>
    </form>
  );
};
