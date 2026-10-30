import { useCallback, useRef, useState, type FormEvent } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  PLACEHOLDERS,
  cn,
  useClickOutside,
  useRotatingPlaceholder,
} from "@/app/components/marketplace/mCommon/header/header.lib";

/* ── Category dropdown (desktop / tablet only) ──────────── */

interface CategoryDropdownProps {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
}

function CategoryDropdown({ categories, value, onChange }: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  return (
    <div
      ref={ref}
      className="relative hidden shrink-0 border-l-2 border-neutral-800 pl-3 pr-2 sm:block"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex max-w-[150px] items-center gap-1.5 rounded-full py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:text-amber-600"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* `inert` keeps the closed list out of the tab order (React 19+) */}
      <ul
        role="listbox"
        inert={!open}
        className={cn(
          "absolute right-0 top-[calc(100%+14px)] z-50 w-52 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-1.5 text-sm text-white shadow-2xl backdrop-blur-xl transition-all duration-200",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        {categories.map((c, i) => (
          <li key={c} style={{ transitionDelay: open ? `${i * 25}ms` : "0ms" }}>
            <button
              type="button"
              role="option"
              aria-selected={c === value}
              onClick={() => {
                onChange(c);
                close();
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-all duration-200 hover:translate-x-1 hover:bg-amber-400/15 hover:text-amber-300",
                c === value && "text-amber-400",
                open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              )}
            >
              {c}
              {c === value && <Check size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Search bar ─────────────────────────────────────────── */

interface SearchBarProps {
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
  onSearch?: (query: string, category: string) => void;
}

export default function SearchBar({
  categories,
  category,
  onCategoryChange,
  onSearch,
}: SearchBarProps) {
  // query is only needed here, so it lives here (category is shared with the drawer)
  const [query, setQuery] = useState("");
  const placeholder = useRotatingPlaceholder(PLACEHOLDERS, query.length > 0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(query.trim(), category);
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
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products, brands or shops"
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 sm:text-[15px]"
      />

      <CategoryDropdown
        categories={categories}
        value={category}
        onChange={onCategoryChange}
      />

      <button
        type="submit"
        aria-label="Search"
        className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-orange-500/40 transition-transform duration-300 hover:rotate-6 hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
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