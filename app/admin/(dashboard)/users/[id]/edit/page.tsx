import { notFound } from "next/navigation";
import Link from "next/link";
import { List } from "lucide-react";

import { UserForm } from "@/components/admin/users/UserForm";
import { Button } from "@/components/admin/ui/button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { getUserById } from "@/lib/api/users";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="w-full space-y-6 px-3 py-4 md:px-4 lg:px-5">
      <PageHeader
        title="Edit User"
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Users", href: "/admin/users/list" },
          { label: "Edit" },
        ]}
        action={(
          <Link href="/admin/users/list">
            <Button variant="secondary">
              <List size={16} />
              User List
            </Button>
          </Link>
        )}
      />

      <UserForm
        mode="edit"
        userId={id}
        initialValues={{
          name: user.name,
          phone: user.phone,
          email: user.email,
          is_active: user.is_active ? "1" : "0",
          password: "",
          password_confirmation: "",
        }}
      />
    </div>
  );
}
