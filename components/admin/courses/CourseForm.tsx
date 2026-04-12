"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { RichTextEditor } from "@/components/admin/ui/rich-text-editor";
import { Select } from "@/components/admin/ui/select";
import { createCourseAction, updateCourseAction } from "@/lib/api/course-actions";

export type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
  price: string;
  duration: string;
  mode: string;
  level: string;
  status: string;
  is_active: "1" | "0";
  instructor_id: string;
  category_id: string;
};

type TeacherOption = { id: number; name: string };
type CategoryOption = { id: number; name: string };

type CourseFormProps = {
  mode: "add" | "edit";
  courseId?: string;
  initialValues?: Partial<CourseFormValues>;
  teachers: TeacherOption[];
  categories: CategoryOption[];
};

const defaultValues: CourseFormValues = {
  title: "",
  description: "",
  thumbnail: "",
  price: "",
  duration: "",
  mode: "",
  level: "",
  status: "draft",
  is_active: "1",
  instructor_id: "",
  category_id: "",
};

export function CourseForm({
  mode,
  courseId,
  initialValues,
  teachers,
  categories,
}: CourseFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<CourseFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submitText = mode === "add" ? "Save Course" : "Update Course";

  function setField<K extends keyof CourseFormValues>(key: K, value: CourseFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();

        if (mode === "edit" && !courseId) {
          setSubmitError("Course ID is missing for update request.");
          return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const payload = new FormData();
        payload.append("title", form.title);
        if (form.description.trim()) payload.append("description", form.description);
        if (form.thumbnail.trim()) payload.append("thumbnail", form.thumbnail);
        if (form.price.trim()) payload.append("price", form.price);
        if (form.duration.trim()) payload.append("duration", form.duration);
        if (form.mode) payload.append("mode", form.mode);
        if (form.level) payload.append("level", form.level);
        payload.append("status", form.status || "draft");
        payload.append("is_active", form.is_active);
        if (form.instructor_id) payload.append("instructor_id", form.instructor_id);
        if (form.category_id) payload.append("category_id", form.category_id);

        try {
          const result =
            mode === "add"
              ? await createCourseAction(payload)
              : await updateCourseAction(courseId!, payload);

          if (!result.ok) {
            setSubmitError(result.message || "Something went wrong.");
            return;
          }

          router.push("/admin/courses/list");
        } catch {
          setSubmitError("An unexpected error occurred.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>{mode === "add" ? "Add Course" : "Edit Course"}</CardTitle>
            <Link href="/admin/courses/list">
              <Button type="button" variant="secondary" size="sm">
                <ArrowLeft size={14} />
                Back to List
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title">
              Title <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Course title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              value={form.description}
              onChange={(val) => setField("description", val)}
              placeholder="Course description"
            />
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-1.5">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              value={form.thumbnail}
              onChange={(e) => setField("thumbnail", e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Price */}
            <div className="space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
                placeholder="e.g. 4 weeks"
              />
            </div>

            {/* Mode */}
            <div className="space-y-1.5">
              <Label htmlFor="mode">Mode</Label>
              <Select
                id="mode"
                value={form.mode}
                onChange={(e) => setField("mode", e.target.value)}
              >
                <option value="">— Select Mode —</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </Select>
            </div>

            {/* Level */}
            <div className="space-y-1.5">
              <Label htmlFor="level">Level</Label>
              <Select
                id="level"
                value={form.level}
                onChange={(e) => setField("level", e.target.value)}
              >
                <option value="">— Select Level —</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={form.status}
                onChange={(e) => setField("status", e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </Select>
            </div>

            {/* Active */}
            <div className="space-y-1.5">
              <Label htmlFor="is_active">Active</Label>
              <Select
                id="is_active"
                value={form.is_active}
                onChange={(e) => setField("is_active", e.target.value as "1" | "0")}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Select>
            </div>

            {/* Instructor */}
            <div className="space-y-1.5">
              <Label htmlFor="instructor_id">Instructor</Label>
              <Select
                id="instructor_id"
                value={form.instructor_id}
                onChange={(e) => setField("instructor_id", e.target.value)}
              >
                <option value="">— Select Instructor —</option>
                {teachers.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category_id">Category</Label>
              <Select
                id="category_id"
                value={form.category_id}
                onChange={(e) => setField("category_id", e.target.value)}
              >
                <option value="">— Select Category —</option>
                {categories.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {submitError ? (
            <p className="rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-600">
              {submitError}
            </p>
          ) : null}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isSubmitting}>
              <Save size={16} />
              {isSubmitting ? "Saving..." : submitText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
