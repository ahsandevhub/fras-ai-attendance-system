"use client";

import { useRouter } from "next/navigation";

export const GoBackButton = ({ className = "", children }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className={`flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50 ${className}`}
    >
      {children || <span>Go Back</span>}
    </button>
  );
};
