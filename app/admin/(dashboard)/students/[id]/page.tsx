import { notFound } from "next/navigation";
import Link from "next/link";
import { List, Pencil } from "lucide-react";

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { PageHeader } from "@/components/admin/ui/page-header";
import { getStudentById } from "@/lib/api/students";

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString();
}

function formatFee(value: string | null | undefined) {
  if (!value) return "Free";
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default async function StudentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title="Student Details"
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Students", href: "/admin/students/list" },
          { label: student.name },
        ]}
        action={
          <>
            <Link href="/admin/students/list">
              <Button variant="secondary">
                <List size={16} />
                Student List
              </Button>
            </Link>
            <Link href={`/admin/students/${student.id}/edit`}>
              <Button variant="secondary">
                <Pencil size={16} />
                Edit Student
              </Button>
            </Link>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{student.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Phone</p>
            <p className="mt-1 text-sm text-slate-800">{student.phone || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 text-sm text-slate-800">{student.email || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
            <p className="mt-1 text-sm text-slate-800">{student.is_active ? "Active" : "Inactive"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Enrolled Courses</p>
            <p className="mt-1 text-sm text-slate-800">{student.enrolled_courses_count ?? 0}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Completed Courses</p>
            <p className="mt-1 text-sm text-slate-800">{student.completed_courses_count ?? 0}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Courses</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Course</th>
                  <th className="px-6 py-4 font-semibold">Level</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Fee</th>
                  <th className="px-6 py-4 font-semibold">Enrolled At</th>
                  <th className="px-6 py-4 font-semibold">Completed At</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(student.enrollments ?? []).map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {enrollment.course?.title ?? "Unknown course"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{enrollment.course?.level ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-600">{enrollment.course?.status ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-600">{formatFee(enrollment.fee)}</td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(enrollment.enrolled_at)}</td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(enrollment.completed_at)}</td>
                    <td className="px-6 py-4 text-right">
                      {enrollment.course ? (
                        <Link href={`/admin/courses/${enrollment.course.id}/enroll`}>
                          <Button variant="secondary" size="sm">Manage</Button>
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                ))}
                {(student.enrollments ?? []).length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                      This student is not enrolled in any courses yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}