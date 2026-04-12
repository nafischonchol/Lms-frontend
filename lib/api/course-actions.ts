"use server";

import { revalidatePath } from "next/cache";

import { fetchApi } from "./common";

export type CourseActionResult = {
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

export async function createCourseAction(payload: FormData): Promise<CourseActionResult> {
  try {
    const response = await fetchApi("/admin/courses", {
      method: "POST",
      body: payload,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return { ok: false, message: getMessage(data, "Failed to create course.") };
    }

    revalidatePath("/admin/courses/list");
    return { ok: true, message: getMessage(data, "Course created successfully.") };
  } catch {
    return { ok: false, message: "Course API is unavailable." };
  }
}

export async function updateCourseAction(
  courseId: string,
  payload: FormData,
): Promise<CourseActionResult> {
  try {
    const response = await fetchApi(`/admin/courses/${courseId}`, {
      method: "PUT",
      body: payload,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return { ok: false, message: getMessage(data, "Failed to update course.") };
    }

    revalidatePath("/admin/courses/list");
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return { ok: true, message: getMessage(data, "Course updated successfully.") };
  } catch {
    return { ok: false, message: "Course API is unavailable." };
  }
}

export async function toggleCourseStatusAction(courseId: string): Promise<CourseActionResult> {
  try {
    const response = await fetchApi(`/admin/courses/${courseId}/toggle-status`, {
      method: "PATCH",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return { ok: false, message: getMessage(data, "Failed to update course status.") };
    }

    revalidatePath("/admin/courses/list");
    return { ok: true, message: getMessage(data, "Course status updated successfully.") };
  } catch {
    return { ok: false, message: "Course API is unavailable." };
  }
}

export async function deleteCourseAction(courseId: string): Promise<CourseActionResult> {
  try {
    const response = await fetchApi(`/admin/courses/${courseId}`, {
      method: "DELETE",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return { ok: false, message: getMessage(data, "Failed to delete course.") };
    }

    revalidatePath("/admin/courses/list");
    return { ok: true, message: getMessage(data, "Course deleted successfully.") };
  } catch {
    return { ok: false, message: "Course API is unavailable." };
  }
}
