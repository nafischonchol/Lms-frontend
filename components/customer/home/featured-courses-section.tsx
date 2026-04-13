import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CourseCard } from "@/components/customer/courses/course-card"
import { allCourses } from "@/components/customer/courses/course-data"

const featuredCourses = allCourses.slice(0, 6)

export function FeaturedCoursesSection() {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">সেরা কোর্সসমূহ</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">জনপ্রিয় কোর্স</h2>
        </div>
        <Link
          href="/courses"
          className="hidden items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-100 sm:inline-flex"
        >
          সব কোর্স <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/courses"
          className="inline-flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-bold text-indigo-600"
        >
          আরও কোর্স দেখুন <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
