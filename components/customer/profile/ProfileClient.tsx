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
  Calendar, 
  Edit2, 
  ChevronRight, 
  Book, 
  CheckCircle2, 
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studentLogoutAction } from "@/lib/api/student-auth";
import { type EnrollmentApiModel } from "@/lib/api/enrollments";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Profile Header Section */}
      <div className="relative h-48 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute -bottom-16 left-0 w-full px-4 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
              <div className="relative group">
                <div className="h-32 w-32 rounded-3xl bg-white p-1 shadow-2xl ring-4 ring-white/50 overflow-hidden">
                  <div className="h-full w-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <User className="h-16 w-16" />
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
                <h1 className="text-3xl font-black text-slate-900 drop-shadow-sm">{student.name}</h1>
                <p className="text-slate-600 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                  <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-bold uppercase tracking-wider">
                    STU-{student.id}
                  </span>
                  • {student.email}
                </p>
              </div>
              <div className="flex gap-3 mb-2 md:mb-0">
                <Button 
                  onClick={() => studentLogoutAction()}
                  className="rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none font-bold"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  লগআউট
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mt-24 mx-auto max-w-6xl px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Stats & Info */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="bg-slate-900 text-white pb-8">
              <CardTitle className="text-lg">একনজরে</CardTitle>
            </CardHeader>
            <CardContent className="-mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-900">{enrollments.length}</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">কোর্স</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-900">0</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">সার্টিফিকেট</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">ইমেইল</span>
                    <span className="text-sm font-semibold">{student.email}</span>
                  </div>
                </div>
                {student.phone && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">ফোন</span>
                      <span className="text-sm font-semibold">{student.phone}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/50 p-2">
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${activeTab === "overview" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-slate-50 text-slate-700"}`}
              >
                <div className="flex items-center gap-3">
                  <Book className="h-5 w-5" />
                  <span className="font-bold">আমার কোর্সসমূহ</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${activeTab === "settings" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-slate-50 text-slate-700"}`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  <span className="font-bold">সেটিংস</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            </nav>
          </Card>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">চালু থাকা কোর্সসমূহ</h2>
                <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">
                  মোট {enrollments.length} টি
                </div>
              </div>

              <div className="grid gap-6">
                {enrollments.length === 0 ? (
                  <Card className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">আপনি এখনও কোনো কোর্সে ভর্তি হননি</h3>
                    <p className="text-sm text-slate-500 mt-2 mb-6">আমাদের কোর্সসমূহ দেখে আপনার পছন্দের কোর্সে ভর্তি হন।</p>
                    <Link href="/courses">
                      <Button className="rounded-xl bg-indigo-600 font-bold">কোর্সসমূহ দেখুন</Button>
                    </Link>
                  </Card>
                ) : (
                  enrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="rounded-3xl border-none shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all group overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-32 sm:h-auto overflow-hidden relative">
                          <img 
                            src={enrollment.course?.thumbnail || "https://picsum.photos/seed/course/400/250"} 
                            alt={enrollment.course?.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                        </div>
                        <div className="flex-1 p-6 space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                                {enrollment.course?.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  enrollment.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                                  enrollment.status === "pending" ? "bg-amber-100 text-amber-700" :
                                  "bg-red-100 text-red-700"
                                }`}>
                                  {enrollment.status === "approved" ? "Active" :
                                   enrollment.status === "pending" ? "Pending Approval" : "Rejected"}
                                </span>
                                {enrollment.fee && (
                                  <span className="text-[11px] font-bold text-slate-400">৳{Number(enrollment.fee).toLocaleString()}</span>
                                )}
                              </div>
                            </div>
                            {enrollment.status === "approved" && (
                              <Link href={`/courses/${enrollment.course_id}`}>
                                <div className="bg-indigo-600 text-white h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 active:scale-95 transition-all cursor-pointer shrink-0">
                                  <ChevronRight className="h-6 w-6" />
                                </div>
                              </Link>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                <Clock className="h-3.5 w-3.5" />
                                {enrollment.enrolled_at ? new Intl.DateTimeFormat("bn-BD").format(new Date(enrollment.enrolled_at)) : "আবেদন করা হয়েছে"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">অ্যাকাউন্ট সেটিংস</h2>
              <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/50 p-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-600" />
                    ব্যক্তিগত তথ্য
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">পূর্ণ নাম</label>
                      <input 
                        type="text" 
                        defaultValue={student.name}
                        disabled
                        className="w-full rounded-xl border-slate-200 bg-slate-100 py-3 px-4 text-sm text-slate-500 cursor-not-allowed outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">ইমেইল অ্যাড্রেস</label>
                      <input 
                        type="email" 
                        defaultValue={student.email}
                        disabled
                        className="w-full rounded-xl border-slate-200 bg-slate-100 py-3 px-4 text-sm text-slate-500 cursor-not-allowed outline-none"
                      />
                    </div>
                    {student.phone && (
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">ফোন নম্বর</label>
                        <input 
                          type="text" 
                          defaultValue={student.phone}
                          disabled
                          className="w-full rounded-xl border-slate-200 bg-slate-100 py-3 px-4 text-sm text-slate-500 cursor-not-allowed outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-amber-50 rounded-2xl p-4 flex gap-3 border border-amber-100">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                  <p className="text-xs font-medium text-amber-800">
                    ব্যক্তিগত তথ্য পরিবর্তনের জন্য অনুগ্রহ করে সাপোর্ট টিমের সাথে যোগাযোগ করুন।
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
