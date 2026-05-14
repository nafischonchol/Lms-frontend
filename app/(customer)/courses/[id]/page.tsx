import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  BookOpen,
  Star,
  CheckCircle2,
  ChevronRight,
  PlayCircle,
  Award,
  BarChart2,
  Globe,
  Infinity,
  Smartphone,
} from "lucide-react";
import { getPublicCourseById, getPublicCoursesList } from "@/lib/api/courses";
import { getStudent } from "@/lib/api/student-auth";
import { mapApiToCourse } from "@/lib/course-mapper";
import { type Course } from "@/components/customer/courses/course-card";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  try {
    const { items } = await getPublicCoursesList({ per_page: 20 });
    return items.map((course) => ({ id: String(course.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await getPublicCourseById(Number(id));
  if (!course) return {};
  return {
    title: `${course.title} | YRERI`,
    description: course.description || `Learn ${course.title} from YRERI.`,
  };
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sizes[size]} ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} ${size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3 w-3"}`}
        />
      ))}
    </div>
  );
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const apiCourse = await getPublicCourseById(Number(id));
  const student = await getStudent();

  if (!apiCourse) notFound();

  const course = mapApiToCourse(apiCourse);

  // Use real data from API with fallbacks to mock data if empty
  const curriculum = (apiCourse.curriculum || []).map((s) => ({
    section: s.title,
    lessons: s.lessons,
  }));

  const whatYouLearn = apiCourse.highlights || [
    "বাস্তব প্রজেক্টের মাধ্যমে হাতে-কলমে শেখা",
    "ক্যারিয়ার গাইডেন্স এবং সাপোর্ট",
    "ইন্ডাস্ট্রি স্ট্যান্ডার্ড স্কিল ডেভেলপমেন্ট",
  ];

  const instructorBio =
    apiCourse.instructor?.name === "তানভীর আহমেদ"
      ? "তানভীর আহমেদ একজন অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ার এবং মেন্টর। তিনি গত ৮ বছর ধরে দেশি-বিদেশি বিভিন্ন টেক কোম্পানিতে কাজ করছেন এবং হাজার হাজার শিক্ষার্থীকে সফলভাবে প্রশিক্ষণ দিয়েছেন।"
      : "আমাদের বিশেষজ্ঞ মেন্টর আপনাকে প্রতিটি পদক্ষেপে সাহায্য করবেন যাতে আপনি আপনার লক্ষ্যে পৌঁছাতে পারেন।";

  // Calculate total lessons and duration from curriculum
  const totalLessons = curriculum.reduce((acc, s) => acc + s.lessons.length, 0);

  // Simple duration sum (assuming HH:MM or MM:SS format)
  const totalDurationMinutes = (apiCourse.curriculum || []).reduce((acc, section) => {
    return (
      acc +
      section.lessons.reduce((lAcc, lesson) => {
        if (!lesson.duration) return lAcc;
        const parts = lesson.duration.split(":").map(Number);
        if (parts.length === 2) {
          return lAcc + parts[0] * 60 + parts[1];
        } else if (parts.length === 1) {
          return lAcc + parts[0];
        }
        return lAcc;
      }, 0)
    );
  }, 0);

  const formattedDuration =
    totalDurationMinutes > 0
      ? totalDurationMinutes >= 60
        ? `${Math.floor(totalDurationMinutes / 60)} ঘণ্টা ${totalDurationMinutes % 60} মিনিট`
        : `${totalDurationMinutes} মিনিট`
      : course.duration;

  // Override values for display
  course.lessons = totalLessons;
  if (course.duration === "N/A" || !apiCourse.duration || apiCourse.duration === "00h 00m") {
    course.duration = formattedDuration;
  }

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-3 lg:px-6">
          <ol className="flex items-center gap-1 text-[12px] font-semibold text-slate-500">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                হোম
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li>
              <Link href="/courses" className="hover:text-indigo-600 transition-colors">
                কোর্সসমূহ
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li className="line-clamp-1 text-slate-900">{course.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Left */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${course.categoryColor}`}>
                  {course.category}
                </span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${course.levelColor}`}>
                  {course.level}
                </span>
                {course.isBestseller && (
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-black uppercase text-white">
                    বেস্টসেলার
                  </span>
                )}
                {course.isNew && (
                  <span className="rounded-full bg-green-500 px-3 py-1 text-[11px] font-black uppercase text-white">
                    নতুন
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-black leading-snug tracking-tight sm:text-3xl lg:text-4xl">
                {course.title}
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
                {apiCourse.description ||
                  "এই কোর্সে আপনি হাতে-কলমে শিখবেন। বিশেষজ্ঞ শিক্ষকের গাইডেন্সে বাস্তব প্রজেক্ট করুন এবং আপনার ক্যারিয়ার এগিয়ে নিন।"}
              </p>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-amber-400">{course.rating}</span>
                  <StarRating rating={course.rating} size="md" />
                  <span className="text-[12px] text-slate-400">({course.reviews.toLocaleString()} রিভিউ)</span>
                </div>
                <span className="flex items-center gap-1 text-[12px] text-slate-400">
                  <Users className="h-3.5 w-3.5" />
                  {course.students} শিক্ষার্থী
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <Image
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
                />
                <div>
                  <p className="text-[11px] text-slate-400">শিক্ষক</p>
                  <p className="text-sm font-bold text-indigo-300">{course.instructor}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[12px] text-slate-300">
                  <Clock className="h-4 w-4 text-indigo-400" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-300">
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                  {course.lessons} লেসন
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-300">
                  <BarChart2 className="h-4 w-4 text-indigo-400" />
                  {course.level}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-300">
                  <Globe className="h-4 w-4 text-indigo-400" />
                  বাংলা ভাষায়
                </div>
              </div>
            </div>

            {/* Right — Enrollment Card (desktop) */}
            <div className="hidden lg:block">
              <EnrollmentCard course={course} isLoggedIn={!!student} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Enrollment Card */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-4 lg:hidden lg:px-6">
        <EnrollmentCard course={course} isLoggedIn={!!student} mobile />
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div className="flex flex-col gap-10">
            {/* What you'll learn */}
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-black text-slate-900">আপনি যা শিখবেন</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Curriculum */}
            {curriculum.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-black text-slate-900">কোর্স কারিকুলাম</h2>
                <p className="mb-4 text-[13px] text-slate-500">
                  {curriculum.length} টি সেকশন • {totalLessons} টি লেসন • {course.duration} মোট সময়
                </p>
                <div className="flex flex-col gap-3">
                  {curriculum.map((section, si) => (
                    <details
                      key={si}
                      className="group rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300"
                      open={si === 0}
                    >
                      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 p-4 hover:bg-slate-50 transition-colors rounded-t-2xl group-open:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[12px] font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            {si + 1}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{section.section}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-semibold text-slate-400">
                            {section.lessons.length} লেসন
                          </span>
                          <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-90" />
                        </div>
                      </summary>
                      <ul className="divide-y divide-slate-50 border-t border-slate-100 px-4 pb-2">
                        {section.lessons.map((lesson, li) => (
                          <li key={li} className="flex items-center justify-between gap-3 py-3.5 group/lesson">
                            <div className="flex items-center gap-3">
                              {lesson.type === "video" ? (
                                <PlayCircle className="h-4 w-4 flex-shrink-0 text-indigo-400 group-hover/lesson:text-indigo-600" />
                              ) : (
                                <BookOpen className="h-4 w-4 flex-shrink-0 text-amber-400 group-hover/lesson:text-amber-600" />
                              )}
                              <span className="text-[13px] font-medium text-slate-700 group-hover/lesson:text-slate-900 transition-colors">
                                {lesson.title}
                              </span>
                            </div>
                            {lesson.duration && (
                              <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                {lesson.duration}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Instructor */}
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-black text-slate-900">শিক্ষক পরিচিতি</h2>
              <div className="flex items-start gap-4">
                <Image
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  width={72}
                  height={72}
                  className="h-18 w-18 flex-shrink-0 rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-black text-slate-900">{course.instructor}</h3>
                  <p className="text-[12px] font-semibold text-indigo-600">{course.category} বিশেষজ্ঞ</p>
                  <div className="flex flex-wrap gap-3 pt-1 text-[12px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {course.rating} রেটিং
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.students} শিক্ষার্থী
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessons} লেসন
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{instructorBio}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Enrollment Card (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <EnrollmentCard course={course} isLoggedIn={!!student} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function EnrollmentCard({ course, mobile, isLoggedIn }: { course: Course; mobile?: boolean; isLoggedIn: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl ${mobile ? "w-full" : ""}`}
    >
      {/* Course Thumbnail */}
      <div className="relative">
        <Image
          src={course.image}
          alt={course.title}
          width={600}
          height={340}
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <PlayCircle className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-white">
          প্রিভিউ দেখুন
        </p>
      </div>

      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-slate-900">{course.price}</span>
          {course.originalPrice && (
            <span className="text-base font-semibold text-slate-400 line-through">{course.originalPrice}</span>
          )}
          {course.originalPrice && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-black text-green-700">
              ছাড়
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 flex flex-col gap-3">
          {isLoggedIn ? (
            <button className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-black text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]">
              এখনই ভর্তি হোন
            </button>
          ) : (
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3.5 text-sm font-black text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              এখনই ভর্তি হোন
            </Link>
          )}
        </div>

        <p className="mt-3 text-center text-[11px] text-slate-400">৩০ দিনের মানি-ব্যাক গ্যারান্টি</p>

        {/* Includes */}
        <div className="mt-5 flex flex-col gap-2.5 border-t border-slate-100 pt-4">
          <p className="text-[12px] font-black uppercase tracking-wider text-slate-500">এই কোর্সে আছে</p>
          {[
            { icon: <Clock className="h-4 w-4" />, text: `${course.duration} অন-ডিমান্ড ভিডিও` },
            { icon: <BookOpen className="h-4 w-4" />, text: `${course.lessons} টি লেসন` },
            { icon: <Infinity className="h-4 w-4" />, text: "লাইফটাইম অ্যাক্সেস" },
            { icon: <Smartphone className="h-4 w-4" />, text: "মোবাইল ও ডেস্কটপে দেখুন" },
            { icon: <Award className="h-4 w-4" />, text: "সমাপ্তি সার্টিফিকেট" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-slate-700">
              <span className="text-indigo-500">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
