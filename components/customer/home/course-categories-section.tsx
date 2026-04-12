import Link from "next/link"
import { Code2, Palette, TrendingUp, Languages, Calculator, Microscope, Music, Camera } from "lucide-react"

const categories = [
  {
    icon: Code2,
    name: "প্রোগ্রামিং ও টেক",
    color: "bg-blue-50 text-blue-600 ring-blue-100",
    iconBg: "bg-blue-100",
    count: "১২০+ কোর্স",
    href: "/courses?category=programming",
  },
  {
    icon: Palette,
    name: "ডিজাইন ও ক্রিয়েটিভ",
    color: "bg-pink-50 text-pink-600 ring-pink-100",
    iconBg: "bg-pink-100",
    count: "৮৫+ কোর্স",
    href: "/courses?category=design",
  },
  {
    icon: TrendingUp,
    name: "ব্যবসা ও মার্কেটিং",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
    iconBg: "bg-amber-100",
    count: "৯০+ কোর্স",
    href: "/courses?category=business",
  },
  {
    icon: Languages,
    name: "ভাষা শিক্ষা",
    color: "bg-green-50 text-green-600 ring-green-100",
    iconBg: "bg-green-100",
    count: "৪৫+ কোর্স",
    href: "/courses?category=language",
  },
  {
    icon: Calculator,
    name: "গণিত ও বিজ্ঞান",
    color: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    iconBg: "bg-indigo-100",
    count: "৬০+ কোর্স",
    href: "/courses?category=science",
  },
  {
    icon: Microscope,
    name: "মেডিকেল ও স্বাস্থ্য",
    color: "bg-red-50 text-red-600 ring-red-100",
    iconBg: "bg-red-100",
    count: "৩৫+ কোর্স",
    href: "/courses?category=medical",
  },
  {
    icon: Music,
    name: "সংগীত ও শিল্পকলা",
    color: "bg-purple-50 text-purple-600 ring-purple-100",
    iconBg: "bg-purple-100",
    count: "৩০+ কোর্স",
    href: "/courses?category=arts",
  },
  {
    icon: Camera,
    name: "ফটোগ্রাফি ও ভিডিও",
    color: "bg-orange-50 text-orange-600 ring-orange-100",
    iconBg: "bg-orange-100",
    count: "২৫+ কোর্স",
    href: "/courses?category=photography",
  },
]

export function CourseCategoriesSection() {
  return (
    <section className="mt-10">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">বিভাগসমূহ</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">কোর্স ক্যাটাগরি</h2>
        </div>
        <Link
          href="/courses"
          className="hidden rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-100 sm:inline-flex"
        >
          সব দেখুন →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg ${cat.color} ring-1`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.iconBg}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[12px] font-black leading-tight">{cat.name}</p>
                <p className="mt-0.5 text-[10px] font-semibold opacity-70">{cat.count}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
