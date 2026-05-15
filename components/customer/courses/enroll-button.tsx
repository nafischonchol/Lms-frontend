"use client";

import { useState } from "react";
import { enrollInCourseAction } from "@/lib/api/enrollment-actions";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface EnrollButtonProps {
  courseId: number;
}

export function EnrollButton({ courseId }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async () => {
    setIsLoading(true);
    try {
      const result = await enrollInCourseAction(courseId);
      if (result.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

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
