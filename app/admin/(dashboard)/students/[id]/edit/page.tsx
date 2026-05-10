import { notFound } from "next/navigation";
import Link from "next/link";
import { Eye, List } from "lucide-react";

import { StudentForm } from "@/components/admin/students/StudentForm";
import { Button } from "@/components/admin/ui/button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { getStudentById } from "@/lib/api/students";

export default async function EditStudentPage({
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
        title="Edit Student"
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Students", href: "/admin/students/list" },
          { label: "Edit" },
        ]}
        action={(
          <>
            <Link href="/admin/students/list">
              <Button variant="secondary">
                <List size={16} />
                Student List
              </Button>
            </Link>
            <Link href={`/admin/students/${id}`}>
              <Button variant="secondary">
                <Eye size={16} />
                View Details
              </Button>
            </Link>
          </>
        )}
      />

      <StudentForm
        mode="edit"
        studentId={id}
        initialValues={{
          name: student.name,
          email: student.email,
          phone: student.phone || "",
          is_active: student.is_active ? "1" : "0",
          password: "",
          password_confirmation: "",
        }}
      />
    </div>
  );
}
