"use client"
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Truck,
  BadgePercent,
  Globe,
  ChevronDown,
  PackageSearch,
  LifeBuoy,
  Check,
  type LucideIcon,
} from "lucide-react";

type InfoItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  /** shorter label used on very small screens */
  short: string;
  details: string;
};

const INFO_ITEMS: InfoItem[] = [
  {
    id: "secure",
    icon: ShieldCheck,
    label: "100% Secure Shopping",
    short: "Secure Shopping",
    details:
      "Your payments and personal data are encrypted and protected on every order.",
  },
  {
    id: "delivery",
    icon: Truck,
    label: "Free Delivery on Orders Over 10,000 LKR",
    short: "Free Delivery 10,000+ LKR",
    details:
      "Enjoy free island-wide delivery when your order total is above 10,000 LKR.",
  },
  {
    id: "deals",
    icon: BadgePercent,
    label: "Exclusive Deals & Offers",
    short: "Exclusive Deals",
    details:
      "Members get early access to sales, vouchers and limited-time offers.",
  },
];

const LANGUAGES = ["English", "සිංහල", "தமிழ்"];

export default function TopBar() {
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpenInfo(null);
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenInfo(null);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const active = INFO_ITEMS.find((i) => i.id === openInfo);

  return (
    <div ref={rootRef} className="relative z-40 w-full bg-black text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center gap-2 px-3 text-xs sm:px-4 sm:text-[13px] lg:px-6">
        {/* Info items: scrollable strip on small screens, centered on large */}
        <nav
          aria-label="Store highlights"
          className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center md:gap-8 lg:gap-12 [&::-webkit-scrollbar]:hidden"
        >
          {INFO_ITEMS.map(({ id, icon: Icon, label, short }) => {
            const isOpen = openInfo === id;
            return (
              <button
                key={id}
                type="button"
                aria-expanded={isOpen}
                aria-controls="topbar-info-panel"
                onClick={() => {
                  setLangOpen(false);
                  setOpenInfo(isOpen ? null : id);
                }}
                className="group flex shrink-0 items-center gap-1.5 rounded py-1 transition-colors hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400"
              >
                <Icon className="h-4 w-4 shrink-0 text-orange-400" aria-hidden />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{short}</span>
                <ChevronDown
                  className={`h-3 w-3 shrink-0 opacity-70 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </nav>

        {/* Right links */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-6">
          <a
            href="/track-order"
            className="flex items-center gap-1.5 transition-colors hover:text-orange-400"
            aria-label="Track order"
          >
            <PackageSearch className="h-4 w-4 md:hidden" aria-hidden />
            <span className="hidden md:inline">Track Order</span>
          </a>
          <a
            href="/help"
            className="flex items-center gap-1.5 transition-colors hover:text-orange-400"
            aria-label="Help and support"
          >
            <LifeBuoy className="h-4 w-4 md:hidden" aria-hidden />
            <span className="hidden md:inline">Help &amp; Support</span>
          </a>

          <div className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              onClick={() => {
                setOpenInfo(null);
                setLangOpen((v) => !v);
              }}
              className="flex items-center gap-1.5 rounded py-1 transition-colors hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400"
            >
              <Globe className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{language}</span>
              <ChevronDown
                className={`h-3 w-3 opacity-70 transition-transform ${
                  langOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-full mt-1 w-36 overflow-hidden rounded-md border border-white/10 bg-neutral-900 py-1 shadow-lg"
              >
                {LANGUAGES.map((l) => (
                  <li key={l} role="option" aria-selected={l === language}>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage(l);
                        setLangOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-white/10"
                    >
                      {l}
                      {l === language && (
                        <Check className="h-4 w-4 text-orange-400" aria-hidden />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Full-width detail panel (avoids clipping inside the scroll strip) */}
      {active && (
        <div
          id="topbar-info-panel"
          role="region"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-neutral-900 shadow-lg"
        >
          <p className="mx-auto flex max-w-7xl items-start gap-2 px-4 py-3 text-sm text-neutral-200 lg:px-6">
            <active.icon
              className="mt-0.5 h-4 w-4 shrink-0 text-orange-400"
              aria-hidden
            />
            {active.details}
          </p>
        </div>
      )}
    </div>
  );
}