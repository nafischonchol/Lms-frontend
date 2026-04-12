import Link from "next/link";
import { List } from "lucide-react";

import { TeacherForm } from "@/components/admin/teachers/TeacherForm";
import { Button } from "@/components/admin/ui/button";
import { PageHeader } from "@/components/admin/ui/page-header";

export default async function AddTeacherPage() {
  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title=""
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Teachers", href: "/admin/teachers/list" },
          { label: "Add" },
        ]}
      />

      <TeacherForm
        mode="add"
        showDetailsHeader={false}
        headerTitle="Add Teacher"
        headerAction={(
          <Link href="/admin/teachers/list">
            <Button variant="secondary">
              <List size={16} />
              Teacher List
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
