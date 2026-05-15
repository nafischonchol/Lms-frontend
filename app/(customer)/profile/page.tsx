import { redirect } from "next/navigation";
import { getStudent } from "@/lib/api/student-auth";
import { getMyEnrollmentsList } from "@/lib/api/enrollments";
import { ProfileClient } from "@/components/customer/profile/ProfileClient";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
  const student = await getStudent();
  
  if (!student) {
    redirect("/login");
  }

  const enrollmentsResult = await getMyEnrollmentsList({
    per_page: 50, // Get a good amount of enrollments
  });

  return (
    <ProfileClient 
      student={student} 
      enrollments={enrollmentsResult.items} 
    />
  );
}
