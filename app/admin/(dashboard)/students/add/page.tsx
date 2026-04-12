import Link from "next/link";
import { List } from "lucide-react";

import { StudentForm } from "@/components/admin/students/StudentForm";
import { Button } from "@/components/admin/ui/button";
import { PageHeader } from "@/components/admin/ui/page-header";

export default async function AddStudentPage() {
  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title=""
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Students", href: "/admin/students/list" },
          { label: "Add" },
        ]}
      />

      <StudentForm
        mode="add"
        showDetailsHeader={false}
        headerTitle="Add Student"
        headerAction={(
          <Link href="/admin/students/list">
            <Button variant="secondary">
              <List size={16} />
              Student List
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
