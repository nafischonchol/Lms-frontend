import Link from "next/link";
import { List } from "lucide-react";

import { CourseForm } from "@/components/admin/courses/CourseForm";
import { Button } from "@/components/admin/ui/button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { getCategoriesList } from "@/lib/api/categories";
import { getTeachersList } from "@/lib/api/teachers";

export default async function AddCoursePage() {
  const [teachersResult, categoriesResult] = await Promise.all([
    getTeachersList({ per_page: 200 }),
    getCategoriesList(),
  ]);

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title=""
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Courses", href: "/admin/courses/list" },
          { label: "Add" },
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
        mode="add"
        teachers={teachersResult.items.map((t) => ({ id: Number(t.id), name: t.name }))}
        categories={categoriesResult.items.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
