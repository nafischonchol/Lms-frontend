import { notFound } from "next/navigation";
import Link from "next/link";
import { List, Pencil } from "lucide-react";

import { CourseEnrollmentManager } from "@/components/admin/courses/CourseEnrollmentManager";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { PageHeader } from "@/components/admin/ui/page-header";
import { getCourseById } from "@/lib/api/courses";
import { getStudentsList } from "@/lib/api/students";

export default async function CourseEnrollPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courseId = Number(id);

  const [course, studentsResult] = await Promise.all([
    getCourseById(courseId),
    getStudentsList({ per_page: 200, is_active: "1" }),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title="Enroll Students"
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Courses", href: "/admin/courses/list" },
          { label: course.title, href: `/admin/courses/${courseId}/edit` },
          { label: "Enroll Students" },
        ]}
        action={
          <>
            <Link href="/admin/courses/list">
              <Button variant="secondary">
                <List size={16} />
                Course List
              </Button>
            </Link>
            <Link href={`/admin/courses/${courseId}/edit`}>
              <Button variant="secondary">
                <Pencil size={16} />
                Edit Course
              </Button>
            </Link>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Instructor</p>
            <p className="mt-1 text-sm text-slate-800">{course.instructor?.name ?? "-"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Category</p>
            <p className="mt-1 text-sm text-slate-800">{course.category?.name ?? "-"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
            <p className="mt-1 text-sm text-slate-800">{course.status}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Enrolled</p>
            <p className="mt-1 text-sm text-slate-800">{course.enrollments_count ?? 0} students</p>
          </div>
        </CardContent>
      </Card>

      <CourseEnrollmentManager
        courseId={courseId}
        students={studentsResult.items.map((student) => ({
          id: Number(student.id),
          name: student.name,
          email: student.email,
          is_active: student.is_active,
        }))}
        enrollments={course.enrollments ?? []}
      />
    </div>
  );
}