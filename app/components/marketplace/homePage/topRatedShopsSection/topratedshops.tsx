"use client";

import { useEffect, useRef, useState } from "react";
import {
  Star,
  MapPin,
  Package,
  ArrowRight,
  Store,
  ShoppingBag,
  Smartphone,
  Sparkles,
  ShoppingCart,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/* ----------------------------- data ----------------------------- */

type Shop = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  products: number;
  city: string;
  href: string;
  /** Optional cover photo – falls back to the gradient if missing */
  cover?: string;
  /** Optional logo image – falls back to the icon if missing */
  logo?: string;
  icon: LucideIcon;
  gradient: string; // tailwind gradient classes for the cover fallback
  accent: string; // tailwind bg class for logo fallback
};

const SHOPS: Shop[] = [
  {
    id: 1,
    name: "Green Mart",
    rating: 4.8,
    reviews: 1200,
    products: 1200,
    city: "Colombo",
    href: "/shops/green-mart",
    icon: ShoppingBag,
    gradient: "from-fuchsia-500 via-orange-400 to-yellow-300",
    accent: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Tech World",
    rating: 4.7,
    reviews: 990,
    products: 990,
    city: "Kandy",
    href: "/shops/tech-world",
    icon: Store,
    gradient: "from-slate-900 via-slate-700 to-orange-500",
    accent: "bg-orange-500",
  },
  {
    id: 3,
    name: "Beauty Hub",
    rating: 4.8,
    reviews: 1500,
    products: 1500,
    city: "Colombo",
    href: "/shops/beauty-hub",
    icon: Sparkles,
    gradient: "from-pink-400 via-rose-300 to-purple-400",
    accent: "bg-stone-900",
  },
  {
    id: 4,
    name: "Daily Needs",
    rating: 4.6,
    reviews: 870,
    products: 180,
    city: "Colombo",
    href: "/shops/daily-needs",
    icon: Smartphone,
    gradient: "from-sky-400 via-cyan-300 to-teal-300",
    accent: "bg-indigo-950",
  },
  {
    id: 5,
    name: "Keels",
    rating: 4.8,
    reviews: 1200,
    products: 1200,
    city: "Colombo",
    href: "/shops/keels",
    icon: ShoppingCart,
    gradient: "from-green-600 via-green-500 to-sky-400",
    accent: "bg-green-500",
  },
];

/* --------------------------- helpers ---------------------------- */

/** Fade/slide in when scrolled into view */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, seen] as const;
}

/** Number that counts up once visible */
function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return <>{n.toLocaleString()}</>;
}

/* ---------------------------- card ------------------------------ */

