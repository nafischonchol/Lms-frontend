import Link from "next/link"
import { BookOpen, GraduationCap } from "lucide-react"

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Youth Revolution - Education & Research Institute (YRERI)"

export function LmsHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/10 blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-20 text-center sm:py-28 lg:px-6 lg:py-32">
        <div className="flex flex-col items-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
            স্বাগতম — {SITE_NAME}
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            যেকোনো জায়গা থেকে{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              যেকোনো সময়
            </span>{" "}
            শিখুন
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-300">
            অনলাইন ও অফলাইন কোর্সের মাধ্যমে দক্ষতা বাড়ান। বিশেষজ্ঞ শিক্ষকদের কাছ থেকে শিখুন এবং ক্যারিয়ার গড়ুন।
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-indigo-900/40 transition-all hover:bg-indigo-700 active:scale-95"
            >
              <BookOpen className="h-4 w-4" />
              কোর্স দেখুন
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
            >
              <GraduationCap className="h-4 w-4" />
              ভর্তি হোন
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
