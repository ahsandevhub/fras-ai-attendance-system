"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSignout(formData) {
  const role = formData.get("role");

  switch (role) {
    case "Admin Panel":
      cookies().delete("adminToken", { path: "/admin" });
      return redirect("/admin");
    case "Teacher Panel":
      cookies().delete("teacherToken", { path: "/teacher" });
      return redirect("/teacher");
    case "Student Panel":
      cookies().delete("studentToken", { path: "/student" });
      return redirect("/student");
    default:
      throw new Error("Invalid role");
  }
}
