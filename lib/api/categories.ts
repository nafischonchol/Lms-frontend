import "server-only";

import { fetchApi } from "./common";

export interface Category {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  courses_count?: number;
  created_at: string;
  updated_at: string;
}

export type GetCategoriesParams = {
  search?: string;
  is_active?: boolean;
};

export type CategoriesListResult = {
  items: Category[];
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
    if (["1", "true", "yes"].includes(normalized)) return true;
    if (["0", "false", "no"].includes(normalized)) return false;
  }
  return fallback;
}

function getMessage(payload: unknown, fallback: string): string {
  const root = asObject(payload);
  const message = root.message;
  return typeof message === "string" && message.trim() ? message : fallback;
}

function normalizeCategory(value: unknown): Category {
  const item = asObject(value);
  return {
    id: Number(item.id),
    name: asString(item.name),
    description: asString(item.description) || null,
    is_active: asBoolean(item.is_active, true),
    courses_count:
      item.courses_count !== undefined ? Number(item.courses_count) : undefined,
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

export async function getCategoriesList(
  params?: GetCategoriesParams,
): Promise<CategoriesListResult> {
  try {
    const query = new URLSearchParams();
    if (params?.search?.trim()) query.set("search", params.search.trim());
    if (params?.is_active !== undefined)
      query.set("is_active", String(params.is_active));

    const path = query.toString()
      ? `/admin/categories?${query.toString()}`
      : "/admin/categories";
    const response = await fetchApi(path);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getMessage(payload, "Failed to load categories."));
    }

    return {
      items: payload?.resources || [],
    };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { items: [] };
  }
}

export async function getCategoryById(
  categoryId: number,
): Promise<Category | null> {
  try {
    const response = await fetchApi(`/admin/categories/${categoryId}`);
    const payload = await response.json().catch(() => null);

    if (response.status === 404) return null;
    if (!response.ok)
      throw new Error(getMessage(payload, "Failed to load category."));

    const item = extractOne(payload);
    return item ? normalizeCategory(item) : null;
  } catch (error) {
    console.error(`Failed to fetch category ${categoryId}:`, error);
    return null;
  }
}
