import { getCategoryById } from "@/lib/api/categories";
import { CategoryForm, categoryToFormValues } from "@/components/admin/categories/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(parseInt(id));

  if (!category) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Category</h1>
      <CategoryForm
        mode="edit"
        categoryId={String(category.id)}
        initialValues={categoryToFormValues(category)}
      />
    </div>
  );
}
