"use client";

import { useTransition } from "react";
import { IoMdPower } from "react-icons/io";
import { handleSignout } from "../lib/handleSignout";

const SignoutButton = ({ colors, text }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => handleSignout(text))}
      className={`flex h-[48px] w-full items-center gap-2 rounded-t-md border bg-gray-50 p-3 text-sm font-medium ${colors.hoverBg} hover:${colors.text} flex-none`}
    >
      <IoMdPower className="text-lg" />
      <div className="">{isPending ? "Signing out..." : "Sign Out"}</div>
    </button>
  );
};

export default SignoutButton;
