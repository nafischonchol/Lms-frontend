"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function CategoriesListFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams();
    if (value) params.set("search", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Search categories..."
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
