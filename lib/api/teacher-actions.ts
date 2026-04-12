"use server";

import { revalidatePath } from "next/cache";

import { fetchApi } from "./common";

export type TeacherActionResult = {
  ok: boolean;
  message: string;
};

function getMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const maybeMessage = (payload as Record<string, unknown>).message;
    if (typeof maybeMessage === "string" && maybeMessage.trim()) {
      return maybeMessage;
    }
  }

  return fallback;
}

export async function createTeacherAction(payload: FormData): Promise<TeacherActionResult> {
  try {
    const response = await fetchApi("/admin/teachers", {
      method: "POST",
      body: payload,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: getMessage(data, "Failed to create teacher."),
      };
    }

    revalidatePath("/admin/teachers/list");
    return {
      ok: true,
      message: getMessage(data, "Teacher created successfully."),
    };
  } catch {
    return {
      ok: false,
      message: "Teacher API is unavailable.",
    };
  }
}

export async function updateTeacherAction(
  teacherId: string,
  payload: FormData,
): Promise<TeacherActionResult> {
  try {
    const response = await fetchApi(`/admin/teachers/${teacherId}`, {
      method: "PUT",
      body: payload,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: getMessage(data, "Failed to update teacher."),
      };
    }

    revalidatePath("/admin/teachers/list");
    revalidatePath(`/admin/teachers/${teacherId}/edit`);

    return {
      ok: true,
      message: getMessage(data, "Teacher updated successfully."),
    };
  } catch {
    return {
      ok: false,
      message: "Teacher API is unavailable.",
    };
  }
}

export async function toggleTeacherStatusAction(teacherId: string): Promise<TeacherActionResult> {
  try {
    const response = await fetchApi(`/admin/teachers/${teacherId}/toggle-status`, {
      method: "PATCH",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: getMessage(data, "Failed to update teacher status."),
      };
    }

    revalidatePath("/admin/teachers/list");
    return {
      ok: true,
      message: getMessage(data, "Teacher status updated successfully."),
    };
  } catch {
    return {
      ok: false,
      message: "Teacher API is unavailable.",
    };
  }
}
