"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/admin/ui/button";
import { toggleTeacherStatusAction } from "@/lib/api/teacher-actions";

type TeacherStatusToggleButtonProps = {
  teacherId: string;
  isActive: boolean;
};

export function TeacherStatusToggleButton({ teacherId, isActive }: TeacherStatusToggleButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <Button
        type="button"
        size="sm"
        variant={isActive ? "danger" : "primary"}
        disabled={isPending}
        onClick={() => {
          setErrorMessage("");
          startTransition(async () => {
            const result = await toggleTeacherStatusAction(teacherId);
            if (!result.ok) {
              setErrorMessage(result.message || "Status update failed.");
              return;
            }

            router.refresh();
          });
        }}
      >
        {isPending ? "Saving..." : isActive ? "Deactivate" : "Activate"}
      </Button>

      {errorMessage ? <p className="mt-1 text-right text-xs text-rose-600">{errorMessage}</p> : null}
    </div>
  );
}
