import { redirect } from "next/navigation";

export default function AddCategoryPage() {
  redirect("/admin/categories/list");
}
