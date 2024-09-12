"use client";

import Logo from "@/app/ui/landing-page/Logo";
import StudentIcon from "@/public/images/common/graduating-student.png";
import Image from "next/image";
import { useState } from "react";
// import { useFormState, useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const pending = false;

  // const { pending } = useFormStatus();

  // const initialState = { message: null, errors: {} };
  // const [state, formAction] = useFormState(authenticateStudent, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm space-y-5 rounded-xl bg-white p-8 shadow-md">
        <Logo />
        <div className="logo flex flex-col items-center gap-2">
          <div className="icon aspect-square h-16 w-auto overflow-hidden rounded-full bg-gray-100 ring-4 ring-emerald-300">
            <Image
              src={StudentIcon}
              alt="admin icon"
              className="mt-1 h-full w-auto object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Student Panel</h3>
        </div>
        <form className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm outline-blue-500 focus:border-emerald-500 focus:outline-2 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm outline-blue-500 focus:outline-2 sm:text-sm"
                placeholder="********"
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          {/* {state.message && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <AiOutlineExclamationCircle className="text-base" />
              <p>{state.message}</p>
            </div>
          )} */}
          <div>
            <button
              type="submit"
              disabled={pending}
              className={`flex h-10 w-full items-center rounded-lg px-4 text-sm font-medium text-white transition-colors ${pending ? "cursor-not-allowed bg-gray-500 opacity-50" : "bg-emerald-500 hover:bg-emerald-600"} `}
            >
              {pending ? (
                <>
                  <AiOutlineLoading className="mr-auto animate-spin text-lg text-gray-50" />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <HiOutlineArrowNarrowRight className="ml-auto h-5 w-5 text-gray-50" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
