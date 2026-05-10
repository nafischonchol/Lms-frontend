"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Select } from "@/components/admin/ui/select";
import { createTeacherAction, updateTeacherAction } from "@/lib/api/teacher-actions";

export type TeacherFormValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_active: "1" | "0";
};

type TeacherFormProps = {
  mode: "add" | "edit";
  teacherId?: string;
  initialValues?: Partial<TeacherFormValues>;
  showDetailsHeader?: boolean;
  headerTitle?: string;
  headerAction?: React.ReactNode;
};

const defaultValues: TeacherFormValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
  is_active: "1",
};

export function TeacherForm({
  mode,
  teacherId,
  initialValues,
  showDetailsHeader = true,
  headerTitle,
  headerAction,
}: TeacherFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<TeacherFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submitText = mode === "add" ? "Save Teacher" : "Update Teacher";
  const shouldShowHeader = Boolean(headerTitle || headerAction || showDetailsHeader);

  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();

        if (mode === "edit" && !teacherId) {
          setSubmitError("Teacher ID is missing for update request.");
          return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const payload = new FormData();
        payload.append("name", form.name);
        payload.append("phone", form.phone);
        payload.append("email", form.email);

        if (mode === "add") {
          payload.append("is_active", form.is_active);
        }

        if (mode === "add" || form.password.trim()) {
          payload.append("password", form.password);
          payload.append("password_confirmation", form.password_confirmation);
        }

        try {
          const result =
            mode === "add"
              ? await createTeacherAction(payload)
              : await updateTeacherAction(teacherId as string, payload);

          if (!result.ok) {
            setSubmitError(result.message || "Request failed. Please try again.");
            return;
          }

          router.push("/admin/teachers/list");
          router.refresh();
        } catch {
          setSubmitError("Network error. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <Card>
        {shouldShowHeader ? (
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              {headerTitle ? (
                <h2 className="text-2xl font-bold text-slate-800">{headerTitle}</h2>
              ) : showDetailsHeader ? (
                <CardTitle>Teacher Details</CardTitle>
              ) : null}
            </div>

            {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
          </CardHeader>
        ) : null}
        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                placeholder={mode === "edit" ? "Keep blank to leave unchanged" : "Enter password"}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                required={mode === "add"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={form.password_confirmation}
                placeholder={mode === "edit" ? "Fill when changing password" : "Retype password"}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password_confirmation: event.target.value }))
                }
                required={mode === "add" || form.password.trim().length > 0}
              />
            </div>
          </div>

          {mode === "add" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="is_active">Status</Label>
                <Select
                  id="is_active"
                  value={form.is_active}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, is_active: event.target.value as TeacherFormValues["is_active"] }))
                  }
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Select>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {submitError ? <p className="text-sm font-medium text-rose-600">{submitError}</p> : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/teachers/list">
          <Button type="button" variant="secondary">
            <ArrowLeft size={16} />
            Back to List
          </Button>
        </Link>

        <Button type="submit" disabled={isSubmitting}>
          <Save size={16} />
          {isSubmitting ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
}
