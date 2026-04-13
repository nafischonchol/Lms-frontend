import type { Metadata } from "next"
import { Award, BookOpen, Globe, GraduationCap, Heart, Lightbulb, Target, Users } from "lucide-react"
import Link from "next/link"

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Youth Revolution - Education & Research Institute (YRERI)"

export const metadata: Metadata = {
  title: `আমাদের সম্পর্কে | ${SITE_NAME}`,
  description:
    "Youth Revolution - Education & Research Institute (YRERI) সম্পর্কে জানুন। আমাদের লক্ষ্য, মিশন, দল এবং যাত্রার গল্প।",
}

const stats = [
  { label: "মোট শিক্ষার্থী", value: "২০,০০০+", icon: Users },
  { label: "কোর্স সমূহ", value: "৫০০+", icon: BookOpen },
  { label: "বিশেষজ্ঞ শিক্ষক", value: "১৫০+", icon: GraduationCap },
  { label: "সার্টিফিকেট প্রদান", value: "৮,০০০+", icon: Award },
]

const values = [
  {
    icon: Lightbulb,
    title: "উদ্ভাবন",
    description: "আমরা প্রতিনিয়ত নতুন ও আধুনিক শিক্ষা পদ্ধতি প্রয়োগ করি যা শিক্ষার্থীদের আগ্রহী রাখে।",
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    icon: Heart,
    title: "নিষ্ঠা",
    description: "প্রতিটি শিক্ষার্থীর সাফল্যই আমাদের অনুপ্রেরণা। আমরা শিক্ষাকে সত্যিকারের ভালোবাসি।",
    color: "bg-rose-50 text-rose-600",
    iconBg: "bg-rose-100",
  },
  {
    icon: Globe,
    title: "অন্তর্ভুক্তি",
    description: "মানসম্মত শিক্ষা সবার জন্য — যেখানে থাকুন, যেভাবে শিখতে চান, সেভাবেই শিখুন।",
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Target,
    title: "লক্ষ্যনির্ভর",
    description: "প্রতিটি কোর্স ও কারিকুলাম বাস্তব ক্যারিয়ার লক্ষ্যকে সামনে রেখে তৈরি করা হয়েছে।",
    color: "bg-indigo-50 text-indigo-600",
    iconBg: "bg-indigo-100",
  },
]

