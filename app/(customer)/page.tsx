import type { Metadata } from "next"

import { LmsHeroSection } from "@/components/customer/home/lms-hero-section"
import { LmsFeaturesSection } from "@/components/customer/home/lms-features-section"
import { LmsHowItWorksSection } from "@/components/customer/home/lms-how-it-works-section"
import { NewsletterSection } from "@/components/customer/home/newsletter-section"

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Youth Revolution - Education & Research Institute (YRERI)"
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://yreri.org"

export const metadata: Metadata = {
  title: `${SITE_NAME} | বাংলাদেশের সেরা অনলাইন শিক্ষা প্ল্যাটফর্ম`,
  description:
    `${SITE_NAME} — অনলাইন ও অফলাইনে শিখুন। Web Development, Python, Design, English সহ ৫০০+ কোর্স। বিশেষজ্ঞ শিক্ষকদের কাছ থেকে সার্টিফিকেট কোর্স করুন।`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Youth Revolution - Education & Research Institute`,
    description: "বাংলাদেশের সেরা অনলাইন শিক্ষা প্ল্যাটফর্ম। অনলাইন ও অফলাইন কোর্স, লাইভ ক্লাস এবং সার্টিফিকেট।",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Online Learning Management System — শিক্ষা, দক্ষতা উন্নয়ন ও ক্যারিয়ার গড়ার প্ল্যাটফর্ম।",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LmsHeroSection />

      <main className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-5">
        <LmsFeaturesSection />
        <LmsHowItWorksSection />
        <NewsletterSection />
      </main>
    </>
  )
}
