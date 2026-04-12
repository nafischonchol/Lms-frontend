import Link from "next/link"

export function NewsletterSection() {
  return (
    <section className="my-10 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 sm:p-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">বিনামূল্যে শুরু করুন</p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            আজই যোগ দিন এবং আপনার স্বপ্নের ক্যারিয়ার গড়ুন
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-indigo-100">
            নতুন কোর্স, ডিসকাউন্ট অফার ও শিক্ষামূলক টিপস পেতে আমাদের নিউজলেটারে সাবস্ক্রাইব করুন।
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 shadow transition-all hover:bg-indigo-50 active:scale-95"
            >
              বিনামূল্যে রেজিস্ট্রেশন →
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
            >
              কোর্স ব্রাউজ করুন
            </Link>
          </div>
        </div>

        <form className="flex w-full max-w-sm flex-col gap-2 sm:flex-row" action="#" method="post">
          <label htmlFor="nl-email" className="sr-only">
            ইমেইল ঠিকানা
          </label>
          <input
            id="nl-email"
            name="email"
            type="email"
            required
            placeholder="আপনার ইমেইল লিখুন"
            className="h-12 flex-1 rounded-xl border-none bg-white/15 px-4 text-sm font-semibold text-white outline-none placeholder:text-indigo-200 ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-white/40"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-xl bg-white px-5 text-sm font-bold text-indigo-700 transition-all hover:bg-indigo-50 active:scale-95"
          >
            সাবস্ক্রাইব
          </button>
        </form>
      </div>
    </section>
  )
}
