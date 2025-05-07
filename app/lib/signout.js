import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Signout Functions
export async function adminSignout() {
  try {
    cookies().delete("adminToken", { path: "/admin" });
  } catch (error) {
    console.error("Admin signout error:", error);
    throw new Error("Failed to sign out");
  }
  redirect("/admin");
}

export async function teacherSignout() {
  try {
    cookies().delete("teacherToken", { path: "/teacher" });
  } catch (error) {
    console.error("Teacher signout error:", error);
    throw new Error("Failed to sign out");
  }
  redirect("/teacher");
}

export async function studentSignout() {
  try {
    cookies().delete("studentToken", { path: "/student" });
  } catch (error) {
    console.error("Student signout error:", error);
    throw new Error("Failed to sign out");
  }
  redirect("/student");
}
