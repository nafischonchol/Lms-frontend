import Link from "next/link";
import { getCategoriesList } from "@/lib/api/categories";
import { CategoriesListFilters } from "@/components/admin/categories/CategoriesListFilters";
import { DeleteCategoryButton } from "@/components/admin/categories/DeleteCategoryButton";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";

interface CategoriesListPageProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function CategoriesListPage({
  searchParams,
}: CategoriesListPageProps) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1");
  const search = params?.search || "";

  const { items: categories, pagination } = await getCategoriesList({ page, search });

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Category List */}
      <div className="flex-1 min-w-0 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        </div>

        <CategoriesListFilters />

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Courses</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate hidden md:table-cell">
                        {category.description || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{category.courses_count || 0}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            category.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {category.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm flex gap-3">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </Link>
                        <DeleteCategoryButton categoryId={category.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.lastPage > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {pagination.currentPage > 1 && (
                  <Link
                    href={`?page=${pagination.currentPage - 1}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`?page=${p}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                    className={`px-3 py-2 rounded-lg ${
                      pagination.currentPage === p
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {pagination.currentPage < pagination.lastPage && (
                  <Link
                    href={`?page=${pagination.currentPage + 1}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Category Form */}
      <div className="w-full lg:w-80 xl:w-96 bg-white rounded-lg shadow p-6 lg:sticky lg:top-6">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Add New Category</h2>
        <CategoryForm mode="add" onSuccess={() => {}} />
      </div>
    </div>
  );
}
