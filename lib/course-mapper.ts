import { type Course } from "@/components/customer/courses/course-card";
import { type CourseApiModel } from "@/lib/api/courses";


export function mapApiToCourse(apiCourse: CourseApiModel): Course {
  const levelMap = {
    beginner: "শিক্ষানবিশ",
    intermediate: "মধ্যবর্তী",
    advanced: "অ্যাডভান্সড",
  } as const;

  const levelColorMap = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-red-100 text-red-700",
  } as const;

  return {
    id: String(apiCourse.id),
    image:
      apiCourse.thumbnail ||
      `https://picsum.photos/seed/course-${apiCourse.id}/600/400`,
    category: apiCourse.category?.name || "সাধারণ",
    categoryColor: "bg-indigo-100 text-indigo-700",
    title: apiCourse.title,
    instructor: apiCourse.instructor?.name || "অজানা ইন্সট্রাক্টর",
    instructorAvatar: `https://picsum.photos/seed/ins-${apiCourse.instructor_id}/100/100`,
    rating: 4.8, // Default fallback
    reviews: 0,
    students:
      Number(apiCourse.enrollments_count || 0) > 0
        ? `${apiCourse.enrollments_count}+`
        : "০+",
    duration: apiCourse.duration || "N/A",
    lessons: Number(apiCourse.lessons_count || 0),
    level: levelMap[apiCourse.level || "beginner"],
    levelColor: levelColorMap[apiCourse.level || "beginner"],
    price: `৳ ${Number(apiCourse.price).toLocaleString()}`,
    originalPrice: undefined,
    isBestseller: false,
    isNew: true,
  };
}
