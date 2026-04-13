"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Github, Globe, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#0B1221] px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-3xl font-black tracking-tight text-white group-hover:text-[#b38716] transition-colors">YRERI</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-6">
            স্বাগতম, আবার দেখা হয়ে ভালো লাগলো
          </h1>
          <p className="text-slate-400">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        <Card className="border-slate-800 bg-[#161F30] shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">লগইন</CardTitle>
            <CardDescription className="text-slate-400">
              আপনার ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="email">
                  ইমেইল
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-xl border-slate-700 bg-[#0B1221] py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#b38716] focus:outline-none focus:ring-1 focus:ring-[#b38716] transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-200" htmlFor="password">
                    পাসওয়ার্ড
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#b38716] hover:underline"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-xl border-slate-700 bg-[#0B1221] py-2.5 pl-10 pr-10 text-sm text-white focus:border-[#b38716] focus:outline-none focus:ring-1 focus:ring-[#b38716] transition-all"
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
              </div>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-900/20 active:scale-95 transition-all" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                লগইন করুন
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#161F30] px-2 text-slate-500 font-bold">অথবা লগইন করুন</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-slate-700 bg-transparent text-white hover:bg-slate-800 rounded-xl py-6 active:scale-95 transition-all">
                <Globe className="mr-2 h-4 w-4" />
                গুগল
              </Button>
              <Button variant="outline" className="border-slate-700 bg-transparent text-white hover:bg-slate-800 rounded-xl py-6 active:scale-95 transition-all">
                <Github className="mr-2 h-4 w-4" />
                গিটহাব
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-slate-400">
            আপনার অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="font-bold text-[#b38716] hover:underline underline-offset-4">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </CardFooter>
        </Card>

        <p className="px-8 text-center text-sm text-slate-500 leading-relaxed">
          লগইন করার মাধ্যমে আপনি আমাদের{" "}
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
