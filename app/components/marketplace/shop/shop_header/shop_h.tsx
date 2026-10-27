"use client"
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Check,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  Package,
  PlusCircle,
  ShoppingBag,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";

/* ----------------------------- Types & defaults ---------------------------- */

export interface ShopHeaderProps {
  name?: string;
  rating?: number;
  reviews?: number;
  positiveFeedback?: number; // percent
  location?: string;
  products?: number;
  description?: string;
  tags?: string[];
  /** Optional image URLs. When omitted, nice placeholders are shown. */
  bannerSrc?: string;
  logoSrc?: string;
  onFollow?: (following: boolean) => void;
  onMessage?: () => void;
}

/* --------------------------------- Helpers --------------------------------- */

/** Animates a number from 0 → value once the element is mounted. */
function useCountUp(value: number, duration = 1400, decimals = 0) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;

    // Check whether the user prefers reduced motion.
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Update the state inside an animation-frame callback,
    // rather than synchronously inside the effect.
    if (prefersReducedMotion) {
      raf = requestAnimationFrame(() => {
        setDisplay(value);
      });

      return () => cancelAnimationFrame(raf);
    }

    const start = performance.now();

    // Animate the number using an ease-out cubic curve.
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(value * eased);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    // Clean up pending animation frames.
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  // Format the animated value for display.
  return decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();
}

/* -------------------------------- Component -------------------------------- */

