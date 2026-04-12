"use server";

import { revalidatePath } from "next/cache";

import { fetchApi } from "./common";

export type StudentActionResult = {
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

export async function createStudentAction(payload: FormData): Promise<StudentActionResult> {
  try {
    const response = await fetchApi("/admin/students", {
      method: "POST",
      body: payload,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: getMessage(data, "Failed to create student."),
      };
    }

    revalidatePath("/admin/students/list");
    return {
      ok: true,
      message: getMessage(data, "Student created successfully."),
    };
  } catch {
    return {
      ok: false,
      message: "Student API is unavailable.",
    };
  }
}

export async function updateStudentAction(
  studentId: string,
  payload: FormData,
): Promise<StudentActionResult> {
  try {
    const response = await fetchApi(`/admin/students/${studentId}`, {
      method: "PUT",
      body: payload,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: getMessage(data, "Failed to update student."),
      };
    }

    revalidatePath("/admin/students/list");
    revalidatePath(`/admin/students/${studentId}/edit`);

    return {
      ok: true,
      message: getMessage(data, "Student updated successfully."),
    };
  } catch {
    return {
      ok: false,
      message: "Student API is unavailable.",
    };
  }
}

export async function activateStudentAction(studentId: string): Promise<StudentActionResult> {
  try {
    const response = await fetchApi(`/admin/students/${studentId}/activate`, {
      method: "PATCH",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: getMessage(data, "Failed to activate student."),
      };
    }

    revalidatePath("/admin/students/list");
    return {
      ok: true,
      message: getMessage(data, "Student activated successfully."),
    };
  } catch {
    return {
      ok: false,
      message: "Student API is unavailable.",
    };
  }
}

export async function deactivateStudentAction(studentId: string): Promise<StudentActionResult> {
  try {
    const response = await fetchApi(`/admin/students/${studentId}/deactivate`, {
      method: "PATCH",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: getMessage(data, "Failed to deactivate student."),
      };
    }

    revalidatePath("/admin/students/list");
    return {
      ok: true,
      message: getMessage(data, "Student deactivated successfully."),
    };
  } catch {
    return {
      ok: false,
      message: "Student API is unavailable.",
    };
  }
}
