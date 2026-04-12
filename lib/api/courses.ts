import "server-only";

import { extractPagination, fetchApi, type BasePagination } from "./common";

export type CourseApiModel = {
  id: number;
  instructor_id: number | null;
  category_id: number | null;
  title: string;
  description: string | null;
  thumbnail: string | null;
  price: string | null;
  duration: string | null;
  mode: "online" | "offline" | null;
  level: "beginner" | "intermediate" | "advanced" | null;
  status: "draft" | "published" | "archived";
  is_active: boolean;
  enrollments_count?: number;
  enrollments?: CourseEnrollmentApiModel[];
  instructor?: { id: number; name: string } | null;
  category?: { id: number; name: string } | null;
  created_at: string;
  updated_at: string;
};

export type CourseEnrollmentApiModel = {
  id: number;
  student_id: number;
  course_id: number;
  fee: string | null;
  enrolled_at: string | null;
  completed_at: string | null;
  student: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
  } | null;
};

export type GetCoursesParams = {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: "1" | "0";
  status?: string;
  category_id?: string;
  instructor_id?: string;
};

export type CoursesListResult = {
  items: CourseApiModel[];
  pagination: BasePagination;
};

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
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

function getMessage(payload: unknown, fallback: string): string {
  const root = asObject(payload);
  const message = root.message;
  return typeof message === "string" && message.trim() ? message : fallback;
}

function asStringOrNull(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number") return String(value);
  return null;
}

function normalizeEnrollment(value: unknown): CourseEnrollmentApiModel {
  const item = asObject(value);
  const studentRaw = item.student;
  const student =
    studentRaw && typeof studentRaw === "object" && !Array.isArray(studentRaw)
      ? {
          id: Number((studentRaw as Record<string, unknown>).id),
          name: asString((studentRaw as Record<string, unknown>).name),
          email: asString((studentRaw as Record<string, unknown>).email),
          is_active: asBoolean((studentRaw as Record<string, unknown>).is_active, true),
        }
      : null;

  return {
    id: Number(item.id),
    student_id: Number(item.student_id),
    course_id: Number(item.course_id),
    fee: asStringOrNull(item.fee),
    enrolled_at: asStringOrNull(item.enrolled_at),
    completed_at: asStringOrNull(item.completed_at),
    student,
  };
}

function normalizeCourse(value: unknown): CourseApiModel {
  const item = asObject(value);

  const instructorRaw = item.instructor;
  const instructor =
    instructorRaw && typeof instructorRaw === "object" && !Array.isArray(instructorRaw)
      ? {
          id: Number((instructorRaw as Record<string, unknown>).id),
          name: asString((instructorRaw as Record<string, unknown>).name),
        }
      : null;

  const categoryRaw = item.category;
  const category =
    categoryRaw && typeof categoryRaw === "object" && !Array.isArray(categoryRaw)
      ? {
          id: Number((categoryRaw as Record<string, unknown>).id),
          name: asString((categoryRaw as Record<string, unknown>).name),
        }
      : null;

  const rawMode = asString(item.mode);
  const mode: CourseApiModel["mode"] =
    rawMode === "online" || rawMode === "offline" ? rawMode : null;

  const rawLevel = asString(item.level);
  const level: CourseApiModel["level"] =
    rawLevel === "beginner" || rawLevel === "intermediate" || rawLevel === "advanced"
      ? rawLevel
      : null;

  const rawStatus = asString(item.status);
  const status: CourseApiModel["status"] =
    rawStatus === "published" || rawStatus === "archived" ? rawStatus : "draft";

  return {
    id: Number(item.id),
    instructor_id: item.instructor_id != null ? Number(item.instructor_id) : null,
    category_id: item.category_id != null ? Number(item.category_id) : null,
    title: asString(item.title),
    description: asStringOrNull(item.description),
    thumbnail: asStringOrNull(item.thumbnail),
    price: asStringOrNull(item.price),
    duration: asStringOrNull(item.duration),
    mode,
    level,
    status,
    is_active: asBoolean(item.is_active, true),
    enrollments_count:
      item.enrollments_count !== undefined ? Number(item.enrollments_count) : undefined,
    enrollments: Array.isArray(item.enrollments)
      ? item.enrollments.map(normalizeEnrollment)
      : undefined,
    instructor,
    category,
    created_at: asString(item.created_at),
    updated_at: asString(item.updated_at),
  };
}

function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  const root = asObject(payload);
  if (Array.isArray(root.data)) return root.data;

  return [];
}

function extractOne(payload: unknown): unknown | null {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const root = payload as Record<string, unknown>;
    if (root.id !== undefined) return root;
  }

  const root = asObject(payload);
  if (root.data && typeof root.data === "object" && !Array.isArray(root.data)) {
    return root.data;
  }

  return null;
}

export async function getCoursesList(params?: GetCoursesParams): Promise<CoursesListResult> {
  const fallbackPage = params?.page ?? 1;
  const fallbackPerPage = params?.per_page ?? 15;

  try {
    const query = new URLSearchParams();

    if (params?.page !== undefined) query.set("page", String(params.page));
    if (params?.per_page !== undefined) query.set("per_page", String(params.per_page));
    if (params?.search?.trim()) query.set("search", params.search.trim());
    if (params?.is_active !== undefined) query.set("is_active", params.is_active);
    if (params?.status) query.set("status", params.status);
    if (params?.category_id) query.set("category_id", params.category_id);
    if (params?.instructor_id) query.set("instructor_id", params.instructor_id);

    const path = query.toString() ? `/admin/courses?${query.toString()}` : "/admin/courses";

    const response = await fetchApi(path);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getMessage(payload, "Failed to load courses."));
    }

    return {
      items: extractList(payload).map(normalizeCourse),
      pagination: extractPagination(payload, fallbackPage, fallbackPerPage),
    };
  } catch (error) {
    console.error("Failed to fetch courses:", error);
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

export async function getCourseById(courseId: number): Promise<CourseApiModel | null> {
  try {
    const response = await fetchApi(`/admin/courses/${courseId}`);
    const payload = await response.json().catch(() => null);

    if (response.status === 404) return null;

    if (!response.ok) {
      throw new Error(getMessage(payload, "Failed to load course details."));
    }

    const item = extractOne(payload);
    return item ? normalizeCourse(item) : null;
  } catch (error) {
    console.error(`Failed to fetch course ${courseId}:`, error);
    return null;
  }
}
