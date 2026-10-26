"use client"; // remove this line if you are not using Next.js App Router

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  LogIn,
  UserPlus,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */
interface HeaderProps {
  /** Path/URL of your PNG logo, e.g. "/logo.png" */
  logoSrc?: string;
  logoAlt?: string;
  categories?: string[];
  wishlistCount?: number;
  cartCount?: number;
  onSearch?: (query: string, category: string) => void;
}

const DEFAULT_CATEGORIES = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Toys",
];

const PLACEHOLDERS = [
  "Search Products brands or shops...",
  "Try “wireless earbuds”...",
  "Try “running shoes”...",
  "Try “smart watch”...",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Header({
  logoSrc = "/bitsshoplogo.png",
  logoAlt = "Bits Shop",
  categories = DEFAULT_CATEGORIES,
  wishlistCount = 0,
  cartCount = 0,
  onSearch,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const catRef = useRef<HTMLDivElement>(null);

  /* shrink + glow when page is scrolled */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* rotating placeholder (only while the input is empty) */
  useEffect(() => {
    if (query) return;
    const id = setInterval(
      () => setPhIndex((i) => (i + 1) % PLACEHOLDERS.length),
      3000
    );
    return () => clearInterval(id);
  }, [query]);

  /* close dropdown on outside click / Escape */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node))
        setCatOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCatOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* lock body scroll while the mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim(), category);
  };

  /* ---------------------------- search box ---------------------------- */
  const SearchBox = (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="group/search relative flex w-full items-center rounded-full bg-white p-1 pl-4 shadow-lg shadow-black/40 transition-all duration-300 focus-within:shadow-[0_0_0_3px_rgba(249,168,37,0.45),0_0_28px_rgba(249,168,37,0.35)] sm:pl-5"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={PLACEHOLDERS[phIndex]}
        aria-label="Search products, brands or shops"
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 placeholder:transition-opacity sm:text-[15px]"
      />

      {/* category dropdown */}
      <div
        ref={catRef}
        className="relative hidden shrink-0 border-l-2 border-neutral-800 pl-3 pr-2 sm:block"
      >
        <button
          type="button"
          onClick={() => setCatOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={catOpen}
          className="flex max-w-[150px] items-center gap-1.5 rounded-full py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:text-amber-600"
        >
          <span className="truncate">{category}</span>
          <ChevronDown
            size={16}
            className={`shrink-0 transition-transform duration-300 ${
              catOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <ul
          role="listbox"
          className={`absolute right-0 top-[calc(100%+14px)] z-50 w-52 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-1.5 text-sm text-white shadow-2xl backdrop-blur-xl transition-all duration-200 ${
            catOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          {categories.map((c, i) => (
            <li key={c} style={{ transitionDelay: catOpen ? `${i * 25}ms` : "0ms" }}>
              <button
                type="button"
                role="option"
                aria-selected={c === category}
                onClick={() => {
                  setCategory(c);
                  setCatOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-all duration-200 hover:translate-x-1 hover:bg-amber-400/15 hover:text-amber-300 ${
                  c === category ? "text-amber-400" : ""
                } ${catOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
              >
                {c}
                {c === category && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* search button */}
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

  /* ---------------------------- action item --------------------------- */
  const actionBase =
    "group/act relative flex items-center gap-2 rounded-xl px-2 py-1.5 text-white transition-colors hover:text-amber-400";

  return (
    <>
      {/* keyframes used by this component (no tailwind.config changes needed) */}
      <style>{`
        @keyframes bs-ping { 0% { transform: scale(1); opacity: .8 } 80%,100% { transform: scale(1.7); opacity: 0 } }
        @keyframes bs-flow { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes bs-pop  { 0% { transform: scale(0) } 70% { transform: scale(1.25) } 100% { transform: scale(1) } }
        @keyframes bs-drop { from { transform: translateY(-8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .bs-motion *, .bs-motion { animation: none !important; transition: none !important } }
      `}</style>

      <header
        className={`bs-motion sticky top-0 z-50 w-full bg-black text-white transition-all duration-300 ${
          scrolled ? "bg-black/85 shadow-xl shadow-black/50 backdrop-blur-lg" : ""
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center gap-3 px-3 transition-all duration-300 sm:gap-5 sm:px-6 lg:gap-8 ${
            scrolled ? "py-2" : "py-3 sm:py-4"
          }`}
        >
          {/* logo */}
          <a
            href="/"
            className="group/logo shrink-0"
            aria-label={`${logoAlt} – home`}
          >
            <img
              src={logoSrc}
              alt={logoAlt}
              className={`w-auto object-contain transition-all duration-300 group-hover/logo:-rotate-2 group-hover/logo:scale-105 group-hover/logo:drop-shadow-[0_0_12px_rgba(249,168,37,0.7)] ${
                scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"
              }`}
            />
          </a>

          {/* desktop / tablet search */}
          <div className="hidden min-w-0 flex-1 md:block lg:mx-4">{SearchBox}</div>

          {/* spacer on mobile */}
          <div className="flex-1 md:hidden" />

          {/* actions */}
          <nav className="flex items-center gap-1 sm:gap-3 lg:gap-5" aria-label="User">
            {/* wishlist */}
            <a href="/wishlist" className={`${actionBase} flex-col gap-0 sm:flex-row sm:gap-2`}>
              <span className="relative">
                <Heart
                  size={24}
                  className="transition-all duration-300 group-hover/act:-translate-y-0.5 group-hover/act:scale-110 group-hover/act:fill-amber-400"
                />
                {wishlistCount > 0 && <Badge n={wishlistCount} />}
              </span>
              <span className="hidden text-xs font-semibold leading-tight lg:block">
                Wishlist’s
              </span>
            </a>

            {/* cart */}
            <a href="/cart" className={`${actionBase} flex-col gap-0 sm:flex-row sm:gap-2`}>
              <span className="relative">
                <ShoppingCart
                  size={24}
                  className="transition-all duration-300 group-hover/act:translate-x-0.5 group-hover/act:-rotate-12 group-hover/act:scale-110"
                />
                {cartCount > 0 && <Badge n={cartCount} />}
              </span>
              <span className="hidden text-xs font-semibold leading-tight lg:block">
                Cart
              </span>
            </a>

            {/* account (desktop) */}
            <a href="/account" className={`${actionBase} hidden md:flex`}>
              <User
                size={26}
                className="transition-all duration-300 group-hover/act:scale-110 group-hover/act:text-amber-400"
              />
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-[10px] text-neutral-400">Account</span>
                <span className="block text-xs font-semibold">Login / Register</span>
              </span>
            </a>

            {/* hamburger (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="ml-1 grid h-10 w-10 place-items-center rounded-xl text-white transition-colors hover:bg-white/10 hover:text-amber-400 active:scale-95 md:hidden"
            >
              <Menu size={24} />
            </button>
          </nav>
        </div>

        {/* mobile search row */}
        <div className="px-3 pb-3 sm:px-6 md:hidden">{SearchBox}</div>

        {/* animated gradient line */}
        <div
          className="h-[2px] w-full bg-[length:200%_100%] opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, #f59e0b, #fb923c, #fde047, #f59e0b, transparent)",
            animation: "bs-flow 4s linear infinite",
          }}
        />
      </header>

      {/* ------------------------ mobile drawer ------------------------ */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* panel */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-amber-400/20 bg-neutral-950 p-5 shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <img src={logoSrc} alt={logoAlt} className="h-9 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
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
                onClick={() => {
                  setCategory(c);
                  setMenuOpen(false);
                }}
                className={`rounded-full border px-3 py-1.5 text-sm transition-all active:scale-95 ${
                  c === category
                    ? "border-amber-400 bg-amber-400 text-black"
                    : "border-white/15 text-neutral-300 hover:border-amber-400/60 hover:text-amber-300"
                }`}
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
    </>
  );
}

/* small counter bubble with a pop-in animation (re-pops whenever n changes) */
function Badge({ n }: { n: number }) {
  return (
    <span
      key={n}
      className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-1 text-[10px] font-bold leading-none text-black"
      style={{ animation: "bs-pop 0.4s ease-out" }}
    >
      {n > 99 ? "99+" : n}
    </span>
  );
}