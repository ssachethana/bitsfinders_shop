"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Package,
  PlayCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/** Put your hero artwork in public/ (prefer AVIF/WebP, ~1920px wide, <200KB). */
const HERO_IMAGE = "/herobanner.png";

const FEATURES = [
  { icon: TrendingUp, label: "Track sales" },
  { icon: Package, label: "Manage inventory" },
  { icon: BarChart3, label: "Analyze performance" },
  { icon: ShieldCheck, label: "Secure & trusted" },
];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  size: 2 + (i % 4),
  delay: `${(i % 9) * 0.7}s`,
  duration: `${7 + (i % 6) * 1.5}s`,
}));

/** Reveal delay helper: CSS-only entrance, no JS gate, no hydration wait. */
const d = (ms: number): CSSProperties => ({ ["--d" as string]: `${ms}ms` });

/*
  Performance notes (what changed vs. the original)
  - Entrance animation is pure CSS (runs before hydration). The <h1> only
    translates (no opacity:0 start) so it can be painted immediately as LCP.
  - Hero image uses next/image with priority + sizes (preload, right-sized).
  - No backdrop-filter anywhere, no filter: blur(). Glows are radial gradients.
  - Gradient text is static (animating background-position repaints every frame).
  - Parallax writes CSS variables inside requestAnimationFrame. No React re-renders.
  - Parallax only on real mouse devices; touch devices skip it entirely.
  - Decorative animations pause when the hero is offscreen.
  - Fewer embers on phones; floating cards only on sm+.
  - will-change only on the 2 parallax layers.
*/
const CSS = `
  @keyframes bs-in { from { transform: translateY(24px); opacity: 0 } to { transform: none; opacity: 1 } }
  @keyframes bs-lift { from { transform: translateY(24px) } to { transform: none } }
  @keyframes bs-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
  @keyframes bs-rise { 0% { transform: translateY(0) scale(1); opacity: 0 } 15% { opacity: .9 } 100% { transform: translateY(-110vh) scale(.6); opacity: 0 } }
  @keyframes bs-sweep { from { transform: translateX(-120%) skewX(-20deg) } to { transform: translateX(380%) skewX(-20deg) } }
  @keyframes bs-ring { from { transform: scale(.8); opacity: .6 } to { transform: scale(2.2); opacity: 0 } }

  .bs-reveal { animation: bs-in .7s ease-out both; animation-delay: var(--d, 0ms) }
  .bs-lift   { animation: bs-lift .7s ease-out both; animation-delay: var(--d, 0ms) }

  .bs-gradient-text {
    background: linear-gradient(90deg,#f59e0b,#fde68a,#f97316);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }

  .bs-parallax-bg   { transform: translate3d(calc(var(--tx,0) * -10px), calc(var(--ty,0) * -8px), 0); transition: transform 300ms ease-out }
  .bs-parallax-card { transform: translate3d(calc(var(--tx,0) * 14px),  calc(var(--ty,0) * 10px), 0); transition: transform 300ms ease-out }
  @media (hover: hover) and (pointer: fine) {
    .bs-parallax-bg, .bs-parallax-card { will-change: transform }
  }

  /* Pause everything decorative when the hero is offscreen */
  [data-paused="true"] .bs-anim { animation-play-state: paused !important }

  @media (prefers-reduced-motion: reduce) {
    .bs-anim, .bs-reveal, .bs-lift { animation: none !important }
    .bs-parallax-bg, .bs-parallax-card { transition: none; transform: none }
  }
`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const raf = useRef(0);

  // Pause infinite animations while the hero is out of view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = String(!entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax via CSS variables: zero React renders per pointer move.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--tx", String(((clientX - r.left) / r.width - 0.5) * 2));
      el.style.setProperty("--ty", String(((clientY - r.top) / r.height - 0.5) * 2));
    });
  };

  const onLeave = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    cancelAnimationFrame(raf.current);
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-black text-white"
    >
      <style>{CSS}</style>

      {/* ---------- Background artwork ---------- */}
      {/* inset-[-2%] gives parallax headroom without a scaled full-viewport layer */}
      <div className="bs-parallax-bg absolute inset-[-2%] -z-10">
        {/* Sunset glow: radial gradient instead of blur-3xl (no filter cost) */}
        <div
          className="absolute right-[-10%] top-[10%] h-[70vh] w-[70vh] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(251,191,36,.45), rgba(249,115,22,.2) 55%, transparent 100%)",
          }}
        />
        <Image
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          className="object-cover object-[78%_center] sm:object-[70%_center] lg:object-right"
        />
      </div>

      {/* Readability overlays: left→right on desktop, top→bottom on mobile */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/70 to-black/30 lg:bg-gradient-to-r lg:from-black lg:via-black/75 lg:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Sun glow: static radial gradient (was animated blur-3xl) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[18%] -z-10 h-48 w-48 sm:h-64 sm:w-64"
        style={{
          background: "radial-gradient(closest-side, rgba(252,211,77,.4), transparent)",
        }}
      />

      {/* Rising embers (first 7 on phones, all 14 from sm up) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`bs-anim absolute bottom-[-10px] rounded-full bg-amber-300/80 shadow-[0_0_8px_1px_rgba(251,191,36,.6)] ${
              i >= 7 ? "hidden sm:block" : ""
            }`}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `bs-rise ${p.duration} linear ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* ---------- Content ---------- */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-28 pt-28 sm:px-8 sm:pb-24 lg:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Badge (solid translucent bg, no backdrop blur) */}
          <div
            style={d(0)}
            className="bs-reveal mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 sm:text-sm"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            Built for Sri Lankan businesses
          </div>

          {/* LCP element: transform-only entrance, visible from first paint */}
          <h1
            style={d(100)}
            className="bs-lift text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Everything You Need,
            <br />
            From <span className="bs-gradient-text">Trusted Shop</span>
          </h1>

          <p
            style={d(200)}
            className="bs-reveal mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg"
          >
            All-in-one business management platform to track sales, manage inventory,
            analyze performance, and grow faster. Designed for the future. Built for you.
          </p>

          {/* CTAs */}
          <div style={d(300)} className="bs-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#get-started"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/30 transition-transform duration-300 hover:scale-105 active:scale-95 sm:text-base"
            >
              {/* sheen: gradient strip, no blur filter */}
              <span
                aria-hidden
                className="bs-anim absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{ animation: "bs-sweep 3s ease-in-out infinite" }}
              />
              <ShoppingBag className="relative h-5 w-5" />
              <span className="relative">Get Started</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-amber-400/60 hover:bg-white/15 sm:text-base"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span
                  aria-hidden
                  className="bs-anim absolute inset-0 rounded-full bg-amber-400/60"
                  style={{ animation: "bs-ring 1.8s ease-out infinite" }}
                />
                <PlayCircle className="relative h-5 w-5 text-amber-400" />
              </span>
              Watch Demo
            </a>
          </div>

          {/* Feature chips */}
          <ul style={d(400)} className="bs-reveal mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/85 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-amber-400/10 sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-amber-400" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- Floating stat cards (sm and up) ---------- */}
      <div className="bs-parallax-card pointer-events-none absolute bottom-10 right-4 hidden sm:block lg:bottom-auto lg:right-[6%] lg:top-[22%]">
        <div
          className="bs-anim w-44 rounded-2xl border border-white/15 bg-black/70 p-3.5 shadow-xl lg:w-52"
          style={{ animation: "bs-float 6s ease-in-out infinite" }}
        >
          <div className="flex items-center gap-2 text-xs text-white/60">
            <TrendingUp className="h-4 w-4 text-emerald-400" /> Today&apos;s sales
          </div>
          <p className="mt-1 text-xl font-bold">Rs. 128,450</p>
          <p className="text-xs text-emerald-400">+18.2% vs yesterday</p>
        </div>
        <div
          className="bs-anim ml-8 mt-4 w-40 rounded-2xl border border-white/15 bg-black/70 p-3.5 shadow-xl lg:w-48"
          style={{ animation: "bs-float 7s ease-in-out 1.2s infinite" }}
        >
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Package className="h-4 w-4 text-amber-400" /> In stock
          </div>
          <p className="mt-1 text-xl font-bold">2,340 items</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>
        </div>
      </div>
    </section>
  );
}