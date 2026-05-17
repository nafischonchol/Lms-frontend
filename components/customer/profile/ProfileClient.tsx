"use client";

import { useState } from "react";
import { 
  User, 
  BookOpen, 
  Settings, 
  Award, 
  LogOut, 
  Mail, 
  Phone, 
  ChevronRight, 
  Book, 
  Clock,
  LayoutDashboard,
  MessageSquare,
  HelpCircle,
  Flame,
  CheckCircle2,
  Trophy,
  Star,
  GraduationCap,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { studentLogoutAction, studentUpdateProfileAction, studentUpdatePasswordAction } from "@/lib/api/student-auth";
import { type EnrollmentApiModel } from "@/lib/api/enrollments";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProfileClientProps {
  student: {
    name: string;
    email: string;
    phone: string | null;
    id: number;
  };
  enrollments: EnrollmentApiModel[];
}

export function ProfileClient({ student, enrollments }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderCourseCard = (enrollment: EnrollmentApiModel) => (
    <Card key={enrollment.id} className="rounded-[1.5rem] border-none shadow-sm hover:shadow-xl transition-all overflow-hidden bg-white group flex flex-col">
      {/* Course Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={enrollment.course?.thumbnail || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80"} 
          alt={enrollment.course?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-md">
          চলমান
        </div>
      </div>

      {/* Course Details */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-emerald-600 transition-colors">
          {enrollment.course?.title}
        </h3>
        <p className="text-sm text-slate-500 mb-6">প্রশিক্ষক: ড. আনিসুর রহমান</p>
        
        <div className="mt-auto space-y-3">
          {(enrollment.course?.mode === "online" || enrollment.course?.mode === "hybrid") && (
            <>
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>অগ্রগতি</span>
                <span className="text-emerald-600">৭৫%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full" 
                  style={{ width: "75%" }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: Book },
    { id: "edit", label: "Edit Profile", icon: Settings },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col hidden lg:flex">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="h-20 w-20 rounded-full bg-slate-100 ring-4 ring-slate-50 overflow-hidden flex items-center justify-center">
              <User className="h-10 w-10 text-slate-400" />
            </div>
            <div className="absolute bottom-0 right-0 h-5 w-5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Student ID: STU-{student.id}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold ${
                activeTab === item.id 
                  ? "bg-[#F3E8FF] text-[#7C3AED]" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-[#7C3AED]" : "text-slate-400"}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto space-y-4">
          <Link href="/courses">
            <Button className="w-full bg-[#10111d] hover:bg-[#1a1c2e] text-white rounded-xl py-6 font-bold">
              Enrol New Course
            </Button>
          </Link>
          
          <div className="pt-6 border-t border-slate-100 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-colors font-semibold">
              <HelpCircle className="h-5 w-5" />
              Help Center
            </button>
            <button 
              onClick={() => studentLogoutAction()}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 transition-colors font-semibold"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Header Banner */}
        <div className="relative w-full bg-[#10111d] rounded-[2.5rem] p-8 lg:p-12 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-slate-800 ring-4 ring-white/10 overflow-hidden flex items-center justify-center">
              <User className="h-12 w-12 lg:h-16 lg:w-16 text-slate-400" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-white">{student.name}</h1>
              <p className="text-slate-400 mt-2 flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {student.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-white/5 text-white text-xs rounded-full border border-white/10 font-medium">লেভেল ৪ শিক্ষার্থী</span>
                <span className="px-4 py-1.5 bg-white/5 text-white text-xs rounded-full border border-white/10 font-medium">কম্পিউটার সায়েন্স</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {activeTab === "overview" && (
            <>
             

              {/* Recent Enrolled Courses Header */}
              <div className="flex items-center justify-between px-2 mt-8">
                <h2 className="text-2xl font-bold text-slate-900">সাম্প্রতিক কোর্সসমূহ</h2>
                <button onClick={() => setActiveTab("courses")} className="text-sm font-bold text-emerald-600 flex items-center gap-1 hover:gap-2 transition-all">
                  সবগুলো দেখুন <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.length === 0 ? (
                  <Card className="col-span-full rounded-[2rem] border-2 border-dashed border-slate-200 p-12 text-center bg-white">
                    <BookOpen className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">আপনি এখনও কোনো কোর্সে ভর্তি হননি</p>
                    <Link href="/courses">
                      <Button className="mt-4 bg-[#10111d] text-white rounded-xl">কোর্সগুলো দেখুন</Button>
                    </Link>
                  </Card>
                ) : (
                  enrollments.slice(0, 3).map(renderCourseCard)
                )}
              </div>
            </>
          )}
          
          {activeTab === "courses" && (
            <>
              {/* Enrolled Courses Header */}
              <div className="flex items-center justify-between px-2 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">আমার সকল কোর্সসমূহ</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.length === 0 ? (
                  <Card className="col-span-full rounded-[2rem] border-2 border-dashed border-slate-200 p-12 text-center bg-white">
                    <BookOpen className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">আপনি এখনও কোনো কোর্সে ভর্তি হননি</p>
                    <Link href="/courses">
                      <Button className="mt-4 bg-[#10111d] text-white rounded-xl">কোর্সগুলো দেখুন</Button>
                    </Link>
                  </Card>
                ) : (
                  enrollments.map(renderCourseCard)
                )}
              </div>
            </>
          )}
          {activeTab === "edit" && (
            <Card className="rounded-[1.5rem] border-none shadow-sm bg-white p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">প্রোফাইল তথ্য আপডেট করুন</h2>
              <form action={async (formData) => {
                const res = await studentUpdateProfileAction(formData);
                if (res.ok) {
                  toast.success(res.message);
                  window.location.reload();
                } else {
                  toast.error(res.message);
                }
              }} className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">পুরো নাম</label>
                  <input name="name" defaultValue={student.name} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">ইমেইল</label>
                  <input type="email" name="email" defaultValue={student.email} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">ফোন নম্বর</label>
                  <input type="tel" name="phone" defaultValue={student.phone || ""} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                </div>
                <Button type="submit" className="bg-[#10111d] hover:bg-[#1a1c2e] text-white rounded-xl px-8 py-6 font-bold w-full sm:w-auto">
                  পরিবর্তন সেভ করুন
                </Button>
              </form>
            </Card>
          )}
          {activeTab === "security" && (
            <Card className="rounded-[1.5rem] border-none shadow-sm bg-white p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">পাসওয়ার্ড পরিবর্তন করুন</h2>
              <form action={async (formData) => {
                const res = await studentUpdatePasswordAction(formData);
                if (res.ok) {
                  toast.success(res.message);
                  const form = document.getElementById("password-form") as HTMLFormElement;
                  if (form) form.reset();
                } else {
                  toast.error(res.message);
                }
              }} id="password-form" className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">বর্তমান পাসওয়ার্ড</label>
                  <input type="password" name="current_password" placeholder="বর্তমান পাসওয়ার্ড দিন" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">নতুন পাসওয়ার্ড</label>
                  <input type="password" name="password" placeholder="নতুন পাসওয়ার্ড দিন" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required minLength={6} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                  <input type="password" name="password_confirmation" placeholder="আবার নতুন পাসওয়ার্ড দিন" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required minLength={6} />
                </div>
                <Button type="submit" className="bg-[#10111d] hover:bg-[#1a1c2e] text-white rounded-xl px-8 py-6 font-bold w-full sm:w-auto">
                  পাসওয়ার্ড পরিবর্তন করুন
                </Button>
              </form>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
