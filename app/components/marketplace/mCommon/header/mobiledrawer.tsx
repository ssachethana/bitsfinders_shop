import { useEffect } from "react";
import { LogIn, UserPlus, X } from "lucide-react";
import { cn } from "@/app/components/marketplace/mCommon/header/className";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  logoSrc: string;
  logoAlt: string;
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
}

export default function MobileDrawer({
  open,
  onClose,
  logoSrc,
  logoAlt,
  categories,
  category,
  onCategoryChange,
}: MobileDrawerProps) {
  /* lock body scroll + close on Escape while the drawer is open */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
      // `inert` stops keyboard focus entering the hidden drawer (needs React 19+)
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
        className={cn(
          "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-amber-400/20 bg-neutral-950 p-5 text-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <img src={logoSrc} alt={logoAlt} className="h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-xl transition-all hover:rotate-90 hover:bg-white/10 hover:text-amber-400"
          >
            <X size={22} />
          </button>
        </div>

        {/* categories */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Categories
        </p>
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
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Account
        </p>
        <div className="space-y-2">
          <a
            href="/login"
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 font-semibold text-black transition-transform active:scale-[0.98]"
          >
            <LogIn size={20} /> Login
          </a>
          <a
            href="/register"
            className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 font-semibold transition-colors hover:border-amber-400/60 hover:text-amber-300"
          >
            <UserPlus size={20} /> Register
          </a>
        </div>
      </aside>
    </div>
  );
}