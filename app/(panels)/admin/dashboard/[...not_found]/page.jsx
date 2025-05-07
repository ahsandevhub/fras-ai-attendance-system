"use client";

import { GoBackButton } from "@/app/ui/buttons";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { GrUndo } from "react-icons/gr";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header - Matches your admin dashboard */}
      <div className="header sticky top-0 flex items-center justify-between rounded-b-md bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg">
        <h1 className="text-xl font-bold">Page Not Found</h1>
        <GoBackButton className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow transition hover:bg-blue-50">
          <GrUndo className="text-lg" />
          Go Back
        </GoBackButton>
      </div>

      {/* Main Content */}
      <div className="mb-20 flex flex-grow items-center justify-center p-8">
        <div className="w-full max-w-2xl rounded-xl border border-blue-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* Error Icon */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
              <FaExclamationTriangle className="text-4xl" />
            </div>

            {/* Error Title */}
            <h1 className="mb-4 text-4xl font-bold text-gray-800">404 Error</h1>

            {/* Error Message */}
            <p className="mb-8 text-lg text-gray-600">
              The page you're looking for doesn't exist or is unavailable.
            </p>

            {/* Action Buttons */}
            <div className="flex w-full max-w-xs flex-col gap-4">
              <GoBackButton className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-800">
                <GrUndo className="text-lg" />
                Return to Previous Page
              </GoBackButton>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Link
                href="/admin/dashboard"
                className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-md transition hover:bg-gray-50"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