export default function ShopHeader({
  name = "Green Mart",
  rating = 4.8,
  reviews = 1200,
  positiveFeedback = 98,
  location = "Colombo, Sri Lanka",
  products = 1200,
  description = "Your trusted neighborhood store for fresh groceries, daily essentials and more.",
  tags = ["Quality products", "Best prices", "Always for you"],
  bannerSrc = './shop_banner.png',
  logoSrc,
  onFollow,
  onMessage,
}: ShopHeaderProps) {
  const [following, setFollowing] = useState(false);
  const [burst, setBurst] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const ratingText = useCountUp(rating, 1200, 1);
  const reviewsText = useCountUp(reviews);
  const feedbackText = useCountUp(positiveFeedback);
  const productsText = useCountUp(products);

  const handlePointerMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = bannerRef.current?.getBoundingClientRect();
    if (!r) return;
    setParallax({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  const toggleFollow = () => {
    const next = !following;
    setFollowing(next);
    if (next) setBurst((b) => b + 1);
    onFollow?.(next);
  };

  return (
    <header className="sh-root relative w-full overflow-hidden bg-white">
      
     

      {/* ============================== BANNER ============================== */}
      <div
        ref={bannerRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        className="relative h-36 sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full overflow-hidden bg-gradient-to-br from-emerald-700 via-green-600 to-orange-400"
      >
        {/* Image or placeholder, with Ken-Burns + mouse parallax */}
        <div
          className="absolute -inset-6 transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -6}px, 0)`,
          }}
        >
          {bannerSrc ? (
            <img
              src={bannerSrc}
              alt={`${name} banner`}
              className="h-full w-full object-cover"
              style={{ animation: "sh-kenburns 18s ease-in-out infinite alternate" }}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,170,60,.45),transparent_50%)]"
              style={{ animation: "sh-kenburns 18s ease-in-out infinite alternate" }}
            >
              <div className="flex flex-col items-center gap-2 text-white/70">
                <ImageIcon className="h-10 w-10 sm:h-14 sm:w-14" strokeWidth={1.25} />
                <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase">
                  Banner image · 1920×400
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Dark vignette for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10" />

        {/* Floating sparkle particles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-6 block h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_2px_rgba(255,255,255,.6)]"
              style={{
                left: `${8 + i * 9.5}%`,
                animation: `sh-float ${5 + (i % 4)}s ease-in-out ${i * 0.55}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Optional brand chips (hidden on tiny screens) */}
        <div className="absolute left-3 top-3 hidden sm:flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/30">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          Fresh Healthy Everyday
        </div>

        {/* Curved wave cut-out at the bottom */}
        <Image
  src="./Vector.svg"
  alt=""
  width={1440}
  height={120}
  className="absolute -bottom-px left-0 h-8 w-full sm:h-12 md:h-16"
  aria-hidden="true"
/>
      </div>

      {/* ============================ INFO SECTION ========================== */}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-6 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-8">
        {/* ---------- Left: avatar + details ---------- */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left">
          {/* Avatar */}
          <div className="sh-up group relative -mt-14 shrink-0 sm:-mt-20 md:-mt-24" style={{ animationDelay: ".05s" }}>
            
            
            
            <span
              className="absolute -inset-1 rounded-full b opacity-90 blur-[1px]"
              style={{ animation: "sh-spin 6s linear infinite" }}
            />
            <div
              className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 sm:h-36 sm:w-36 md:h-40 md:w-40"
              
            >
              {logoSrc ? (
                <img src={logoSrc} alt={`${name} logo`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-green-50 to-orange-50 text-green-600">
                  <ShoppingBag className="h-9 w-9 sm:h-12 sm:w-12" strokeWidth={1.75} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Logo
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Text block */}
          <div className="flex min-w-0 flex-col items-center gap-2.5 sm:items-start sm:pt-4 md:pt-5">
            {/* Name + verified */}
            <div className="sh-up flex items-center gap-2" style={{ animationDelay: ".15s" }}>
              <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-green-700 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
                {name}
              </h1>
              <BadgeCheck
                className="h-5 w-5 shrink-0 fill-sky-500 text-white transition-transform duration-500 hover:rotate-[360deg] sm:h-6 sm:w-6"
                aria-label="Verified shop"
              />
            </div>

            {/* Stats row */}
            <ul
              className="sh-up flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-600 sm:justify-start sm:text-sm"
              style={{ animationDelay: ".25s" }}
            >
              <li className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 transition-transform hover:scale-125 hover:rotate-12" />
                <span className="font-semibold text-slate-800">{ratingText}</span>
                <span className="text-slate-500">({reviewsText} reviews)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4 text-green-600 transition-transform hover:-translate-y-0.5 hover:-rotate-12" />
                <span>{feedbackText}% positive feedback</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-orange-500 transition-transform hover:-translate-y-0.5" />
                <span>{location}</span>
              </li>
            </ul>

            {/* Products chip */}
            <div
              className="sh-up inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:shadow sm:text-[13px]"
              style={{ animationDelay: ".35s" }}
            >
              <Package className="h-3.5 w-3.5" />
              {productsText} Products
            </div>

            {/* Description */}
            <p
              className="sh-up max-w-xl text-sm leading-relaxed text-slate-600"
              style={{ animationDelay: ".45s" }}
            >
              {description}
            </p>

            {/* Tags */}
            <ul
              className="sh-up flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-700 sm:justify-start sm:text-[13px]"
              style={{ animationDelay: ".55s" }}
            >
              {tags.map((t, i) => (
                <li key={t} className="flex items-center gap-2">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-slate-400" aria-hidden />}
                  <span className="cursor-default transition-colors hover:text-orange-600">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Right: actions ---------- */}
        <div
          className="sh-up flex w-full gap-3 sm:w-auto sm:justify-center lg:pt-6"
          style={{ animationDelay: ".6s" }}
        >
          {/* Follow */}
          <button
            type="button"
            onClick={toggleFollow}
            aria-pressed={following}
            className={`group relative flex-1 overflow-hidden rounded-md px-5 py-2.5 text-sm font-semibold shadow-md transition-all duration-300 active:scale-95 sm:flex-none sm:px-7 ${
              following
                ? "bg-green-600 text-white shadow-green-500/30 hover:bg-green-700"
                : "bg-orange-500 text-white shadow-orange-500/30 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/40"
            }`}
          >
            {/* shine sweep */}
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30"
              style={{ animation: "sh-shine 3.2s ease-in-out infinite" }}
              aria-hidden
            />
            {/* click burst */}
            {burst > 0 && (
              <span
                key={burst}
                className="pointer-events-none absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12 rounded-full bg-white/60"
                style={{ animation: "sh-pop .6s ease-out forwards" }}
                aria-hidden
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              {following ? (
                <Check className="h-4 w-4" />
              ) : (
                <PlusCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              )}
              {following ? "Following" : "Follow Shop"}
            </span>
          </button>

          {/* Message */}
          <button
            type="button"
            onClick={onMessage}
            className="group relative flex-1 overflow-hidden rounded-md border border-orange-400 bg-white px-5 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 sm:flex-none sm:px-7"
          >
            {/* fill-in on hover */}
            <span
              className="absolute inset-0 origin-left scale-x-0 bg-orange-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
              aria-hidden
            />
            <span className="relative flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              Message Shop
            </span>
          </button>
        </div>
      </div>

      {/* subtle bottom divider */}
      <div className="h-2 w-full bg-gradient-to-b from-slate-100 to-transparent" />
    </header>
  );
}