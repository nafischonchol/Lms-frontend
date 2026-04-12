import { Wifi, WifiOff, Award, Clock, Users, HeadphonesIcon, BookMarked, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Wifi,
    title: "অনলাইন শিক্ষা",
    description: "যেকোনো ডিভাইস থেকে ইন্টারনেটে লাইভ ক্লাস ও রেকর্ডেড লেকচার দেখুন।",
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: WifiOff,
    title: "অফলাইন শিক্ষা",
    description: "ভিডিও ডাউনলোড করে ইন্টারনেট ছাড়াও যেকোনো সময় পড়াশোনা করুন।",
    color: "bg-green-50 text-green-600",
    iconBg: "bg-green-100",
  },
  {
    icon: Award,
    title: "সার্টিফিকেট",
    description: "কোর্স সম্পন্ন করলে যাচাইযোগ্য সার্টিফিকেট পাবেন যা চাকরিতে কাজে আসবে।",
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    icon: Clock,
    title: "নিজের গতিতে শিখুন",
    description: "নির্ধারিত সময়সীমা নেই। আপনার সুবিধামতো সময়ে এবং গতিতে শিখুন।",
    color: "bg-purple-50 text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    icon: Users,
    title: "বিশেষজ্ঞ শিক্ষক",
    description: "অভিজ্ঞ ও পেশাদার শিক্ষকদের কাছ থেকে বাস্তব জ্ঞান অর্জন করুন।",
    color: "bg-indigo-50 text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  {
    icon: HeadphonesIcon,
    title: "২৪/৭ সাপোর্ট",
    description: "যেকোনো সমস্যায় আমাদের সাপোর্ট টিম সবসময় আপনার পাশে আছে।",
    color: "bg-red-50 text-red-600",
    iconBg: "bg-red-100",
  },
  {
    icon: BookMarked,
    title: "কুইজ ও অ্যাসাইনমেন্ট",
    description: "প্রতিটি কোর্সে ইন্টারেক্টিভ কুইজ ও প্র্যাকটিক্যাল অ্যাসাইনমেন্ট রয়েছে।",
    color: "bg-teal-50 text-teal-600",
    iconBg: "bg-teal-100",
  },
  {
    icon: RefreshCw,
    title: "লাইফটাইম অ্যাক্সেস",
    description: "একবার কিনলে কোর্সের আপডেট সহ সারাজীবন অ্যাক্সেস পাবেন বিনামূল্যে।",
    color: "bg-orange-50 text-orange-600",
    iconBg: "bg-orange-100",
  },
]

export function LmsFeaturesSection() {
  return (
    <section className="mt-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">কেন আমাদের বেছে নেবেন</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          শিক্ষার সেরা অভিজ্ঞতা
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
          আমরা বিশ্বাস করি মানসম্পন্ন শিক্ষা সবার নাগালে থাকা উচিত। তাই আমরা দিই আধুনিক, সহজলভ্য এবং কার্যকর
          শিক্ষা ব্যবস্থা।
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className={`group flex flex-col gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${feature.color} ring-1 ring-current/10`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-[15px] font-black text-slate-900">{feature.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
