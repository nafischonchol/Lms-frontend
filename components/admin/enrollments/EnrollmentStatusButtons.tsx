"use client";

import { useState } from "react";
import { approveEnrollmentAction, rejectEnrollmentAction } from "@/lib/api/enrollment-actions";
import { Button } from "@/components/admin/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface EnrollmentStatusButtonsProps {
  enrollmentId: number;
  status: string;
}

export function EnrollmentStatusButtons({ enrollmentId, status }: EnrollmentStatusButtonsProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  if (status !== "pending") {
    return (
      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
        status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}>
        {status === "approved" ? "Approved" : "Rejected"}
      </span>
    );
  }

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const result = await approveEnrollmentAction(enrollmentId);
      if (result.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      const result = await rejectEnrollmentAction(enrollmentId);
      if (result.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleApprove}
        disabled={isApproving || isRejecting}
        className="h-8 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
      >
        {isApproving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check size={14} />}
        Approve
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleReject}
        disabled={isApproving || isRejecting}
        className="h-8 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
      >
        {isRejecting ? <Loader2 className="h-3 w-3 animate-spin" /> : <X size={14} />}
        Reject
      </Button>
    </div>
  );
}
