"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, UserX } from "lucide-react";

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Select } from "@/components/admin/ui/select";
import {
  enrollStudentToCourseAction,
  unenrollStudentFromCourseAction,
} from "@/lib/api/course-actions";
import type { CourseEnrollmentApiModel } from "@/lib/api/courses";

type StudentOption = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
};

type CourseEnrollmentManagerProps = {
  courseId: number;
  students: StudentOption[];
  enrollments: CourseEnrollmentApiModel[];
};

function formatFee(value: string | null) {
  if (!value) return "Free";
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(value: string | null) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString();
}

export function CourseEnrollmentManager({
  courseId,
  students,
  enrollments,
}: CourseEnrollmentManagerProps) {
  const router = useRouter();
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [fee, setFee] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [removingStudentId, setRemovingStudentId] = useState<number | null>(null);

  const enrolledStudentIds = useMemo(
    () => new Set(enrollments.map((enrollment) => enrollment.student_id)),
    [enrollments],
  );

  const availableStudents = useMemo(
    () => students.filter((student) => student.is_active && !enrolledStudentIds.has(student.id)),
    [enrolledStudentIds, students],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Enrollment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto] lg:items-end">
          <div className="space-y-1.5">
            <Label htmlFor="student_id">Student</Label>
            <Select
              id="student_id"
              value={selectedStudentId}
              onChange={(event) => setSelectedStudentId(event.target.value)}
              disabled={isPending || availableStudents.length === 0}
            >
              <option value="">Select student</option>
              {availableStudents.map((student) => (
                <option key={student.id} value={String(student.id)}>
                  {student.name} ({student.email})
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fee">Fee</Label>
            <Input
              id="fee"
              type="number"
              min="0"
              step="0.01"
              value={fee}
              onChange={(event) => setFee(event.target.value)}
              placeholder="Optional"
              disabled={isPending}
            />
          </div>

          <Button
            type="button"
            disabled={isPending || !selectedStudentId}
            onClick={() => {
              setMessage("");
              setErrorMessage("");

              startTransition(async () => {
                const payload = new FormData();
                payload.append("course_id", String(courseId));
                payload.append("student_id", selectedStudentId);
                if (fee.trim()) {
                  payload.append("fee", fee);
                }

                const result = await enrollStudentToCourseAction(payload);
                if (!result.ok) {
                  setErrorMessage(result.message || "Failed to enroll student.");
                  return;
                }

                setSelectedStudentId("");
                setFee("");
                setMessage(result.message);
                router.refresh();
              });
            }}
          >
            <UserPlus size={16} />
            {isPending ? "Enrolling..." : "Enroll Student"}
          </Button>
        </div>

        {errorMessage ? (
          <p className="rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-600">{errorMessage}</p>
        ) : null}

        {message ? (
          <p className="rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-700">{message}</p>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Fee</th>
                <th className="px-4 py-3 font-semibold">Enrolled</th>
                <th className="px-4 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {enrollment.student?.name ?? "Unknown student"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{enrollment.student?.email ?? "-"}</td>
                  <td className="px-4 py-3 text-slate-600">{formatFee(enrollment.fee)}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(enrollment.enrolled_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      disabled={isPending || removingStudentId === enrollment.student_id}
                      onClick={() => {
                        setMessage("");
                        setErrorMessage("");
                        setRemovingStudentId(enrollment.student_id);

                        startTransition(async () => {
                          const result = await unenrollStudentFromCourseAction(
                            String(enrollment.student_id),
                            String(courseId),
                          );

                          setRemovingStudentId(null);

                          if (!result.ok) {
                            setErrorMessage(result.message || "Failed to unenroll student.");
                            return;
                          }

                          setMessage(result.message);
                          router.refresh();
                        });
                      }}
                    >
                      <UserX size={14} />
                      {removingStudentId === enrollment.student_id ? "Removing..." : "Unenroll"}
                    </Button>
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No students enrolled in this course yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