function ShopCard({ shop, index }: { shop: Shop; index: number }) {
  const [ref, seen] = useInView<HTMLElement>();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const Icon = shop.icon;

  // subtle 3D tilt that follows the pointer (desktop only – touch has no hover)
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(
      x * 8
    ).toFixed(2)}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`shrink-0 basis-[78%] snap-center transition-all duration-700 ease-out sm:basis-auto
        ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)]
          ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 ease-out will-change-transform
          hover:shadow-[0_18px_40px_-12px_rgba(245,158,11,0.45)]"
      >
        {/* animated glowing border on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 ring-2 ring-amber-400/70 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* ---------- cover ---------- */}
        <div className="relative h-28 overflow-hidden sm:h-24 lg:h-28">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${shop.gradient} transition-transform duration-700 ease-out group-hover:scale-110`}
          >
            {shop.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
            {/* decorative blobs for the fallback */}
            {!shop.cover && (
              <>
                <span className="absolute -left-4 top-3 h-14 w-14 rounded-full bg-white/25 blur-md" />
                <span className="absolute right-2 top-6 h-10 w-10 rounded-full bg-white/20 blur-md" />
              </>
            )}
          </div>

          {/* shine sweep */}
          <span
            aria-hidden
            className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent
              opacity-0 group-hover:animate-[shine_0.9s_ease-out] group-hover:opacity-100"
          />

          {/* torn-paper edge */}
          <svg
            aria-hidden
            viewBox="0 0 400 30"
            preserveAspectRatio="none"
            className="absolute -bottom-px left-0 h-5 w-full text-white"
          >
            <path
              fill="currentColor"
              d="M0 30V14l12-4 10 6 14-9 12 8 16-7 10 7 15-10 12 9 14-6 11 7 16-8 12 8 14-9 12 7 15-6 11 8 14-9 13 8 15-7 12 7 14-9 12 9 16-7 11 6 14-8 13 9 15-6 12 6 14-8 11 8 16-9 12 7 14-5 12 7 15-9 11 8 14-7 13 6 12-6V30Z"
            />
          </svg>
        </div>

        {/* ---------- logo ---------- */}
        <div className="relative z-10 -mt-12 flex justify-center">
          <div className="relative">
            {/* pulsing ring */}
            <span
              aria-hidden
              className="absolute inset-0 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-amber-300/40"
              style={{ animationDelay: `${index * 250}ms` }}
            />
            <div
              className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white
                shadow-lg ${shop.accent} text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[360deg] sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20`}
            >
              {shop.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shop.logo} alt={`${shop.name} logo`} className="h-full w-full object-cover" />
              ) : (
                <Icon className="h-9 w-9" strokeWidth={1.8} />
              )}
            </div>
          </div>
        </div>

        {/* ---------- body ---------- */}
        <div className="px-4 pb-4 pt-2 text-center">
          <h3 className="truncate text-base font-bold text-gray-900">{shop.name}</h3>

          <div className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:rotate-[72deg] group-hover:scale-125" />
            <span className="font-semibold text-amber-600">{shop.rating.toFixed(1)}</span>
            <span className="text-[11px]">({shop.reviews.toLocaleString()})</span>
          </div>

          <div className="mt-2 space-y-0.5 text-xs text-gray-600">
            <p className="flex items-center justify-center gap-1">
              <Package className="h-3.5 w-3.5 text-gray-400" />
              <span>
                <CountUp to={shop.products} run={seen} /> Products
              </span>
            </p>
            <p className="flex items-center justify-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              {shop.city}
            </p>
          </div>

          <a
            href={shop.href}
            className="group/btn relative mt-3 flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-md
              border border-amber-400 bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700 transition-colors duration-300
              hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
              active:scale-[0.97]"
          >
            {/* fill-from-left on hover */}
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
            />
            <span className="relative">Visit Shop</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* --------------------------- section ---------------------------- */

export default function TopRatedShops() {
  const [headRef, headSeen] = useInView<HTMLDivElement>();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-amber-50/40 py-8 sm:py-12">
      {/* keyframes used by arbitrary animation classes above */}
      <style>{`
        @keyframes shine { from { transform: translateX(0) skewX(-12deg);} to { transform: translateX(450%) skewX(-12deg);} }
        @keyframes floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-10px);} }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe-anim { animation: none !important; }
          [class*="animate-["] { animation: none !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* floating background decorations */}
      <span
        aria-hidden
        className="motion-safe-anim pointer-events-none absolute -right-10 top-6 h-40 w-40 animate-[floaty_6s_ease-in-out_infinite] rounded-full bg-amber-200/40 blur-3xl"
      />
      <span
        aria-hidden
        className="motion-safe-anim pointer-events-none absolute -left-10 bottom-4 h-48 w-48 animate-[floaty_8s_ease-in-out_infinite] rounded-full bg-orange-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div
          ref={headRef}
          className={`mb-6 flex items-center justify-between gap-3 transition-all duration-700 sm:mb-10 ${
            headSeen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
              <Trophy className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Top Rated Shop
              </h2>
              <span className="mt-1 block h-1 w-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 hover:w-24" />
            </div>
          </div>

          <a
            href="/shops"
            className="group hidden items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/*
          Mobile: horizontal snap carousel
          ≥sm: 2 cols → md: 3 cols → lg: 5 cols
        */}
        <div
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-2
            sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-5"
        >
          {SHOPS.map((shop, i) => (
            <ShopCard key={shop.id} shop={shop} index={i} />
          ))}
        </div>

        {/* mobile "view all" + swipe hint */}
        <div className="mt-1 flex items-center justify-between sm:hidden">
          <span className="text-xs text-gray-400">Swipe to explore →</span>
          <a href="/shops" className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}