"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Clock,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Youtube,
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "ঠিকানা",
    value: "মালালা বাজার, গৌরীপুর, বাংলাদেশ, ৩৫১৭",
    color: "bg-rose-50 text-rose-600",
    iconBg: "bg-rose-100",
  },
  {
    icon: Phone,
    label: "ফোন",
    value: "+৮৮০ ১৭০০ ০০০ ০০০",
    href: "tel:01834-018153",
    color: "bg-green-50 text-green-600",
    iconBg: "bg-green-100",
  },
  {
    icon: Mail,
    label: "ইমেইল",
    value: "azadmehedi2@gmail.com",
    href: "mailto:azadmehedi2@gmail.com",
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  }
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-50 hover:text-blue-600" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-red-50 hover:text-red-600" },
  { icon: MessageCircle, label: "WhatsApp", href: "#", color: "hover:bg-green-50 hover:text-green-600" },
]

const faqs = [
  {
    q: "কোর্সে ভর্তি হতে কী কী লাগবে?",
    a: "একটি সক্রিয় ইমেইল অ্যাকাউন্ট এবং ইন্টারনেট সংযোগ থাকলেই যেকোনো কোর্সে ভর্তি হওয়া যাবে।",
  },
  {
    q: "পেমেন্ট কীভাবে করব?",
    a: "বিকাশ, নগদ, রকেট এবং ক্রেডিট/ডেবিট কার্ডের মাধ্যমে পেমেন্ট করা যাবে।",
  },
  {
    q: "কোর্স কি মোবাইলে দেখা যাবে?",
    a: "হ্যাঁ, আমাদের প্ল্যাটফর্ম মোবাইল, ট্যাবলেট ও ডেস্কটপ সব ডিভাইসে পুরোপুরি কাজ করে।",
  },
  {
    q: "সার্টিফিকেট কি যাচাইযোগ্য?",
    a: "হ্যাঁ, প্রতিটি সার্টিফিকেটে একটি ইউনিক কোড থাকে যা অনলাইনে যাচাই করা যায়।",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire up to API
    setSubmitted(true)
  }

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
            যোগাযোগ করুন
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            আমরা সবসময়{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              আপনার পাশে
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            যেকোনো প্রশ্ন, পরামর্শ বা সমস্যায় আমাদের সাথে যোগাযোগ করুন। আমাদের সাপোর্ট টিম সর্বদা প্রস্তুত।
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-5">
        {/* Contact Info Cards */}
        <section className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => {
              const Icon = info.icon
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${info.iconBg}`}>
                    <Icon className={`h-5 w-5 ${info.color.split(" ")[1]}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{info.label}</p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-800">{info.value}</p>
                  </div>
                </div>
              )
              return info.href ? (
                <a key={info.label} href={info.href}>
                  {content}
                </a>
              ) : (
                <div key={info.label}>{content}</div>
              )
            })}
          </div>
        </section>

        {/* Form + Map */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">মেসেজ পাঠান</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900">আমাদের লিখুন</h2>
            <p className="mt-1 text-sm text-slate-500">
              ফর্মটি পূরণ করুন, আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেব।
            </p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-green-50 p-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">বার্তা পাঠানো হয়েছে!</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  আপনার বার্তা আমরা পেয়েছি। শীঘ্রই আপনার সাথে যোগাযোগ করব।
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", phone: "", subject: "", message: "" }) }}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      পূর্ণ নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="আপনার নাম লিখুন"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      ইমেইল <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      ফোন নম্বর
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+৮৮০ ১৭০০ ০০০ ০০০"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      বিষয় <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      <option value="course">কোর্স সম্পর্কিত</option>
                      <option value="payment">পেমেন্ট সম্পর্কিত</option>
                      <option value="technical">প্রযুক্তিগত সমস্যা</option>
                      <option value="certificate">সার্টিফিকেট</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    বার্তা <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98] sm:w-auto sm:px-8"
                >
                  <Send className="h-4 w-4" />
                  বার্তা পাঠান
                </button>
              </form>
            )}
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-5">
            {/* Social */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">সোশ্যাল মিডিয়া</p>
              <h3 className="mt-1 text-lg font-black text-slate-900">আমাদের ফলো করুন</h3>
              <p className="mt-2 text-sm text-slate-500">
                আমাদের সামাজিক মাধ্যমে যুক্ত থাকুন এবং আপডেট পান।
              </p>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all ${s.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">সাধারণ প্রশ্ন</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="my-16 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-center sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">আরও তথ্য</p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            আমাদের সম্পর্কে আরও জানতে চান?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-indigo-100">
            আমাদের প্রতিষ্ঠান, মিশন ও দল সম্পর্কে বিস্তারিত জানুন।
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow transition-all hover:bg-indigo-50 active:scale-95"
            >
              আমাদের সম্পর্কে →
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
            >
              কোর্স দেখুন
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
