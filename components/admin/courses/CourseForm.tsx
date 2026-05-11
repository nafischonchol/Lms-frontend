"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Edit2,
  Video,
  FileText,
  UploadCloud,
  Info,
  CheckCircle,
  Eye,
  Check,
  X,
  Send,
  Archive,
  FileEdit,
} from "lucide-react";

import { Button } from "@/components/admin/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { RichTextEditor } from "@/components/admin/ui/rich-text-editor";
import { Select } from "@/components/admin/ui/select";
import { Textarea } from "@/components/admin/ui/textarea";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  createCourseAction,
  updateCourseAction,
} from "@/lib/api/course-actions";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: "video" | "file";
};

export type Section = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
  video_url: string;
  price: string;
  discounted_price?: string;
  duration: string;
  mode: string;
  level: string;
  status: string;
  instructor_id: string;
  category_id: string;
  highlights: string[];
  curriculum: Section[];
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
  video_url: "",
  price: "",
  discounted_price: "",
  duration: "",
  mode: "online",
  level: "beginner",
  status: "draft",
  instructor_id: "",
  category_id: "",
  highlights: [""],
  curriculum: [],
};

function resolveThumbnailUrl(value?: string) {
  if (!value?.trim()) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const appBaseUrl = apiBaseUrl?.replace(/\/api\/?$/, "") ?? "";
  const normalizedPath = value.startsWith("/") ? value : `/storage/${value}`;

  return appBaseUrl ? `${appBaseUrl}${normalizedPath}` : normalizedPath;
}

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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    resolveThumbnailUrl(initialValues?.thumbnail),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // UI State for editing
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  const submitText = mode === "add" ? "Save Course" : "Update Course";

  function setField<K extends keyof CourseFormValues>(
    key: K,
    value: CourseFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreviewUrl(resolveThumbnailUrl(form.thumbnail));
      return;
    }

    const objectUrl = URL.createObjectURL(thumbnailFile);
    setThumbnailPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [thumbnailFile, form.thumbnail]);

  // Highlights management
  const handleAddHighlight = () => {
    setField("highlights", [...(form.highlights || []), ""]);
  };

  // Auto-calculate total lessons and duration
  useEffect(() => {
    let totalMinutes = 0;
    (form.curriculum || []).forEach((section) => {
      (section.lessons || []).forEach((lesson) => {
        const parts = (lesson.duration || "00:00")
          .split(":")
          .map((p) => parseInt(p) || 0);

        if (parts.length === 2) {
          // HH:MM
          totalMinutes += parts[0] * 60 + parts[1];
        } else if (parts.length === 1) {
          // MM only
          totalMinutes += parts[0];
        }
      });
    });

    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    const formatted = `${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m`;

    if (form.duration !== formatted) {
      setForm((prev) => ({ ...prev, duration: formatted }));
    }
  }, [form.curriculum, form.duration]);

  const totalLessons = (form.curriculum || []).reduce(
    (acc, s) => acc + (s.lessons?.length || 0),
    0,
  );

  const handleUpdateHighlight = (index: number, value: string) => {
    const newHighlights = [...(form.highlights || [])];
    newHighlights[index] = value;
    setField("highlights", newHighlights);
  };
  const handleRemoveHighlight = (index: number) => {
    const newHighlights = (form.highlights || []).filter((_, i) => i !== index);
    setField("highlights", newHighlights.length ? newHighlights : [""]);
  };

  // Curriculum management
  const handleAddSection = () => {
    const newSection: Section = {
      id: `new-section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: "New Section",
      lessons: [],
    };
    setField("curriculum", [...(form.curriculum || []), newSection]);
    setEditingSectionId(newSection.id);
  };

  const handleUpdateSectionTitle = (id: string, title: string) => {
    const newCurriculum = form.curriculum.map((s) =>
      s.id === id ? { ...s, title } : s,
    );
    setField("curriculum", newCurriculum);
  };

  const handleRemoveSection = (id: string) => {
    setField(
      "curriculum",
      form.curriculum.filter((s) => s.id !== id),
    );
  };

  const handleAddLesson = (sectionId: string) => {
    const newLesson: Lesson = {
      id: `new-lesson-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: "New Lesson",
      duration: "00:00",
      type: "video",
    };
    const newCurriculum = form.curriculum.map((s) =>
      s.id === sectionId ? { ...s, lessons: [...s.lessons, newLesson] } : s,
    );
    setField("curriculum", newCurriculum);
    setEditingLessonId(newLesson.id);
  };

  const handleUpdateLesson = (
    sectionId: string,
    lessonId: string,
    data: Partial<Lesson>,
  ) => {
    const newCurriculum = form.curriculum.map((s) =>
      s.id === sectionId
        ? {
            ...s,
            lessons: s.lessons.map((l) =>
              l.id === lessonId ? { ...l, ...data } : l,
            ),
          }
        : s,
    );
    setField("curriculum", newCurriculum);
  };

  const handleRemoveLesson = (sectionId: string, lessonId: string) => {
    const newCurriculum = form.curriculum.map((s) =>
      s.id === sectionId
        ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) }
        : s,
    );
    setField("curriculum", newCurriculum);
  };

  return (
    <form
      className="max-w-[1400px] mx-auto pb-20"
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
        if (form.description?.trim())
          payload.append("description", form.description);
        if (thumbnailFile) payload.append("thumbnail", thumbnailFile);
        if (form.price?.trim()) payload.append("price", form.price);
        if (form.discounted_price?.trim())
          payload.append("discounted_price", form.discounted_price);
        if (form.duration?.trim()) payload.append("duration", form.duration);
        if (form.mode) payload.append("mode", form.mode);
        if (form.level) payload.append("level", form.level);
        payload.append("status", form.status || "draft");
        if (form.instructor_id)
          payload.append("instructor_id", form.instructor_id);
        if (form.category_id) payload.append("category_id", form.category_id);
        if (form.video_url) payload.append("video_url", form.video_url);

        // Highlights handling
        (form.highlights || [])
          .filter((h) => h.trim())
          .forEach((h, i) => {
            payload.append(`highlights[${i}]`, h);
          });

        // Curriculum handling
        (form.curriculum || []).forEach((section, sIdx) => {
          payload.append(`curriculum[${sIdx}][title]`, section.title);
          (section.lessons || []).forEach((lesson, lIdx) => {
            payload.append(
              `curriculum[${sIdx}][lessons][${lIdx}][title]`,
              lesson.title,
            );
            payload.append(
              `curriculum[${sIdx}][lessons][${lIdx}][duration]`,
              lesson.duration,
            );
            payload.append(
              `curriculum[${sIdx}][lessons][${lIdx}][type]`,
              lesson.type,
            );
          });
        });

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
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Basic Information */}
          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center gap-3 text-indigo-600">
                <Info size={24} className="opacity-80" />
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-bold text-slate-600"
                  >
                    Course Title <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    placeholder="e.g. Advanced UI/UX Design Systems"
                    required
                    className="h-12 border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="category_id"
                      className="text-sm font-bold text-slate-600"
                    >
                      Category
                    </Label>
                    <SearchableSelect
                      options={categories}
                      value={form.category_id}
                      onChange={(val) => setField("category_id", val)}
                      placeholder="Design & Creative"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="level"
                      className="text-sm font-bold text-slate-600"
                    >
                      Level
                    </Label>
                    <Select
                      id="level"
                      value={form.level}
                      onChange={(e) => setField("level", e.target.value)}
                      className="h-12 border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-sm font-bold text-slate-600"
                    >
                      Price ($)
                    </Label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-indigo-600 transition-all">
                        $
                      </span>
                      <Input
                        id="price"
                        value={form.price}
                        onChange={(e) => setField("price", e.target.value)}
                        placeholder="49.99"
                        className="h-12 pl-10 border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold text-slate-800 transition-all"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="discounted_price"
                      className="text-sm font-bold text-slate-600"
                    >
                      Discounted Price ($)
                    </Label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-indigo-600 transition-all">
                        $
                      </span>
                      <Input
                        id="discounted_price"
                        value={form.discounted_price || ""}
                        onChange={(e) => setField("discounted_price", e.target.value)}
                        placeholder="39.99"
                        className="h-12 pl-10 border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold text-slate-800 transition-all"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="instructor_id"
                      className="text-sm font-bold text-slate-600"
                    >
                      Teacher / Instructor
                    </Label>
                    <SearchableSelect
                      options={teachers}
                      value={form.instructor_id}
                      onChange={(val) => setField("instructor_id", val)}
                      placeholder="— Select Teacher —"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="mode"
                      className="text-sm font-bold text-slate-600"
                    >
                      Course Mode
                    </Label>
                    <Select
                      id="mode"
                      value={form.mode}
                      onChange={(e) => setField("mode", e.target.value)}
                      className="h-12 border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    >
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="hybrid">Hybrid</option>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Course Content */}
          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-indigo-600">
                <FileText size={24} className="opacity-80" />
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Course Content
                </h2>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-bold text-slate-600"
                >
                  Detailed Description
                </Label>
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <RichTextEditor
                    content={form.description}
                    onChange={(content) => setField("description", content)}
                    placeholder="Write a comprehensive overview of your course..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Course Media */}
          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-indigo-600">
                <UploadCloud size={24} className="opacity-80" />
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Course Media
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-600">
                    Thumbnail Image
                  </Label>
                  <label
                    htmlFor="thumbnail-upload"
                    className="group relative flex flex-col items-center justify-center w-full aspect-[16/10] border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all cursor-pointer overflow-hidden"
                  >
                    {thumbnailPreviewUrl ? (
                      <Image
                        src={thumbnailPreviewUrl}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex flex-col items-center p-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm mb-3 text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                          <UploadCloud size={32} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-600">
                          Click to upload or drag & drop
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">
                          JPG, PNG, WEBP (MAX 2MB)
                        </span>
                      </div>
                    )}
                    <input
                      id="thumbnail-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setThumbnailFile(file);
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="video_url"
                      className="text-sm font-bold text-slate-600"
                    >
                      Video Introduction (Optional)
                    </Label>
                    <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-50 space-y-4">
                      <div className="flex gap-2">
                        <Input
                          id="video_url"
                          value={form.video_url}
                          onChange={(e) =>
                            setField("video_url", e.target.value)
                          }
                          placeholder="Paste YouTube or Vimeo URL"
                          className="h-11 bg-white border-slate-200 rounded-xl"
                        />
                        <Button
                          type="button"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 px-6 font-bold shrink-0"
                        >
                          Add URL
                        </Button>
                      </div>
                      <div className="flex items-start gap-2 text-slate-500">
                        <Video size={16} className="mt-0.5 shrink-0" />
                        <p className="text-[11px] font-medium leading-tight">
                          A video preview significantly increases student
                          enrollment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Course Curriculum */}
          <Card className="border-none shadow-sm bg-white rounded-2xl">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-indigo-600">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold">
                    4
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    Course Curriculum
                  </h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSection}
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl h-10 px-4 font-bold transition-all text-sm"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Section
                </Button>
              </div>

              <div className="space-y-6">
                {(form.curriculum || []).map((section, sIdx) => (
                  <div
                    key={section.id}
                    className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 transition-all hover:border-indigo-100"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 flex-1">
                        <GripVertical
                          className="text-slate-300 shrink-0"
                          size={20}
                        />
                        {editingSectionId === section.id ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={section.title}
                              autoFocus
                              onChange={(e) =>
                                handleUpdateSectionTitle(
                                  section.id,
                                  e.target.value,
                                )
                              }
                              onKeyDown={(e) =>
                                e.key === "Enter" && setEditingSectionId(null)
                              }
                              className="h-10 bg-white border-indigo-200"
                            />
                            <Button
                              type="button"
                              size="icon"
                              className="h-10 w-10 bg-indigo-600 text-white"
                              onClick={() => setEditingSectionId(null)}
                            >
                              <Check size={18} />
                            </Button>
                          </div>
                        ) : (
                          <h3 className="font-bold text-slate-800 text-lg">
                            Section {sIdx + 1}: {section.title}
                          </h3>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          onClick={() => setEditingSectionId(section.id)}
                        >
                          <Edit2 size={18} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          onClick={() => handleRemoveSection(section.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm group hover:border-indigo-200 transition-all"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              {lesson.type === "video" ? (
                                <Video size={18} />
                              ) : (
                                <FileText size={18} />
                              )}
                            </div>

                            {editingLessonId === lesson.id ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Input
                                  value={lesson.title}
                                  autoFocus
                                  onChange={(e) =>
                                    handleUpdateLesson(section.id, lesson.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    setEditingLessonId(null)
                                  }
                                  className="h-9 text-sm"
                                />
                                <Input
                                  value={lesson.duration}
                                  onChange={(e) =>
                                    handleUpdateLesson(section.id, lesson.id, {
                                      duration: e.target.value,
                                    })
                                  }
                                  placeholder="00:00"
                                  className="h-9 w-20 text-sm text-center"
                                />
                                <Button
                                  type="button"
                                  size="icon"
                                  className="h-9 w-9 bg-indigo-600 text-white shrink-0"
                                  onClick={() => setEditingLessonId(null)}
                                >
                                  <Check size={16} />
                                </Button>
                              </div>
                            ) : (
                              <span className="font-medium text-slate-700">
                                {lesson.title}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 ml-4">
                            {!editingLessonId && (
                              <>
                                <span className="text-xs text-slate-400 font-bold">
                                  {lesson.duration}
                                </span>
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-300 hover:text-indigo-600"
                                    onClick={() =>
                                      setEditingLessonId(lesson.id)
                                    }
                                  >
                                    <Edit2 size={14} />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-300 hover:text-rose-600"
                                    onClick={() =>
                                      handleRemoveLesson(section.id, lesson.id)
                                    }
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddLesson(section.id)}
                      className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-50/50 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      Add New Lesson
                    </button>
                  </div>
                ))}

                {form.curriculum.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-slate-200">
                      <Plus size={24} />
                    </div>
                    <p className="text-slate-400 font-bold text-sm">
                      Click the button above to add your first section
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Course Highlights */}
          <Card className="border-none shadow-sm bg-white rounded-2xl">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center gap-3 text-indigo-600">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold">
                  5
                </div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Course Highlights
                </h2>
              </div>

              <div className="space-y-4">
                {(form.highlights || []).map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <Input
                      value={highlight}
                      onChange={(e) =>
                        handleUpdateHighlight(index, e.target.value)
                      }
                      placeholder="e.g. Master the core concepts of Python programming"
                      className="h-12 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveHighlight(index)}
                      className="text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg shrink-0 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 mt-2 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-full border-2 border-indigo-600 flex items-center justify-center p-1 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Plus size={14} strokeWidth={3} />
                  </div>
                  Add another point
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Course Status */}
          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Course Status
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    id: "draft",
                    label: "Draft",
                    icon: FileEdit,
                    color: "text-slate-500",
                    bg: "bg-slate-50",
                    border: "border-slate-200",
                  },
                  {
                    id: "published",
                    label: "Published",
                    icon: Send,
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                    border: "border-emerald-200",
                  },
                  {
                    id: "archived",
                    label: "Archived",
                    icon: Archive,
                    color: "text-rose-600",
                    bg: "bg-rose-50",
                    border: "border-rose-200",
                  },
                ].map((status) => (
                  <button
                    key={status.id}
                    type="button"
                    onClick={() => setField("status", status.id)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                      form.status === status.id
                        ? `${status.bg} ${status.border} shadow-sm`
                        : "border-transparent hover:bg-slate-50",
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        form.status === status.id
                          ? "bg-white shadow-sm"
                          : "bg-slate-100",
                      )}
                    >
                      <status.icon
                        className={cn(
                          "w-5 h-5",
                          form.status === status.id
                            ? status.color
                            : "text-slate-400",
                        )}
                      />
                    </div>
                    <div>
                      <div
                        className={cn(
                          "font-bold text-sm",
                          form.status === status.id
                            ? "text-slate-900"
                            : "text-slate-500",
                        )}
                      >
                        {status.label}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium leading-none mt-1">
                        {status.id === "draft" && "Visible only to you"}
                        {status.id === "published" && "Publicly available"}
                        {status.id === "archived" && "Hidden from public"}
                      </div>
                    </div>
                    {form.status === status.id && (
                      <div className="ml-auto">
                        <CheckCircle className={cn("w-5 h-5", status.color)} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Summary / Action */}
          <Card className="border-none shadow-sm overflow-hidden bg-white rounded-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex gap-4">
                <div className="text-indigo-600 shrink-0 mt-0.5">
                  <Info size={18} />
                </div>
                <p className="text-[11px] text-indigo-900/60 leading-relaxed font-bold">
                  After publishing, your course will go to the review team.
                  Review can take 24-48 hours.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-[0_10px_20px_rgba(79,70,229,0.2)] text-base transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? "Processing..." : submitText}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Preview Status Widget */}
          <Card className="border-none shadow-2xl overflow-hidden bg-slate-900 rounded-3xl text-white">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Course Progress
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-sm">
                    Total Lessons
                  </span>
                  <span className="font-black text-white">
                    {totalLessons} Lessons
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-sm">
                    Total Time
                  </span>
                  <span className="font-black text-white text-right">
                    {form.duration || "00h 00m"}
                  </span>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (totalLessons / 10) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                    {totalLessons < 10
                      ? `Add at least ${10 - totalLessons} more lessons for quality.`
                      : "Course length looks good!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {submitError ? (
        <div className="mt-12 p-5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.4)] animate-pulse" />
          {submitError}
        </div>
      ) : null}
    </form>
  );
}
