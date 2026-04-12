import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "সাবরিনা ইসলাম",
    role: "ওয়েব ডেভেলপার",
    company: "Tech BD",
    avatar: "https://picsum.photos/seed/t1/100/100",
    rating: 5,
    text: "এই প্ল্যাটফর্মের Python কোর্স করার পর আমি চাকরি পেয়েছি। শিক্ষকরা খুবই দক্ষ এবং কন্টেন্ট অনেক সহজে বোঝানো হয়েছে।",
    course: "Python প্রোগ্রামিং",
  },
  {
    id: 2,
    name: "আরিফুল ইসলাম",
    role: "ফ্রিল্যান্সার",
    company: "Fiverr",
    avatar: "https://picsum.photos/seed/t2/100/100",
    rating: 5,
    text: "UI/UX ডিজাইন কোর্স করে আমি এখন ফ্রিল্যান্সিং করছি। অফলাইনে ডাউনলোড করে পড়ার সুবিধাটা অনেক কাজে আসে।",
    course: "UI/UX ডিজাইন",
  },
  {
    id: 3,
    name: "নুসরাত জাহান",
    role: "ডিজিটাল মার্কেটার",
    company: "StartupBD",
    avatar: "https://picsum.photos/seed/t3/100/100",
    rating: 5,
    text: "Digital Marketing কোর্সটি আমার ক্যারিয়ার বদলে দিয়েছে। লাইভ ক্লাস ও রেকর্ডেড লেকচার দুটোই ছিল দারুণ।",
    course: "Digital Marketing",
  },
  {
    id: 4,
    name: "রাকিব হাসান",
    role: "ডেটা অ্যানালিস্ট",
    company: "DataTech",
    avatar: "https://picsum.photos/seed/t4/100/100",
    rating: 4,
    text: "Data Science কোর্সের কোয়ালিটি অসাধারণ। বাংলায় এই মানের কোর্স আগে কোথাও পাইনি। সার্টিফিকেটটাও অনেক কাজে আসছে।",
    course: "Data Science",
  },
  {
    id: 5,
    name: "মিম আক্তার",
    role: "ইংরেজি শিক্ষার্থী",
    company: "ঢাকা বিশ্ববিদ্যালয়",
    avatar: "https://picsum.photos/seed/t5/100/100",
    rating: 5,
    text: "Spoken English কোর্স করে এখন সাবলীলভাবে কথা বলতে পারছি। স্যারের পড়ানোর পদ্ধতি অনেক সহজ এবং মজাদার।",
    course: "Spoken English",
  },
  {
    id: 6,
    name: "তৌহিদ আলম",
    role: "সফটওয়্যার ইঞ্জিনিয়ার",
    company: "BJIT",
    avatar: "https://picsum.photos/seed/t6/100/100",
    rating: 5,
    text: "React ও Next.js কোর্স করে এখন মাসে লক্ষ টাকার বেশি আয় করছি। ক্যারিয়ার গড়তে এই প্ল্যাটফর্ম সত্যিই দারুণ।",
    course: "React & Next.js",
  },
]

export function LmsTestimonialsSection() {
  return (
    <section className="mt-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">শিক্ষার্থীদের কথা</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">তারা যা বলছেন</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
          আমাদের হাজার হাজার শিক্ষার্থী তাদের স্বপ্ন পূরণ করেছেন। এটি তাদেরই কিছু গল্প।
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <Quote className="h-8 w-8 text-indigo-100" />

            <p className="flex-1 text-[14px] leading-relaxed text-slate-600">&ldquo;{t.text}&rdquo;</p>

            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <p className="text-[13px] font-black text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`text-xs ${s <= t.rating ? "text-amber-400" : "text-slate-200"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                  {t.course}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
