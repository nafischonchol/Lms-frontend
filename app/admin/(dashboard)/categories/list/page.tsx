import Link from "next/link";
import { getCategoriesList } from "@/lib/api/categories";
import { CategoriesListFilters } from "@/components/admin/categories/CategoriesListFilters";
import { DeleteCategoryButton } from "@/components/admin/categories/DeleteCategoryButton";

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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <Link
          href="/admin/categories/add"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Category
        </Link>
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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Courses</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {category.description || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{category.courses_count || 0}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          category.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {category.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-3">
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
  );
}
