"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type AuthResult = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function studentRegisterAction(
  formData: FormData,
): Promise<AuthResult> {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");

  try {
    const response = await fetch(`${API_BASE_URL}/student/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        password,
        password_confirmation,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        message: data.message || "Registration failed.",
        errors: data.errors,
      };
    }

    if (data?.resources?.token) {
      const cookieStore = await cookies();
      cookieStore.set("student_token", data?.resources?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return { ok: true, message: "Registration successful!" };
  } catch (error) {
    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function studentLoginAction(
  formData: FormData,
): Promise<AuthResult> {
  if (!API_BASE_URL) {
    return { ok: false, message: "API base URL is not defined." };
  }

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${API_BASE_URL}/student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        message: data.message || "Login failed.",
        errors: data.errors,
      };
    }

    if (data?.resources?.token) {
      const cookieStore = await cookies();
      cookieStore.set("student_token", data?.resources?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      cookieStore.set("student", JSON.stringify(data?.resources?.student), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return { ok: true, message: "Login successful!" };
  } catch (error) {
    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function studentLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("student_token");
  redirect("/login");
}

export async function getStudentToken() {
  const cookieStore = await cookies();
  return cookieStore.get("student_token")?.value;
}
