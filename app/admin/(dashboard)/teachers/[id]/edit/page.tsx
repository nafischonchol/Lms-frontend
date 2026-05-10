import { notFound } from "next/navigation";
import Link from "next/link";
import { List } from "lucide-react";

import { TeacherForm } from "@/components/admin/teachers/TeacherForm";
import { Button } from "@/components/admin/ui/button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { getTeacherById } from "@/lib/api/teachers";

export default async function EditTeacherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const teacher = await getTeacherById(id);

  if (!teacher) {
    notFound();
  }

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title="Edit Teacher"
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Teachers", href: "/admin/teachers/list" },
          { label: "Edit" },
        ]}
        action={(
          <Link href="/admin/teachers/list">
            <Button variant="secondary">
              <List size={16} />
              Teacher List
            </Button>
          </Link>
        )}
      />

      <TeacherForm
        mode="edit"
        teacherId={id}
        initialValues={{
          name: teacher.name,
          phone: teacher.phone,
          email: teacher.email,
          is_active: teacher.is_active ? "1" : "0",
          password: "",
          password_confirmation: "",
        }}
      />
    </div>
  );
}