const team = [
  {
    name: "Md. Rafiqul Islam",
    role: "প্রতিষ্ঠাতা ও সিইও",
    bio: "শিক্ষা প্রযুক্তি ও উদ্যোক্তায় ১০+ বছরের অভিজ্ঞতা সম্পন্ন।",
    initials: "RI",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Nadia Akter",
    role: "প্রধান শিক্ষা কর্মকর্তা",
    bio: "কারিকুলাম ডিজাইন ও পেডাগজিতে বিশেষজ্ঞ।",
    initials: "NA",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Hasanul Banna",
    role: "প্রযুক্তি পরিচালক",
    bio: "ফুলস্ট্যাক ডেভেলপার ও শিক্ষা প্রযুক্তি উদ্ভাবক।",
    initials: "HB",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Fatema Begum",
    role: "শিক্ষার্থী সেবা প্রধান",
    bio: "শিক্ষার্থীদের সাফল্য নিশ্চিতে নিবেদিতপ্রাণ।",
    initials: "FB",
    gradient: "from-teal-500 to-emerald-600",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-20 text-center sm:py-28 lg:px-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            আমাদের সম্পর্কে
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            শিক্ষাকে{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              সহজলভ্য করার
            </span>{" "}
            যাত্রা
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            {SITE_NAME} — বাংলাদেশের একটি শীর্ষস্থানীয় অনলাইন শিক্ষা প্রতিষ্ঠান যা প্রতিটি শিক্ষার্থীর জন্য
            মানসম্মত ও সাশ্রয়ী শিক্ষা নিশ্চিত করতে কাজ করছে।
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-5">
        {/* Stats */}
        <section className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white sm:p-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Target className="h-6 w-6 text-white" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">আমাদের লক্ষ্য</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">মিশন</h2>
            <p className="mt-4 leading-relaxed text-indigo-100">
              বাংলাদেশের প্রতিটি কোণায় মানসম্মত শিক্ষা পৌঁছে দেওয়া। অনলাইন ও অফলাইন পদ্ধতিতে এমন একটি শিক্ষা
              পরিবেশ তৈরি করা যেখানে শিক্ষার্থীরা নিজের গতিতে, আগ্রহ অনুযায়ী শিখতে পারে এবং বাস্তব দক্ষতা অর্জন
              করে সফল ক্যারিয়ার গড়তে পারে।
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">আমাদের দৃষ্টিভঙ্গি</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">ভিশন</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              ২০৩০ সালের মধ্যে বাংলাদেশের শীর্ষ ডিজিটাল শিক্ষা প্রতিষ্ঠান হিসেবে নিজেদের প্রতিষ্ঠিত করা। এমন একটি
              শিক্ষা ইকোসিস্টেম গড়ে তোলা যেখানে প্রযুক্তি, উদ্ভাবন ও মানবিক মূল্যবোধের সমন্বয়ে প্রতিটি শিক্ষার্থী
              তার পূর্ণ সম্ভাবনায় পৌঁছাতে পারে।
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="mt-16">
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">শুরুর গল্প</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">আমাদের যাত্রা</h2>
                <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
                  <p>
                    ২০১৮ সালে একদল তরুণ উদ্যোক্তার স্বপ্ন থেকে জন্ম নেয় Youth Revolution। তাদের একটাই লক্ষ্য ছিল —
                    বাংলাদেশের শিক্ষার্থীরা যেন বিশ্বমানের শিক্ষা পেতে পারে, ঘরে বসেই।
                  </p>
                  <p>
                    শুরুতে মাত্র ৫টি কোর্স এবং ১০০ জন শিক্ষার্থী নিয়ে যাত্রা শুরু হয়। আজ আমাদের প্ল্যাটফর্মে
                    ৫০০টির বেশি কোর্স এবং ২০,০০০ এরও বেশি সক্রিয় শিক্ষার্থী রয়েছে।
                  </p>
                  <p>
                    আমাদের বিশ্বাস, শিক্ষাই পারে একটি জাতিকে পরিবর্তন করতে। তাই আমরা প্রতিনিয়ত কাজ করে যাচ্ছি
                    শিক্ষাকে আরও সহজলভ্য, আকর্ষণীয় ও কার্যকর করে তুলতে।
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-8 sm:p-12">
                <div className="grid w-full max-w-sm grid-cols-2 gap-4 text-center">
                  {[
                    { year: "২০১৮", event: "প্রতিষ্ঠা" },
                    { year: "২০২০", event: "১০,০০০ শিক্ষার্থী" },
                    { year: "২০২২", event: "৩০০+ কোর্স" },
                    { year: "২০২৪", event: "২০,০০০+ শিক্ষার্থী" },
                  ].map((item) => (
                    <div
                      key={item.year}
                      className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"
                    >
                      <p className="text-xl font-black text-indigo-600">{item.year}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{item.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">আমরা যা বিশ্বাস করি</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">আমাদের মূল্যবোধ</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${value.iconBg}`}>
                    <Icon className={`h-5 w-5 ${value.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">পরিচিত হোন</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">আমাদের দল</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              আমাদের অভিজ্ঞ ও নিবেদিতপ্রাণ দল প্রতিদিন কাজ করে যাচ্ছে আপনার শিক্ষার অভিজ্ঞতাকে আরও উন্নত করতে।
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${member.gradient}`}>
                  <span className="text-3xl font-black text-white">{member.initials}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-indigo-600">{member.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="my-16 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 sm:p-12">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">আমাদের সাথে যোগ দিন</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              আজই আপনার শিক্ষার যাত্রা শুরু করুন
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-indigo-100">
              হাজার হাজার শিক্ষার্থীর সাথে যুক্ত হোন এবং আপনার স্বপ্নের ক্যারিয়ার গড়ে তুলুন।
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow transition-all hover:bg-indigo-50 active:scale-95"
              >
                বিনামূল্যে রেজিস্ট্রেশন →
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                যোগাযোগ করুন
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
