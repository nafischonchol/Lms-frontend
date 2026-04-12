import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent } from "@/components/admin/ui/card";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StudentsListFilters } from "@/components/admin/students/StudentsListFilters";
import { StudentStatusToggleButton } from "@/components/admin/students/StudentStatusToggleButton";
import { getStudentsList } from "@/lib/api/students";

function formatBoolean(value: boolean, trueLabel: string, falseLabel: string) {
  return value ? trueLabel : falseLabel;
}

type SearchParams = Promise<{ page?: string; search?: string }>;

export default async function StudentsListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const searchValue = search?.trim() || "";

  const studentsResult = await getStudentsList({
    page: currentPage,
    per_page: 20,
    search: searchValue || undefined,
  });

  const { items: students, pagination } = studentsResult;

  const startItem = pagination.total === 0 ? 0 : (pagination.currentPage - 1) * pagination.perPage + 1;
  const endItem = Math.min(pagination.currentPage * pagination.perPage, pagination.total);
  const pageLinks = Array.from({ length: pagination.lastPage }, (_, idx) => idx + 1);
  const getPageHref = (pageNumber: number) => {
    const query = new URLSearchParams();
    query.set("page", String(pageNumber));

    if (searchValue) {
      query.set("search", searchValue);
    }

    return `/admin/students/list?${query.toString()}`;
  };

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title=""
        breadcrumbs={[{ label: "Home", href: "/admin" }, { label: "Students" }]}
      />

      <Card>
        <CardContent className="p-0">
          <StudentsListFilters
            initialSearch={searchValue}
            title="Students"
            action={(
              <Link href="/admin/students/add">
                <Button>
                  <Plus size={16} />
                  Add Student
                </Button>
              </Link>
            )}
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-270 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 text-slate-600">#{student.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                    <td className="px-6 py-4 text-slate-600">{student.email}</td>
                    <td className="px-6 py-4 text-slate-600">{formatBoolean(student.is_active, "Active", "Inactive")}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <StudentStatusToggleButton studentId={student.id} isActive={student.is_active} />
                        <Link href={`/admin/students/${student.id}/edit`}>
                          <Button variant="secondary" size="sm">
                            <Pencil size={14} />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 ? (
                  <tr>
                    <td className="px-6 py-8 text-center text-slate-500" colSpan={5}>
                      No students found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <p className="text-sm text-slate-500">
              Showing {startItem}-{endItem} of {pagination.total}
            </p>

            <div className="flex items-center gap-2">
              <Link
                href={getPageHref(Math.max(1, pagination.currentPage - 1))}
                aria-disabled={pagination.currentPage <= 1}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pagination.currentPage <= 1
                    ? "pointer-events-none bg-slate-100 text-slate-400"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Prev
              </Link>

              {pageLinks.map((pageNumber) => (
                <Link
                  key={pageNumber}
                  href={getPageHref(pageNumber)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    pageNumber === pagination.currentPage
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {pageNumber}
                </Link>
              ))}

              <Link
                href={getPageHref(Math.min(pagination.lastPage, pagination.currentPage + 1))}
                aria-disabled={pagination.currentPage >= pagination.lastPage}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pagination.currentPage >= pagination.lastPage
                    ? "pointer-events-none bg-slate-100 text-slate-400"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
