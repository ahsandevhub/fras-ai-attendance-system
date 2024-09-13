"use client";

import { adminLogin } from "@/app/lib/login";
import Logo from "@/app/ui/landing-page/Logo";
import AdminIcon from "@/public/images/common/settings.png";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import AdminLoginButton from "./login-button";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(adminLogin, initialState);

  return (
    <div className="flex items-center justify-center sm:min-h-screen sm:bg-gray-100">
      <div className="w-full max-w-sm space-y-5 bg-white p-8 sm:rounded-xl sm:shadow-md">
        <Logo />
        <div className="flex flex-col items-center gap-2">
          <div className="icon aspect-square h-16 w-auto overflow-hidden rounded-full bg-gray-100 ring-4">
            <Image
              src={AdminIcon}
              alt="admin icon"
              className="ms-1 mt-1 h-full w-auto"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Admin Panel</h3>
        </div>
        <form action={formAction} className="space-y-6">
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
              className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm outline-blue-500 focus:outline-2 sm:text-sm"
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
                minLength={6}
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
          {state.message && (
            <div
              className="flex items-center space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <LiaExclamationCircleSolid className="text-lg text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </div>
          )}
          <div>
            <AdminLoginButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
