"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createCategoryAction, updateCategoryAction } from "@/lib/api/category-actions";
import { Category } from "@/lib/api/categories";

type CategoryFormValues = {
  name: string;
  description: string;
  is_active: "1" | "0";
};

const defaultValues: CategoryFormValues = {
  name: "",
  description: "",
  is_active: "1",
};

type CategoryFormProps = {
  mode: "add" | "edit";
  categoryId?: string;
  initialValues?: Partial<CategoryFormValues>;
};

export function CategoryForm({ mode, categoryId, initialValues }: CategoryFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<CategoryFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();

        if (mode === "edit" && !categoryId) {
          setSubmitError("Category ID is missing for update request.");
          return;
        }

        setIsSubmitting(true);
        setSubmitError("");
        setSuccessMessage("");

        const payload = new FormData();
        payload.append("name", form.name);
        payload.append("description", form.description);
        payload.append("is_active", form.is_active);

        const result =
          mode === "add"
            ? await createCategoryAction(payload)
            : await updateCategoryAction(categoryId!, payload);

        setIsSubmitting(false);

        if (!result.ok) {
          setSubmitError(result.message);
          return;
        }

        setSuccessMessage(result.message);
        setTimeout(() => {
          router.push("/admin/categories/list");
          router.refresh();
        }, 800);
      }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Category Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category name"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category description (optional)"
        />
      </div>

      <div>
        <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          id="is_active"
          name="is_active"
          value={form.is_active}
          onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.value as "1" | "0" }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {submitError}
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {successMessage}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Link
          href="/admin/categories/list"
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : mode === "add" ? "Create Category" : "Update Category"}
        </button>
      </div>
    </form>
  );
}

// Helper to convert Category model to form initial values
export function categoryToFormValues(category: Category): Partial<CategoryFormValues> {
  return {
    name: category.name,
    description: category.description || "",
    is_active: category.is_active ? "1" : "0",
  };
}
