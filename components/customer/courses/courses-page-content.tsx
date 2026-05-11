"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, BookOpen, X } from "lucide-react";
import {
  CourseCard,
  type Course,
} from "@/components/customer/courses/course-card";

const levelFilters = ["সব", "শিক্ষানবিশ", "মধ্যবর্তী", "অ্যাডভান্সড"];
const sortOptions = [
  { label: "জনপ্রিয়তা অনুযায়ী", value: "popular" },
  { label: "নতুন কোর্স আগে", value: "newest" },
  { label: "মূল্য: কম থেকে বেশি", value: "price-asc" },
  { label: "রেটিং অনুযায়ী", value: "rating" },
];

interface CoursesPageContentProps {
  initialCourses: Course[];
  categories: string[];
}

export function CoursesPageContent({
  initialCourses,
  categories,
}: CoursesPageContentProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সব");
  const [selectedLevel, setSelectedLevel] = useState("সব");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = initialCourses
    .filter((course) => {
      const matchesSearch =
        search.trim() === "" ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "সব" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "সব" || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") {
        const toBengaliDigit = (str: string) =>
          str.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));
        const priceA = parseInt(toBengaliDigit(a.price).replace(/\D/g, ""), 10);
        const priceB = parseInt(toBengaliDigit(b.price).replace(/\D/g, ""), 10);
        return priceA - priceB;
      }
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // popular: sort by number of reviews
      return b.reviews - a.reviews;
    });

  const hasActiveFilters =
    selectedCategory !== "সব" || selectedLevel !== "সব" || search.trim() !== "";

  function clearFilters() {
    setSearch("");
    setSelectedCategory("সব");
    setSelectedLevel("সব");
  }

  return (
    <main>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] py-12 text-white">
        <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
            আমাদের কোর্সসমূহ
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            সব{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              কোর্স
            </span>{" "}
            দেখুন
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-300">
            বিশেষজ্ঞ শিক্ষকদের কাছ থেকে শিখুন। নিজের গতিতে, নিজের সুবিধামতো
            সময়ে।
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="কোর্স বা শিক্ষক খুঁজুন..."
                className="h-12 w-full rounded-2xl border-none bg-white/10 pl-12 pr-12 text-sm font-semibold text-white outline-none placeholder:text-slate-400 ring-1 ring-white/20 backdrop-blur-sm transition focus:bg-white/15 focus:ring-white/40"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 rounded-full p-1 text-slate-400 transition hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 lg:px-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-500">
              <span className="font-black text-slate-900">
                {filteredCourses.length}
              </span>{" "}
              টি কোর্স পাওয়া গেছে
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-[12px] font-bold text-red-500 transition hover:bg-red-100"
              >
                <X className="h-3 w-3" /> ফিল্টার সরান
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Level filter */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-bold ring-1 transition-all ${
                showFilters
                  ? "bg-indigo-600 text-white ring-indigo-600"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" /> ফিল্টার
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border-none bg-white px-3 py-2 text-[13px] font-bold text-slate-700 ring-1 ring-slate-200 outline-none focus:ring-indigo-300"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Level Filter Panel */}
        {showFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
              স্তর:
            </span>
            {levelFilters.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`rounded-full px-3 py-1 text-[12px] font-bold transition-all ${
                  selectedLevel === level
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        )}

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <BookOpen className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              কোনো কোর্স পাওয়া যায়নি
            </h3>
            <p className="max-w-sm text-sm text-slate-500">
              আপনার সার্চ বা ফিল্টার পরিবর্তন করুন। অন্য কিওয়ার্ড দিয়ে চেষ্টা
              করুন।
            </p>
            <button
              onClick={clearFilters}
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              সব কোর্স দেখুন
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
