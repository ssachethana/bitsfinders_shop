import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LogIn, UserPlus, X } from "lucide-react";
import { cn } from "@/app/components/marketplace/mCommon/header/header.lib";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  logoSrc: string;
  logoAlt: string;
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
}

const sectionLabel =
  "mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500";

export default function MobileDrawer({
  open,
  onClose,
  logoSrc,
  logoAlt,
  categories,
  category,
  onCategoryChange,
}: MobileDrawerProps) {
  // Render the portal only after mount (SSR safe).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // While open: lock body scroll, close on Escape, move focus into the drawer.
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "bs-motion fixed inset-0 z-[60] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
      // `inert` stops keyboard focus entering the hidden drawer (React 19+)
      inert={!open}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute right-0 top-0 flex h-dvh w-[82%] max-w-sm flex-col overflow-y-auto border-l border-amber-400/20 bg-neutral-950 p-5 text-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <img src={logoSrc} alt={logoAlt} className="h-9 w-auto" />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-xl transition-all hover:rotate-90 hover:bg-white/10 hover:text-amber-400"
          >
            <X size={22} />
          </button>
        </div>

        {/* categories */}
        <p className={sectionLabel}>Categories</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                onCategoryChange(c);
                onClose();
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-all active:scale-95",
                c === category
                  ? "border-amber-400 bg-amber-400 text-black"
                  : "border-white/15 text-neutral-300 hover:border-amber-400/60 hover:text-amber-300"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* account links */}
        <p className={sectionLabel}>Account</p>
        <div className="space-y-2">
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 font-semibold text-black transition-transform active:scale-[0.98]"
          >
            <LogIn size={20} /> Login
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 font-semibold transition-colors hover:border-amber-400/60 hover:text-amber-300"
          >
            <UserPlus size={20} /> Register
          </Link>
        </div>
      </aside>
    </div>,
    document.body
  );
}