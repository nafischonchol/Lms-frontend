"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, User, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { studentRegisterAction } from "@/lib/api/student-auth";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    
    const result = await studentRegisterAction(formData);

    if (result.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(result.message);
      if (result.errors) {
        setFieldErrors(result.errors);
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#0B1221] px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-3xl font-black tracking-tight text-white group-hover:text-[#b38716] transition-colors">YRERI</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-6">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-slate-400">
            আমাদের সাথে আপনার শেখার যাত্রা শুরু করুন
          </p>
        </div>

        <Card className="border-slate-800 bg-[#161F30] shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">রেজিস্ট্রেশন</CardTitle>
            <CardDescription className="text-slate-400">
              আপনার সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                <XCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="name">
                  নাম
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="আপনার নাম লিখুন"
                    className={`w-full rounded-xl border-slate-700 bg-[#0B1221] py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#b38716] focus:outline-none focus:ring-1 focus:ring-[#b38716] transition-all ${fieldErrors.name ? 'border-red-500/50 ring-1 ring-red-500/50' : ''}`}
                    required
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.name[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="email">
                  ইমেইল
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full rounded-xl border-slate-700 bg-[#0B1221] py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#b38716] focus:outline-none focus:ring-1 focus:ring-[#b38716] transition-all ${fieldErrors.email ? 'border-red-500/50 ring-1 ring-red-500/50' : ''}`}
                    required
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="password">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border-slate-700 bg-[#0B1221] py-2.5 pl-10 pr-10 text-sm text-white focus:border-[#b38716] focus:outline-none focus:ring-1 focus:ring-[#b38716] transition-all ${fieldErrors.password ? 'border-red-500/50 ring-1 ring-red-500/50' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.password[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="password_confirmation">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border-slate-700 bg-[#0B1221] py-2.5 pl-10 pr-10 text-sm text-white focus:border-[#b38716] focus:outline-none focus:ring-1 focus:ring-[#b38716] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-900/20 active:scale-95 transition-all" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                অ্যাকাউন্ট তৈরি করুন
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-slate-400">
            আপনার অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="font-bold text-[#b38716] hover:underline underline-offset-4">
              লগইন করুন
            </Link>
          </CardFooter>
        </Card>

        <p className="px-8 text-center text-sm text-slate-500 leading-relaxed">
          অ্যাকাউন্ট তৈরি করার মাধ্যমে আপনি আমাদের{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-slate-300">
            Terms of Service
          </Link>{" "}
          এবং{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-slate-300">
            Privacy Policy
          </Link>{" "}
          এর সাথে একমত পোষণ করছেন।
        </p>
      </div>
    </div>
  );
}
