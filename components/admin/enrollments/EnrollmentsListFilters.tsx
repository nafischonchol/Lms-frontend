"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/admin/ui/input";

type EnrollmentsListFiltersProps = {
  initialSearch: string;
  initialStatus: string;
  title: string;
};

function normalizeSearchForQuery(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    return trimmed;
  }
  return "";
}

export function EnrollmentsListFilters({ initialSearch, initialStatus, title }: EnrollmentsListFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const navigateWithFilters = useCallback((searchValue: string, statusValue: string) => {
    const query = new URLSearchParams(searchParams.toString());
    const normalizedSearch = normalizeSearchForQuery(searchValue);

    query.set("page", "1");

    if (normalizedSearch) {
      query.set("search", normalizedSearch);
    } else {
      query.delete("search");
    }

    if (statusValue) {
      query.set("status", statusValue);
    } else {
      query.delete("status");
    }

    router.replace(`${pathname}?${query.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      navigateWithFilters(search, status);
    }, 350);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigateWithFilters, search, status]);

  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between md:p-6">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        >
          <option value="">All Status</option>
          <option value="pending">Pending Requests</option>
          <option value="approved">Active Enrollments</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search student or course..."
            className="h-10 pl-9"
          />
        </div>
      </div>
    </div>
  );
}
