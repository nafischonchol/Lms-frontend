import { Users, BookOpen, Star, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "৫০,০০০+",
    label: "সক্রিয় শিক্ষার্থী",
    description: "সারা বাংলাদেশ থেকে",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: BookOpen,
    value: "৫০০+",
    label: "মানসম্পন্ন কোর্স",
    description: "সব বিষয়ে",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Star,
    value: "৯৮%",
    label: "সন্তুষ্ট শিক্ষার্থী",
    description: "রেটিং ৪.৮/৫",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Globe,
    value: "১৫০+",
    label: "বিশেষজ্ঞ শিক্ষক",
    description: "দেশ-বিদেশ থেকে",
    color: "from-green-500 to-teal-600",
  },
]

export function LmsStatsSection() {
  return (
    <section className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-8 sm:p-12">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">আমাদের সাফল্য</p>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">সংখ্যায় আমাদের পরিচয়</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
          হাজার হাজার শিক্ষার্থীর আস্থার প্রতিষ্ঠান হিসেবে আমরা প্রতিদিন নতুন মাইলফলক স্পর্শ করছি।
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-4xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-[15px] font-bold text-slate-200">{stat.label}</p>
                <p className="mt-0.5 text-[12px] text-slate-400">{stat.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
