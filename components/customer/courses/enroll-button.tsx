"use client";

import { useState } from "react";
import { enrollInCourseAction } from "@/lib/api/enrollment-actions";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface EnrollButtonProps {
  courseId: number;
  initialStatus: string | null;
}

export function EnrollButton({ courseId, initialStatus }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(initialStatus);

  const handleEnroll = async () => {
    if (status) return; // Prevent clicking if already has a status

    setIsLoading(true);
    try {
      const result = await enrollInCourseAction(courseId);
      if (result.ok) {
        toast.success(result.message);
        setStatus("pending");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "approved") {
    return (
      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-100 py-3.5 text-sm font-black text-emerald-700">
        আপনি এই কোর্সে ভর্তি আছেন
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-100 py-3.5 text-sm font-black text-amber-700">
        আবেদন পেন্ডিং আছে
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-100 py-3.5 text-sm font-black text-red-700">
        আবেদনটি রিজেক্ট করা হয়েছে
      </div>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-black text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          আবেদন করা হচ্ছে...
        </>
      ) : (
        "ভর্তির আবেদন করুন"
      )}
    </button>
  );
}
