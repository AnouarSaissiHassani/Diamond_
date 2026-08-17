"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export async function loginAdmin(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    // Set a cookie for the session that expires in 7 days
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  } else {
    return { success: false, error: "Mot de passe incorrect." };
  }
}

export async function logoutAdmin() {
  await signOut({ redirectTo: "/login" });
}
