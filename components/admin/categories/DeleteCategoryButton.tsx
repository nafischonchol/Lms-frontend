"use client";

import { useState } from "react";
import { deleteCategoryAction } from "@/lib/api/category-actions";
import { useRouter } from "next/navigation";

interface DeleteCategoryButtonProps {
  categoryId: number;
}

export function DeleteCategoryButton({ categoryId }: DeleteCategoryButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteCategoryAction(categoryId);
      if (result.ok) {
        router.refresh();
      } else {
        alert(result.message || "Failed to delete category");
      }
    } catch {
      alert("Failed to delete category");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Delete
    </button>
  );
}
