"use client"
import { useEffect, useRef, useState } from "react";
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

/** Put your hero artwork here (public/images/bitshop-hero.png). */
const HERO_IMAGE = "/herobanner.png";

const FEATURES = [
  { icon: TrendingUp, label: "Track sales" },
  { icon: Package, label: "Manage inventory" },
  { icon: BarChart3, label: "Analyze performance" },
  { icon: ShieldCheck, label: "Secure & trusted" },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  size: 2 + (i % 4),
  delay: `${(i % 9) * 0.7}s`,
  duration: `${7 + (i % 6) * 1.5}s`,
}));

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Parallax tilt (pointer devices only; harmless on touch)
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  const reveal = `transition-all duration-700 ease-out ${
    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;
  const delay = (ms: number): React.CSSProperties => ({ transitionDelay: `${ms}ms` });

  return (
    <section
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-black text-white"
    >
      <style>{`
        @keyframes bs-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
        @keyframes bs-rise { 0% { transform: translateY(0) scale(1); opacity: 0 } 15% { opacity: .9 } 100% { transform: translateY(-110vh) scale(.6); opacity: 0 } }
        @keyframes bs-shine { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes bs-sweep { 0% { transform: translateX(-120%) skewX(-20deg) } 100% { transform: translateX(320%) skewX(-20deg) } }
        @keyframes bs-pulse { 0%,100% { opacity: .55; transform: scale(1) } 50% { opacity: .95; transform: scale(1.12) } }
        @keyframes bs-ring { 0% { transform: scale(.8); opacity: .6 } 100% { transform: scale(2.2); opacity: 0 } }
        .bs-gradient-text { background: linear-gradient(90deg,#f59e0b,#fde68a,#f97316,#f59e0b); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: bs-shine 4s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .bs-anim, .bs-gradient-text { animation: none !important } }
      `}</style>

      {/* ---------- Background artwork ---------- */}
      <div
        ref={stageRef}
        className="absolute inset-0 -z-10"
        style={{
          transform: `translate3d(${tilt.x * -10}px, ${tilt.y * -8}px, 0) scale(1.05)`,
          transition: "transform 300ms ease-out",
        }}
      >
        {/* Fallback sunset glow if the image is missing */}
        <div className="absolute right-[-10%] top-[10%] h-[70vh] w-[70vh] rounded-full bg-gradient-to-br from-amber-400/60 via-orange-500/30 to-transparent blur-3xl" />
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[78%_center] sm:object-[70%_center] lg:object-right"
          onError={(e) => ((e.currentTarget.style.display = "none"))}
        />
      </div>

      {/* Readability overlays: left→right on desktop, top→bottom on mobile */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/70 to-black/30 lg:bg-gradient-to-r lg:from-black lg:via-black/75 lg:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Pulsing sun glow */}
      <div className="bs-anim pointer-events-none absolute right-[8%] top-[18%] -z-10 h-40 w-40 rounded-full bg-amber-300/40 blur-3xl [animation:bs-pulse_5s_ease-in-out_infinite] sm:h-56 sm:w-56" />

      {/* Rising embers */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="bs-anim absolute bottom-[-10px] rounded-full bg-amber-300/80 shadow-[0_0_10px_2px_rgba(251,191,36,.7)]"
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
          {/* Badge */}
          <div
            className={`mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-amber-200 backdrop-blur-md sm:text-sm ${reveal}`}
            style={delay(0)}
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            Built for Sri Lankan businesses
          </div>

          <h1
            className={`text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl ${reveal}`}
            style={delay(120)}
          >
            Everything You Need,
            <br />
            From <span className="bs-gradient-text">Trusted Shop</span>
          </h1>

          <p
            className={`mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg ${reveal}`}
            style={delay(240)}
          >
            All-in-one business management platform to track sales, manage inventory,
            analyze performance, and grow faster. Designed for the future. Built for you.
          </p>

          {/* CTAs */}
          <div style={delay(360)} className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${reveal}`}>
            <a
              href="#get-started"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/30 transition-transform duration-300 hover:scale-105 active:scale-95 sm:text-base"
            >
              <span className="bs-anim absolute inset-y-0 left-0 w-1/3 bg-white/40 blur-md [animation:bs-sweep_3s_ease-in-out_infinite]" />
              <ShoppingBag className="relative h-5 w-5" />
              <span className="relative">Get Started</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:border-amber-400/60 hover:bg-white/10 sm:text-base"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="bs-anim absolute inset-0 rounded-full bg-amber-400/60 [animation:bs-ring_1.8s_ease-out_infinite]" />
                <PlayCircle className="relative h-5 w-5 text-amber-400" />
              </span>
              Watch Demo
            </a>
          </div>

          {/* Feature chips */}
          <ul style={delay(480)} className={`mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap ${reveal}`}>
            {FEATURES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-amber-400/10 sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-amber-400" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- Floating stat cards (hidden on very small screens) ---------- */}
      <div
        className="pointer-events-none absolute bottom-10 right-4 hidden sm:block lg:bottom-auto lg:right-[6%] lg:top-[22%]"
        style={{
          transform: `translate3d(${tilt.x * 14}px, ${tilt.y * 10}px, 0)`,
          transition: "transform 300ms ease-out",
        }}
      >
        <div className="bs-anim w-44 rounded-2xl border border-white/15 bg-black/40 p-3.5 shadow-xl backdrop-blur-xl [animation:bs-float_6s_ease-in-out_infinite] lg:w-52">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <TrendingUp className="h-4 w-4 text-emerald-400" /> Today's sales
          </div>
          <p className="mt-1 text-xl font-bold">Rs. 128,450</p>
          <p className="text-xs text-emerald-400">+18.2% vs yesterday</p>
        </div>
        <div className="bs-anim ml-8 mt-4 w-40 rounded-2xl border border-white/15 bg-black/40 p-3.5 shadow-xl backdrop-blur-xl [animation:bs-float_7s_ease-in-out_1.2s_infinite] lg:w-48">
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