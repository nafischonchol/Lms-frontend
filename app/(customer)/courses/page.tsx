import { getPublicCoursesList } from "@/lib/api/courses";
import { mapApiToCourse } from "@/lib/course-mapper";
import { CoursesPageContent } from "@/components/customer/courses/courses-page-content";

export default async function CoursesPage() {
  const { items } = await getPublicCoursesList({
    per_page: 100, // Fetch many for client-side filtering
  });

  const courses = items.map(mapApiToCourse);

  const categories = [
    "সব",
    ...Array.from(new Set(courses.map((c) => c.category))),
  ];

  return (
    <CoursesPageContent initialCourses={courses} categories={categories} />
  );
}
