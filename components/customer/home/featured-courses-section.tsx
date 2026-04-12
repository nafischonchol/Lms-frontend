import Link from "next/link"
import Image from "next/image"
import { Clock, Users, BookOpen, ChevronRight } from "lucide-react"

type Course = {
  id: string
  image: string
  category: string
  categoryColor: string
  title: string
  instructor: string
  instructorAvatar: string
  rating: number
  reviews: number
  students: string
  duration: string
  lessons: number
  level: "শিক্ষার্থী" | "মধ্যবর্তী" | "অ্যাডভান্সড"
  levelColor: string
  price: string
  originalPrice?: string
  isFree?: boolean
  isNew?: boolean
  isBestseller?: boolean
}

const featuredCourses: Course[] = [
  {
    id: "1",
    image: "https://picsum.photos/seed/course1/600/400",
    category: "প্রোগ্রামিং",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "Python দিয়ে প্রোগ্রামিং শিখুন — শূন্য থেকে বিশেষজ্ঞ",
    instructor: "তানভীর আহমেদ",
    instructorAvatar: "https://picsum.photos/seed/ins1/100/100",
    rating: 4.8,
    reviews: 1240,
    students: "১৫,৮০০+",
    duration: "৩২ ঘণ্টা",
    lessons: 96,
    level: "শিক্ষার্থী",
    levelColor: "bg-green-100 text-green-700",
    price: "৳ ৯৯৯",
    originalPrice: "৳ ১,৯৯৯",
    isBestseller: true,
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/course2/600/400",
    category: "ওয়েব ডেভেলপমেন্ট",
    categoryColor: "bg-indigo-100 text-indigo-700",
    title: "React ও Next.js দিয়ে ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট",
    instructor: "সানজিদা ইসলাম",
    instructorAvatar: "https://picsum.photos/seed/ins2/100/100",
    rating: 4.9,
    reviews: 876,
    students: "৯,৩০০+",
    duration: "৪৮ ঘণ্টা",
    lessons: 140,
    level: "মধ্যবর্তী",
    levelColor: "bg-amber-100 text-amber-700",
    price: "৳ ১,৪৯৯",
    originalPrice: "৳ ২,৯৯৯",
    isNew: true,
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/course3/600/400",
    category: "ডিজাইন",
    categoryColor: "bg-pink-100 text-pink-700",
    title: "Figma দিয়ে UI/UX ডিজাইন — প্র্যাকটিক্যাল কোর্স",
    instructor: "রাহেলা খানম",
    instructorAvatar: "https://picsum.photos/seed/ins3/100/100",
    rating: 4.7,
    reviews: 654,
    students: "৬,২০০+",
    duration: "২৪ ঘণ্টা",
    lessons: 72,
    level: "শিক্ষার্থী",
    levelColor: "bg-green-100 text-green-700",
    price: "৳ ৭৯৯",
    originalPrice: "৳ ১,৪৯৯",
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/course4/600/400",
    category: "ডেটা সায়েন্স",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "Data Science ও Machine Learning — বাংলায় সম্পূর্ণ গাইড",
    instructor: "রিফাত হাসান",
    instructorAvatar: "https://picsum.photos/seed/ins4/100/100",
    rating: 4.9,
    reviews: 432,
    students: "৪,৫০০+",
    duration: "৬০ ঘণ্টা",
    lessons: 180,
    level: "মধ্যবর্তী",
    levelColor: "bg-amber-100 text-amber-700",
    price: "৳ ১,৭৯৯",
    originalPrice: "৳ ৩,৪৯৯",
    isBestseller: true,
  },
  {
    id: "5",
    image: "https://picsum.photos/seed/course5/600/400",
    category: "ভাষা",
    categoryColor: "bg-green-100 text-green-700",
    title: "Spoken English — দৈনন্দিন জীবনে সাবলীল ইংরেজি বলতে শিখুন",
    instructor: "নাফিস চৌধুরী",
    instructorAvatar: "https://picsum.photos/seed/ins5/100/100",
    rating: 4.8,
    reviews: 2100,
    students: "২২,০০০+",
    duration: "১৮ ঘণ্টা",
    lessons: 54,
    level: "শিক্ষার্থী",
    levelColor: "bg-green-100 text-green-700",
    price: "৳ ৪৯৯",
    originalPrice: "৳ ৯৯৯",
  },
  {
    id: "6",
    image: "https://picsum.photos/seed/course6/600/400",
    category: "ডিজিটাল মার্কেটিং",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "Digital Marketing A–Z: SEO, Social Media ও Content Strategy",
    instructor: "আফিয়া জাহান",
    instructorAvatar: "https://picsum.photos/seed/ins6/100/100",
    rating: 4.6,
    reviews: 789,
    students: "৮,১০০+",
    duration: "২৮ ঘণ্টা",
    lessons: 84,
    level: "শিক্ষার্থী",
    levelColor: "bg-green-100 text-green-700",
    price: "৳ ৮৯৯",
    originalPrice: "৳ ১,৭৯৯",
    isFree: false,
    isNew: true,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-xs ${s <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}>
          ★
        </span>
      ))}
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/courses/${course.id}`} className="relative block overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          width={600}
          height={340}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {course.isBestseller && (
            <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-white">
              বেস্টসেলার
            </span>
          )}
          {course.isNew && (
            <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-white">
              নতুন
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${course.categoryColor}`}>
            {course.category}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${course.levelColor}`}>
            {course.level}
          </span>
        </div>

        <Link href={`/courses/${course.id}`}>
          <h3 className="line-clamp-2 text-[15px] font-black leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
            {course.title}
          </h3>
        </Link>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <Image
            src={course.instructorAvatar}
            alt={course.instructor}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-[12px] font-semibold text-slate-500">{course.instructor}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={course.rating} />
          <span className="text-[12px] font-bold text-amber-500">{course.rating}</span>
          <span className="text-[11px] text-slate-400">({course.reviews.toLocaleString()} রিভিউ)</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {course.students}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {course.lessons} লেসন
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-indigo-600">{course.price}</span>
            {course.originalPrice && (
              <span className="text-[12px] font-semibold text-slate-400 line-through">{course.originalPrice}</span>
            )}
          </div>
          <Link
            href={`/courses/${course.id}`}
            className="rounded-xl bg-indigo-50 px-3 py-2 text-[12px] font-bold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white"
          >
            ভর্তি হোন
          </Link>
        </div>
      </div>
    </article>
  )
}

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
