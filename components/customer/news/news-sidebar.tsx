import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, TrendingUp } from "lucide-react"

const TRENDING_NEWS = [
  {
    id: 1,
    title: "বিসিএস প্রস্তুতিতে নতুন সিলেবাস প্রকাশ, যা জানা জরুরি",
    category: "কর্মজীবন",
    image: "https://picsum.photos/seed/trend1/120/80"
  },
  {
    id: 2,
    title: "মেডিক্যাল ভর্তি পরীক্ষার ফল প্রকাশ, পাসের হার রেকর্ড",
    category: "ভর্তি পরীক্ষা",
    image: "https://picsum.photos/seed/trend2/120/80"
  },
  {
    id: 3,
    title: "ঢাবিতে উচ্চশিক্ষার নতুন দ্বার উন্মোচন, আসছে ৫টি নতুন কোর্স",
    category: "শিক্ষাঙ্গন",
    image: "https://picsum.photos/seed/trend3/120/80"
  },
  {
    id: 4,
    title: "অনলাইন লার্নিং প্ল্যাটফর্মগুলোতে ফ্রি কোর্সের সুবিধা",
    category: "ই-লার্নিং",
    image: "https://picsum.photos/seed/trend4/120/80"
  },
  {
    id: 5,
    title: "শিক্ষা বিমায় সরকারের বিশেষ বরাদ্দ ঘোষণা",
    category: "জাতীয়",
    image: "https://picsum.photos/seed/trend5/120/80"
  }
]

export function NewsSidebar() {
  return (
    <aside className="space-y-8">
      {/* Trending Section */}
      <section>
        <div className="mb-5 flex items-center gap-2 border-b-2 border-[#c79a1d] pb-2">
          <TrendingUp className="h-5 w-5 text-[#c79a1d]" />
          <h2 className="text-xl font-extrabold text-slate-900">শীর্ষ সংবাদ</h2>
        </div>
        
        <div className="flex flex-col gap-4">
          {TRENDING_NEWS.map((item, index) => (
            <Link 
              key={item.id} 
              href={`/news/${item.id}`} 
              className="group flex gap-3 transition-all hover:translate-x-1"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-sm font-bold text-slate-500 transition-colors group-hover:bg-[#c79a1d] group-hover:text-white">
                {index + 1}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-bold leading-snug text-slate-900 group-hover:text-[#b38716] line-clamp-2">
                  {item.title}
                </h3>
                <span className="text-[11px] font-semibold text-[#c79a1d] uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Social Follow Section */}
      <section className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
        <h2 className="mb-4 text-lg font-extrabold text-slate-900">আমাদের সাথে যুক্ত থাকুন</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#1877F2] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
            <Facebook className="h-4 w-4" />
            Facebook
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#1DA1F2] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
            <Twitter className="h-4 w-4" />
            Twitter
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#E4405F] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
            <Instagram className="h-4 w-4" />
            Instagram
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#FF0000] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
            <Youtube className="h-4 w-4" />
            YouTube
          </button>
        </div>
      </section>

      {/* Sidebar Ad Placeholder */}
      <section className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-colors hover:border-[#c79a1d]/30">
        <div className="flex aspect-[300/450] flex-col items-center justify-center p-6 text-center">
          <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">বিজ্ঞাপন</span>
          <div className="h-24 w-24 rounded-full bg-slate-200/50 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <div className="h-12 w-12 rounded-full bg-[#c79a1d]/20" />
          </div>
          <p className="text-sm font-medium text-slate-500 italic">এখানে আপনার বিজ্ঞাপন প্রচার করুন</p>
          <button className="mt-6 rounded-full border-2 border-slate-900 px-6 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white">
            বিস্তারিত জানুন
          </button>
        </div>
      </section>
    </aside>
  )
}
