import { notFound } from "next/navigation";
import Link from "next/link";
import { List } from "lucide-react";

import { CourseForm } from "@/components/admin/courses/CourseForm";
import { Button } from "@/components/admin/ui/button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { getCourseById } from "@/lib/api/courses";
import { getCategoriesList } from "@/lib/api/categories";
import { getTeachersList } from "@/lib/api/teachers";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courseId = Number(id);

  const [course, teachersResult, categoriesResult] = await Promise.all([
    getCourseById(courseId),
    getTeachersList({ per_page: 200 }),
    getCategoriesList(),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title="Edit Course"
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Courses", href: "/admin/courses/list" },
          { label: "Edit" },
        ]}
        action={
          <Link href="/admin/courses/list">
            <Button variant="secondary">
              <List size={16} />
              Course List
            </Button>
          </Link>
        }
      />

      <CourseForm
        mode="edit"
        courseId={String(courseId)}
        initialValues={{
          title: course.title,
          description: course.description ?? "",
          thumbnail: course.thumbnail ?? "",
          price: course.price ?? "",
          duration: course.duration ?? "",
          mode: course.mode ?? "",
          level: course.level ?? "",
          status: course.status,
          is_active: course.is_active ? "1" : "0",
          instructor_id: course.instructor_id != null ? String(course.instructor_id) : "",
          category_id: course.category_id != null ? String(course.category_id) : "",
        }}
        teachers={teachersResult.items.map((t) => ({ id: Number(t.id), name: t.name }))}
        categories={categoriesResult.items.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
