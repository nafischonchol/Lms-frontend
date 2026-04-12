import Link from "next/link"

const steps = [
  {
    step: "০১",
    title: "অ্যাকাউন্ট খুলুন",
    description: "বিনামূল্যে রেজিস্ট্রেশন করুন। শুধু নাম, ইমেইল এবং পাসওয়ার্ড দিলেই হবে।",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
  },
  {
    step: "০২",
    title: "কোর্স বেছে নিন",
    description: "আপনার পছন্দ ও লক্ষ্য অনুযায়ী শত শত কোর্স থেকে সেরাটি বেছে নিন।",
    color: "bg-purple-600",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50",
  },
  {
    step: "০৩",
    title: "শিখুন ও প্র্যাকটিস করুন",
    description: "লেকচার দেখুন, কুইজ দিন এবং প্র্যাকটিক্যাল প্রজেক্টে কাজ করুন।",
    color: "bg-indigo-600",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    bgColor: "bg-indigo-50",
  },
  {
    step: "০৪",
    title: "সার্টিফিকেট পান",
    description: "কোর্স শেষ করে সার্টিফিকেট পান এবং ক্যারিয়ারে এগিয়ে যান।",
    color: "bg-green-600",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
  },
]

export function LmsHowItWorksSection() {
  return (
    <section className="mt-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">সহজ প্রক্রিয়া</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">কীভাবে শুরু করবেন?</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
          মাত্র কয়েকটি ধাপেই শুরু করুন আপনার শিক্ষার যাত্রা।
        </p>
      </div>

      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="absolute left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] top-10 hidden h-0.5 bg-slate-100 lg:block" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center gap-4 text-center">
              {/* Step number circle */}
              <div className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 ${step.borderColor} ${step.bgColor} shadow-sm`}>
                <span className={`text-2xl font-black ${step.textColor}`}>{step.step}</span>
              </div>

              <div className={`w-full rounded-2xl border ${step.borderColor} ${step.bgColor} p-5`}>
                <h3 className="text-[15px] font-black text-slate-900">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95"
        >
          এখনই শুরু করুন — বিনামূল্যে!
        </Link>
        <p className="mt-2 text-xs text-slate-400">ক্রেডিট কার্ড ছাড়াই রেজিস্ট্রেশন করুন</p>
      </div>
    </section>
  )
}
