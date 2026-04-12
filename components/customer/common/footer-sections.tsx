import Link from "next/link"

export function FinalCtaSection() {
  return null
}

export function SiteFooter() {
  const courseCategories = [
    { label: "প্রোগ্রামিং ও টেক", href: "/courses?category=programming" },
    { label: "ওয়েব ডেভেলপমেন্ট", href: "/courses?category=web" },
    { label: "ডিজাইন ও ক্রিয়েটিভ", href: "/courses?category=design" },
    { label: "ব্যবসা ও মার্কেটিং", href: "/courses?category=business" },
    { label: "ডেটা সায়েন্স", href: "/courses?category=data-science" },
    { label: "ভাষা শিক্ষা", href: "/courses?category=language" },
    { label: "মেডিকেল ও স্বাস্থ্য", href: "/courses?category=medical" },
    { label: "ফটোগ্রাফি ও ভিডিও", href: "/courses?category=photography" },
    { label: "সংগীত ও শিল্পকলা", href: "/courses?category=arts" },
    { label: "গণিত ও বিজ্ঞান", href: "/courses?category=science" },
    { label: "লাইভ ক্লাস", href: "/courses/live" },
    { label: "বিনামূল্যে কোর্স", href: "/courses?price=free" },
  ]

  return (
    <footer className="bg-[#0f172a] text-slate-300">
      {/* Main footer grid */}
      <div className="mx-auto w-full max-w-screen-2xl px-3 py-10 sm:px-4 lg:px-5">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <p className="text-xl font-black text-white">শিক্ষাপথ LMS</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-indigo-400">Learning Management System</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              বাংলাদেশের সেরা অনলাইন শিক্ষা প্ল্যাটফর্ম। বিশেষজ্ঞ শিক্ষকদের কাছ থেকে অনলাইন ও অফলাইনে শিখুন এবং ক্যারিয়ার গড়ুন।
            </p>
            <div className="mt-4 flex gap-3">
              {["f", "▶", "𝕏", "in"].map((icon) => (
                <span
                  key={icon}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-white/10 text-sm text-white transition-colors hover:bg-indigo-600"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Course Categories */}
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white">কোর্স ক্যাটাগরি</p>
            <ul className="space-y-1.5">
              {courseCategories.slice(0, 6).map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm text-slate-400 transition-colors hover:text-indigo-400">
                    › {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white">আরও কোর্স</p>
            <ul className="space-y-1.5">
              {courseCategories.slice(6).map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm text-slate-400 transition-colors hover:text-indigo-400">
                    › {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white">প্রতিষ্ঠান</p>
            <ul className="space-y-1.5">
              {[
                { label: "আমাদের সম্পর্কে", href: "/about" },
                { label: "শিক্ষক হোন", href: "/become-instructor" },
                { label: "শিক্ষার্থী লগইন", href: "/login" },
                { label: "রেজিস্ট্রেশন", href: "/register" },
                { label: "গোপনীয়তা নীতি", href: "/privacy" },
                { label: "যোগাযোগ", href: "/contact-us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-indigo-400">
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 px-3 py-4 text-xs text-slate-500 sm:flex-row sm:px-4 lg:px-5">
          <p>© ২০২৬ শিক্ষাপথ LMS। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>শিক্ষার্থী সাপোর্ট: support@shikkhapath.com | ২৪/৭ অনলাইন</p>
        </div>
      </div>
    </footer>
  )
}
