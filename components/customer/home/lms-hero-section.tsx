import Link from "next/link"
import Image from "next/image"
import { Search, Play, Users, BookOpen, Award } from "lucide-react"

const heroStats = [
  { icon: Users, value: "৫০,০০০+", label: "শিক্ষার্থী" },
  { icon: BookOpen, value: "৫০০+", label: "কোর্স" },
  { icon: Award, value: "২০০+", label: "সার্টিফিকেট" },
]

const popularSearches = ["Web Development", "Python", "Data Science", "Graphic Design", "English Speaking"]

export function LmsHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/10 blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-14 sm:py-20 lg:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text & Search */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
              বাংলাদেশের সেরা অনলাইন শিক্ষা প্ল্যাটফর্ম
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              যেকোনো জায়গা থেকে{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                যেকোনো সময়
              </span>{" "}
              শিখুন
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-slate-300">
              অনলাইন ও অফলাইন কোর্সের মাধ্যমে দক্ষতা বাড়ান। বিশেষজ্ঞ শিক্ষকদের কাছ থেকে শিখুন এবং ক্যারিয়ার
              গড়ুন।
            </p>

            {/* Search Bar */}
            <div className="relative flex max-w-xl items-center overflow-hidden rounded-2xl bg-white shadow-2xl shadow-indigo-900/40">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="কোর্স খুঁজুন... যেমন: Web Development, Python"
                className="flex-1 py-4 pl-12 pr-4 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
              />
              <Link
                href="/courses"
                className="m-2 shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 active:scale-95"
              >
                খুঁজুন
              </Link>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-400">জনপ্রিয়:</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/courses?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-300 transition-all hover:border-indigo-400 hover:text-indigo-300"
                >
                  {term}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-indigo-900/40 transition-all hover:bg-indigo-700 hover:shadow-indigo-900/60 active:scale-95"
              >
                <BookOpen className="h-4 w-4" />
                কোর্স দেখুন
              </Link>
              <Link
                href="/courses/live"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-[15px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                <Play className="h-4 w-4 fill-current" />
                লাইভ ক্লাস
              </Link>
            </div>
          </div>

          {/* Right: Hero Image / Illustration */}
          <div className="relative hidden lg:flex lg:justify-center">
            <div className="relative h-[420px] w-[420px]">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-600/30 blur-2xl" />
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
                <Image
                  src="https://picsum.photos/seed/lms-hero/700/600"
                  alt="LMS Learning"
                  fill
                  priority
                  className="object-cover opacity-80"
                />
                {/* Floating card: lesson progress */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                    <Play className="h-4 w-4 fill-indigo-600 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500">চলছে</p>
                    <p className="text-[13px] font-black text-slate-900">Python Basics</p>
                    <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-3/5 rounded-full bg-indigo-500" />
                    </div>
                  </div>
                </div>
                {/* Floating card: rating */}
                <div className="absolute right-6 top-6 flex flex-col gap-0.5 rounded-2xl bg-white px-4 py-3 shadow-xl">
                  <p className="text-[11px] font-bold text-slate-500">শিক্ষার্থী রেটিং</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-sm text-amber-400">★</span>
                    ))}
                    <span className="ml-1 text-[13px] font-black text-slate-900">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-10 sm:gap-6">
          {heroStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 ring-1 ring-indigo-500/30">
                <Icon className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
