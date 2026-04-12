"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/admin/ui/button";
import { toggleUserStatusAction } from "@/lib/api/user-actions";

type UserStatusToggleButtonProps = {
  userId: string;
  isActive: boolean;
};

export function UserStatusToggleButton({ userId, isActive }: UserStatusToggleButtonProps) {
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
            const result = await toggleUserStatusAction(userId);
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
