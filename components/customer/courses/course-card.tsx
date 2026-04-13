import Link from "next/link"
import Image from "next/image"
import { Clock, Users, BookOpen } from "lucide-react"

export type Course = {
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

export function CourseCard({ course }: { course: Course }) {
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
          {course.isFree && (
            <span className="rounded-full bg-indigo-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-white">
              ফ্রি
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
