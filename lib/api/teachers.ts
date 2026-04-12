import "server-only";

import { extractPagination, fetchApi, type BasePagination } from "./common";

export type TeacherApiModel = {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
};

export type GetTeachersParams = {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: "1" | "0";
};

export type TeachersListResult = {
  items: TeacherApiModel[];
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

function normalizeTeacher(value: unknown): TeacherApiModel {
  const item = asObject(value);

  return {
    id: asString(item.id),
    name: asString(item.name),
    email: asString(item.email),
    is_active: asBoolean(item.is_active, true),
  };
}

function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  const root = asObject(payload);
  if (Array.isArray(root.resources)) return root.resources;

  const resources = asObject(root.resources);
  const candidates = [root.data, root.teachers, resources.teachers, resources.data, resources.items, resources];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

function extractOne(payload: unknown): unknown | null {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const root = payload as Record<string, unknown>;
    if (root.id !== undefined) return root;
  }

  const root = asObject(payload);
  const resources = asObject(root.resources);
  const candidates = [root.teacher, root.data, resources.teacher, resources.data, resources.item, resources];

  for (const candidate of candidates) {
    if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
      return candidate;
    }
  }

  return null;
}

export async function getTeachersList(params?: GetTeachersParams): Promise<TeachersListResult> {
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

    const path = query.toString() ? `/admin/teachers?${query.toString()}` : "/admin/teachers";

    const response = await fetchApi(path);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getMessage(payload, "Failed to load teachers."));
    }

    return {
      items: extractList(payload).map(normalizeTeacher),
      pagination: extractPagination(payload, fallbackPage, fallbackPerPage),
    };
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
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

export async function getTeacherById(teacherId: string): Promise<TeacherApiModel | null> {
  try {
    const response = await fetchApi(`/admin/teachers/${teacherId}`);
    const payload = await response.json().catch(() => null);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(getMessage(payload, "Failed to load teacher details."));
    }

    const item = extractOne(payload);
    return item ? normalizeTeacher(item) : null;
  } catch (error) {
    console.error(`Failed to fetch teacher ${teacherId}:`, error);
    return null;
  }
}
