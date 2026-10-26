import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/app/components/marketplace/mCommon/header/className";
import { useClickOutside } from "@/app/components/marketplace/mCommon/header/hooks/useclickoutside";

interface CategoryDropdownProps {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
}

export default function CategoryDropdown({
  categories,
  value,
  onChange,
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // each instance owns its own ref, so desktop + mobile search bars don't clash
  useClickOutside(ref, () => setOpen(false), open);

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

      <ul
        role="listbox"
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
              tabIndex={open ? 0 : -1}
              onClick={() => {
                onChange(c);
                setOpen(false);
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