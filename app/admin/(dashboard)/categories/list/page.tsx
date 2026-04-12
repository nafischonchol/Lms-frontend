import Link from "next/link";
import { Plus } from "lucide-react";

import { getCategoriesList } from "@/lib/api/categories";
import { CategoriesListFilters } from "@/components/admin/categories/CategoriesListFilters";
import { DeleteCategoryButton } from "@/components/admin/categories/DeleteCategoryButton";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent } from "@/components/admin/ui/card";
import { PageHeader } from "@/components/admin/ui/page-header";

interface CategoriesListPageProps {
  searchParams?: Promise<{ search?: string }>;
}

export default async function CategoriesListPage({ searchParams }: CategoriesListPageProps) {
  const params = await searchParams;
  const search = params?.search || "";

  const { items: categories } = await getCategoriesList({ search });

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title=""
        breadcrumbs={[{ label: "Home", href: "/admin" }, { label: "Categories" }]}
      />

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 md:p-6">
            <CategoriesListFilters />

            <Link href="/admin/categories/add">
              <Button>
                <Plus size={16} />
                Add Category
              </Button>
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">No categories found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold hidden md:table-cell">Description</th>
                    <th className="px-6 py-4 font-semibold">Courses</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{category.name}</td>
                      <td className="px-6 py-4 text-slate-600 hidden max-w-xs md:table-cell">
                        <div className="truncate">{category.description || "-"}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{category.courses_count || 0}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                            category.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {category.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/categories/${category.id}/edit`}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                          >
                            Edit
                          </Link>
                          <DeleteCategoryButton categoryId={category.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
