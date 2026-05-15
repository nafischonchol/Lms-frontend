import Link from "next/link";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Card, CardContent } from "@/components/admin/ui/card";
import { getEnrollmentsList } from "@/lib/api/enrollments";
import { EnrollmentStatusButtons } from "@/components/admin/enrollments/EnrollmentStatusButtons";
import { EnrollmentsListFilters } from "@/components/admin/enrollments/EnrollmentsListFilters";

type SearchParams = Promise<{ page?: string; search?: string; status?: string }>;

export default async function EnrollmentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, search, status } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const searchValue = search?.trim() || "";
  const statusValue = status || "";

  const enrollmentsResult = await getEnrollmentsList({
    page: currentPage,
    per_page: 20,
    search: searchValue || undefined,
    status: statusValue || undefined,
  });

  const { items: enrollments, pagination } = enrollmentsResult;

  const startItem = pagination.total === 0 ? 0 : (pagination.currentPage - 1) * pagination.perPage + 1;
  const endItem = Math.min(pagination.currentPage * pagination.perPage, pagination.total);
  const pageLinks = Array.from({ length: pagination.lastPage }, (_, idx) => idx + 1);

  const getPageHref = (pageNumber: number) => {
    const query = new URLSearchParams();
    query.set("page", String(pageNumber));
    if (searchValue) query.set("search", searchValue);
    if (statusValue) query.set("status", statusValue);
    return `/admin/enrollments?${query.toString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title=""
        breadcrumbs={[{ label: "Home", href: "/admin" }, { label: "Enrollments" }]}
      />

      <Card>
        <CardContent className="p-0">
          <EnrollmentsListFilters
            initialSearch={searchValue}
            initialStatus={statusValue}
            title="Enrollments"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-270 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Student</th>
                  <th className="px-6 py-4 font-semibold">Course</th>
                  <th className="px-6 py-4 font-semibold">Fee</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 text-slate-600">#{enrollment.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <Link 
                          href={`/admin/students/${enrollment.student_id}`}
                          className="font-medium text-slate-800 hover:text-indigo-600 hover:underline transition-colors"
                        >
                          {enrollment.student?.name}
                        </Link>
                        <span className="text-[11px] text-slate-500">{enrollment.student?.email}</span>
                        <span className="text-[11px] font-semibold text-indigo-600">{enrollment.student?.phone || "-"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-indigo-600">{enrollment.course?.title}</td>
                    <td className="px-6 py-4 text-slate-700 font-bold">
                      {enrollment.fee ? `৳${Number(enrollment.fee).toLocaleString()}` : "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {enrollment.enrolled_at ? formatDate(enrollment.enrolled_at) : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        enrollment.status === "approved" ? "bg-green-100 text-green-700" :
                        enrollment.status === "rejected" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <EnrollmentStatusButtons enrollmentId={enrollment.id} status={enrollment.status} />
                    </td>
                  </tr>
                ))}
                {enrollments.length === 0 ? (
                  <tr>
                    <td className="px-6 py-8 text-center text-slate-500" colSpan={6}>
                      No enrollments found.
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
