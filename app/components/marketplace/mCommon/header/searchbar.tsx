import type { FormEvent } from "react";
import { Search } from "lucide-react";
import CategoryDropdown from "./categorydropdown";
import { PLACEHOLDERS, PLACEHOLDER_INTERVAL_MS } from "@/app/components/marketplace/mCommon/header/header.constants";
import { useRotatingPlaceholder } from "@/app/components/marketplace/mCommon/header/hooks/userotatingplaceholder";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
  onSubmit,
}: SearchBarProps) {
  const placeholder = useRotatingPlaceholder(
    PLACEHOLDERS,
    query.length > 0,
    PLACEHOLDER_INTERVAL_MS
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="group/search relative flex w-full items-center rounded-full bg-white p-1 pl-4 shadow-lg shadow-black/40 transition-all duration-300 focus-within:shadow-[0_0_0_3px_rgba(249,168,37,0.45),0_0_28px_rgba(249,168,37,0.35)] sm:pl-5"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products, brands or shops"
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 placeholder:transition-opacity sm:text-[15px]"
      />

      <CategoryDropdown
        categories={categories}
        value={category}
        onChange={onCategoryChange}
      />

      <button
        type="submit"
        aria-label="Search"
        className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-orange-500/40 transition-transform duration-300 hover:scale-110 hover:rotate-6 active:scale-95 sm:h-10 sm:w-10"
      >
        {/* pulse ring */}
        <span className="pointer-events-none absolute inset-0 animate-[bs-ping_2.4s_ease-out_infinite] rounded-full ring-2 ring-amber-300/70" />
        {/* shine sweep */}
        <span className="pointer-events-none absolute -left-full top-0 h-full w-full -skew-x-12 bg-white/40 transition-all duration-700 group-hover/search:left-full" />
        <Search size={18} strokeWidth={2.6} className="relative" />
      </button>
    </form>
  );
}