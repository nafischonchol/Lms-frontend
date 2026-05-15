import "server-only";

import { extractPagination, fetchApi, type BasePagination } from "./common";

export type EnrollmentApiModel = {
  id: number;
  student_id: number;
  course_id: number;
  status: "pending" | "approved" | "rejected";
  fee: string | null;
  enrolled_at: string | null;
  student: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
  } | null;
  course: {
    id: number;
    title: string;
    thumbnail: string | null;
    mode: "online" | "offline" | "hybrid" | null;
  } | null;
};

export type EnrollmentListResult = {
  items: EnrollmentApiModel[];
  pagination: BasePagination;
};

export async function getEnrollmentsList(params?: {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}): Promise<EnrollmentListResult> {
  const fallbackPage = params?.page ?? 1;
  const fallbackPerPage = params?.per_page ?? 15;

  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.per_page) query.set("per_page", String(params.per_page));
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);

    const path = query.toString() ? `/admin/enrollments?${query.toString()}` : "/admin/enrollments";
    const response = await fetchApi(path);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error("Failed to load enrollments.");
    }

    return {
      items: payload.resources.map((item: any) => ({
        id: item.id,
        student_id: item.student_id,
        course_id: item.course_id,
        status: item.status,
        fee: item.fee,
        enrolled_at: item.enrolled_at,
        student: item.student,
        course: item.course,
      })),
      pagination: extractPagination(payload, fallbackPage, fallbackPerPage),
    };
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return {
      items: [],
      pagination: {
        currentPage: fallbackPage,
        lastPage: fallbackPage,
        perPage: fallbackPerPage,
        total: 0,
      },
    };
  }
}

export async function getMyEnrollmentsList(params?: {
  page?: number;
  per_page?: number;
}): Promise<EnrollmentListResult> {
  const fallbackPage = params?.page ?? 1;
  const fallbackPerPage = params?.per_page ?? 15;

  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.per_page) query.set("per_page", String(params.per_page));

    const path = query.toString() ? `/student/enrollments?${query.toString()}` : "/student/enrollments";
    const response = await fetchApi(path, {}, { authType: "student" });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error("Failed to load your enrollments.");
    }

    return {
      items: payload.resources.map((item: any) => ({
        id: item.id,
        student_id: item.student_id,
        course_id: item.course_id,
        status: item.status,
        fee: item.fee,
        enrolled_at: item.enrolled_at,
        student: item.student,
        course: item.course,
      })),
      pagination: extractPagination(payload, fallbackPage, fallbackPerPage),
    };
  } catch (error) {
    console.error("Error fetching my enrollments:", error);
    return {
      items: [],
      pagination: {
        currentPage: fallbackPage,
        lastPage: fallbackPage,
        perPage: fallbackPerPage,
        total: 0,
      },
    };
  }
}
