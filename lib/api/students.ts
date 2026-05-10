import "server-only";

import { extractPagination, fetchApi, type BasePagination } from "./common";

export type StudentApiModel = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  enrolled_courses_count?: number;
  completed_courses_count?: number;
  enrollments?: StudentEnrollmentApiModel[];
};

export type StudentEnrollmentApiModel = {
  id: number;
  student_id: number;
  course_id: number;
  fee: string | null;
  enrolled_at: string | null;
  completed_at: string | null;
  course: {
    id: number;
    title: string;
    thumbnail: string | null;
    level: string | null;
    status: string | null;
  } | null;
};

export type GetStudentsParams = {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: "1" | "0";
};

export type StudentsListResult = {
  items: StudentApiModel[];
  pagination: BasePagination;
};

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "active"].includes(normalized)) return true;
    if (["0", "false", "no", "inactive"].includes(normalized)) return false;
  }

  return fallback;
}

function asStringOrNull(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number") return String(value);
  return null;
}

function getMessage(payload: unknown, fallback: string): string {
  const root = asObject(payload);
  const message = root.message;
  return typeof message === "string" && message.trim() ? message : fallback;
}

function normalizeEnrollment(value: unknown): StudentEnrollmentApiModel {
  const item = asObject(value);
  const courseRaw = item.course;
  const course =
    courseRaw && typeof courseRaw === "object" && !Array.isArray(courseRaw)
      ? {
          id: Number((courseRaw as Record<string, unknown>).id),
          title: asString((courseRaw as Record<string, unknown>).title),
          thumbnail: asStringOrNull(
            (courseRaw as Record<string, unknown>).thumbnail,
          ),
          level: asStringOrNull((courseRaw as Record<string, unknown>).level),
          status: asStringOrNull((courseRaw as Record<string, unknown>).status),
        }
      : null;

  return {
    id: Number(item.id),
    student_id: Number(item.student_id),
    course_id: Number(item.course_id),
    fee: asStringOrNull(item.fee),
    enrolled_at: asStringOrNull(item.enrolled_at),
    completed_at: asStringOrNull(item.completed_at),
    course,
  };
}

function normalizeStudent(value: unknown): StudentApiModel {
  const item = asObject(value);

  return {
    id: asString(item.id),
    name: asString(item.name),
    email: asString(item.email),
    phone: asStringOrNull(item.phone),
    is_active: asBoolean(item.is_active, true),
    enrolled_courses_count:
      item.enrolled_courses_count !== undefined
        ? Number(item.enrolled_courses_count)
        : undefined,
    completed_courses_count:
      item.completed_courses_count !== undefined
        ? Number(item.completed_courses_count)
        : undefined,
    enrollments: Array.isArray(item.enrollments)
      ? item.enrollments.map(normalizeEnrollment)
      : undefined,
  };
}

function extractList(payload: unknown): unknown[] {
  const root = asObject(payload);
  if (Array.isArray(root.resources)) return root.resources;
  return [];
}

function extractOne(payload: unknown): unknown | null {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const root = payload as Record<string, unknown>;
    if (root.id !== undefined) return root;
  }

  const root = asObject(payload);
  const resources = asObject(root.resources);
  const candidates = [
    root.student,
    root.data,
    resources.student,
    resources.data,
    resources.item,
    resources,
  ];

  for (const candidate of candidates) {
    if (
      candidate &&
      typeof candidate === "object" &&
      !Array.isArray(candidate)
    ) {
      return candidate;
    }
  }

  return null;
}

export async function getStudentsList(
  params?: GetStudentsParams,
): Promise<StudentsListResult> {
  const fallbackPage = params?.page ?? 1;
  const fallbackPerPage = params?.per_page ?? 20;

  try {
    const query = new URLSearchParams();

    if (params?.page !== undefined) {
      query.set("page", String(params.page));
    }

    if (params?.per_page !== undefined) {
      query.set("per_page", String(params.per_page));
    }

    if (params?.search?.trim()) {
      query.set("search", params.search.trim());
    }

    if (params?.is_active !== undefined) {
      query.set("is_active", params.is_active);
    }

    const path = query.toString()
      ? `/admin/students?${query.toString()}`
      : "/admin/students";

    const response = await fetchApi(path);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getMessage(payload, "Failed to load students."));
    }

    return {
      items: extractList(payload).map(normalizeStudent),
      pagination: extractPagination(payload, fallbackPage, fallbackPerPage),
    };
  } catch (error) {
    console.error("Failed to fetch students:", error);
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

export async function getStudentById(
  studentId: string,
): Promise<StudentApiModel | null> {
  try {
    const response = await fetchApi(`/admin/students/${studentId}`);
    const payload = await response.json().catch(() => null);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(getMessage(payload, "Failed to load student details."));
    }

    const item = extractOne(payload);
    return item ? normalizeStudent(item) : null;
  } catch (error) {
    console.error(`Failed to fetch student ${studentId}:`, error);
    return null;
  }
}
