"use server";

import { revalidatePath } from "next/cache";
import { fetchApi } from "./common";

export type EnrollmentActionResult = {
  ok: boolean;
  message: string;
};

export async function enrollInCourseAction(courseId: number): Promise<EnrollmentActionResult> {
  try {
    const response = await fetchApi(`/student/courses/${courseId}/enroll`, {
      method: "POST",
    }, { 
      authType: "student" 
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: data?.message || "ভর্তির আবেদন ব্যর্থ হয়েছে।",
      };
    }

    revalidatePath(`/courses/${courseId}`);
    return {
      ok: true,
      message: "আপনার ভর্তির আবেদনটি সফলভাবে গ্রহণ করা হয়েছে।",
    };
  } catch (error) {
    console.error("Enrollment error:", error);
    return {
      ok: false,
      message: "সার্ভারের সাথে যোগাযোগ করতে সমস্যা হচ্ছে।",
    };
  }
}

export async function approveEnrollmentAction(enrollmentId: number): Promise<EnrollmentActionResult> {
  try {
    const response = await fetchApi(`/admin/enrollments/${enrollmentId}/approve`, {
      method: "PATCH",
    });

    if (!response.ok) {
      return { ok: false, message: "Failed to approve enrollment." };
    }

    revalidatePath("/admin/enrollments");
    return { ok: true, message: "Enrollment approved successfully." };
  } catch {
    return { ok: false, message: "Server error." };
  }
}

export async function rejectEnrollmentAction(enrollmentId: number): Promise<EnrollmentActionResult> {
  try {
    const response = await fetchApi(`/admin/enrollments/${enrollmentId}/reject`, {
      method: "PATCH",
    });

    if (!response.ok) {
      return { ok: false, message: "Failed to reject enrollment." };
    }

    revalidatePath("/admin/enrollments");
    return { ok: true, message: "Enrollment rejected successfully." };
  } catch {
    return { ok: false, message: "Server error." };
  }
}
