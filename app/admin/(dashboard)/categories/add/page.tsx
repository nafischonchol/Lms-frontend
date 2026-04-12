import { CategoryForm } from "@/components/admin/categories/CategoryForm";

export default function AddCategoryPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Category</h1>
      <CategoryForm mode="add" />
    </div>
  );
}
