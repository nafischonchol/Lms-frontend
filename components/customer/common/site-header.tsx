"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe, Menu, Moon, Search, X, Sun } from "lucide-react";

export type SiteNavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const defaultNavLinks: SiteNavLink[] = [
  { label: "হোম", href: "/" },
  { label: "কোর্সসমূহ", href: "/courses" },
  // { label: "লাইভ ক্লাস", href: "/courses/live" },
  // { label: "ক্যাটাগরি", href: "/courses/categories", hasDropdown: true },
  // { label: "শিক্ষকমণ্ডলী", href: "/instructors" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ", href: "/contact-us" },
];

export function SiteHeader({
  navLinks = defaultNavLinks,
}: {
  navLinks?: SiteNavLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Persistence: Load Theme & Language
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") document.documentElement.classList.add("dark");
    }

    const savedLang = localStorage.getItem("language") as "bn" | "en";
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Theme Toggle Handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Language Toggle Handler
  const toggleLanguage = () => {
    const newLang = language === "bn" ? "en" : "bn";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-md ring-1 ring-slate-200/5 transition-all">
        {/* Top Branding Row (kept for future use, hidden) */}
        <div
          className={`hidden overflow-hidden border-b border-[#e0b22f]/20 transition-all duration-300 md:block ${isCompact ? "max-h-0 opacity-0 transform -translate-y-2" : "max-h-24 opacity-100 transform translate-y-0"}`}
        ></div>

        {/* Sliding Search Overlay */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out border-b border-red-50 bg-slate-50/50 ${isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="কোর্স বা বিষয় খুঁজুন..."
                autoFocus={isSearchOpen}
                className="w-full rounded-2xl border-none bg-white py-3.5 pl-12 pr-12 text-base font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-[#c79a1d]"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Header Row */}
        <div className="border-b border-[#e0b22f]/30 md:hidden bg-white">
          <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3.5">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-xl bg-slate-50 p-2 text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all active:scale-95"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="inline-flex items-center gap-1">
              <span className="text-xl font-black tracking-tight text-slate-900">
                YRERI
              </span>
            </Link>

            <button type="button" className="p-2 text-slate-700">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar Row */}
        <div className="hidden border-b border-[#e0b22f]/20 bg-[#0B1221] md:block">
          <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 lg:px-6">
            {/* Left: YRERI branding */}
            <Link href="/" className="inline-flex shrink-0 items-center">
              <span className="text-lg font-black tracking-tight text-slate-900">
                YRERI
              </span>
            </Link>

            {/* Right: Menu and Login Button */}
            <div className="flex items-center gap-2">
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative inline-flex shrink-0 items-center gap-1 px-4 py-3.5 text-[16px] font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-[#b38716]"
                          : "text-white hover:text-[#b38716]"
                      }`}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#b38716] rounded-t-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
              <Link
                href="/login"
                className="ml-2 inline-flex items-center rounded-2xl bg-indigo-600 px-5 py-2.5 text-[15px] font-bold text-white shadow transition-all hover:bg-indigo-700 active:scale-95"
              >
                লগইন
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative h-full w-[85%] max-w-sm bg-white shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between border-b px-5 py-5 bg-white sticky top-0">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  YRERI
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-100 p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-6 space-y-2">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Navigation Menu
              </p>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-5 py-4 text-[17px] font-semibold transition-all ${pathname === link.href ? "bg-[#fff6dd] text-[#b38716]" : "hover:bg-slate-50"}`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="h-4 w-4 opacity-30" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="px-6 mt-10 space-y-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-white border border-slate-200 py-4.5 text-slate-900 font-bold shadow-sm transition-all hover:bg-slate-50"
              >
                লগইন
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-indigo-600 py-4.5 text-white font-bold shadow-lg shadow-indigo-200/50 transition-all hover:bg-indigo-700"
              >
                ভর্তি হোন
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
