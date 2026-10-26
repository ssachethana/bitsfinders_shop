"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, CalendarClock, Rocket, Sparkles, TrendingUp, Zap } from "lucide-react";

/**
 * CtaBanner — "Ready to grow your business with Bits Shop"
 * Stack: React + TSX + Tailwind CSS + lucide-react
 * Responsive: stacked + centered on mobile, split layout from md up.
 * Effects: scroll reveal, cursor spotlight, drifting glow blobs, grid mask,
 *          floating icons, shimmer sweep + glow on buttons, animated underline.
 */
export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  // Reveal when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (setVisible(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cursor-follow spotlight (works with touch too)
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const reveal = `transition-all duration-700 ease-out motion-reduce:transition-none ${
    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;
  const d = (ms: number) => ({ transitionDelay: `${ms}ms` });

  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Local keyframes so no tailwind.config changes are needed */}
      <style>{`
        @keyframes cta-float { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-14px) rotate(8deg)} }
        @keyframes cta-blob  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
        @keyframes cta-shine { 0%{transform:translateX(-120%) skewX(-20deg)} 60%,100%{transform:translateX(220%) skewX(-20deg)} }
        @keyframes cta-pulse { 0%{box-shadow:0 0 0 0 rgba(251,176,36,.55)} 100%{box-shadow:0 0 0 16px rgba(251,176,36,0)} }
        @keyframes cta-line  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        .cta-float{animation:cta-float 6s ease-in-out infinite}
        .cta-blob{animation:cta-blob 9s ease-in-out infinite}
        .cta-shine{animation:cta-shine 3.2s ease-in-out infinite}
        .cta-pulse{animation:cta-pulse 2s ease-out infinite}
        .cta-line{transform-origin:left;animation:cta-line .9s .6s ease-out both}
        @media (prefers-reduced-motion: reduce){
          .cta-float,.cta-blob,.cta-shine,.cta-pulse,.cta-line{animation:none}
        }
      `}</style>

      <article
        ref={sectionRef}
        onMouseMove={handleMove}
        className="group relative mx-auto flex max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-[#0f0f0f] px-6 py-10 text-center shadow-2xl ring-1 ring-white/10 sm:px-10 sm:py-12 md:flex-row md:justify-between md:gap-10 md:px-14 md:py-14 md:text-left"
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(251,176,36,0.16), transparent 60%)`,
          }}
        />

        {/* Drifting glow blobs */}
        <div aria-hidden className="cta-blob pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl" />
        <div aria-hidden className="cta-blob pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl [animation-delay:-4s]" />

        {/* Subtle grid, faded at edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />

        {/* Floating decorative icons */}
        <Rocket aria-hidden className="cta-float absolute left-4 top-4 hidden h-6 w-6 text-amber-400/40 sm:block" />
        <TrendingUp aria-hidden className="cta-float absolute right-6 top-6 hidden h-7 w-7 text-amber-400/30 [animation-delay:-2s] sm:block" />
        <Sparkles aria-hidden className="cta-float absolute bottom-5 left-1/2 hidden h-5 w-5 text-amber-300/30 [animation-delay:-4s] lg:block" />

        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <span className={`mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300 ${reveal}`} style={d(0)}>
            <Zap className="h-3.5 w-3.5" /> Trusted by thousands
          </span>

          <h2 className={`text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl ${reveal}`} style={d(100)}>
            Ready to grow your business
            <br className="hidden sm:block" /> with{" "}
            <span className="relative inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Bits Shop
              <span className="cta-line absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
            </span>
            ?
          </h2>

          <p className={`mt-4 text-sm leading-relaxed text-white/70 sm:text-base ${reveal}`} style={d(200)}>
            Join thousands of businesses already using Bits Shop to simplify their operations.
          </p>
        </div>

        {/* Actions */}
        <div className={`relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:shrink-0 ${reveal}`} style={d(300)}>
          <button
            type="button"
            className="cta-pulse group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-white px-6 py-3 text-sm font-semibold text-amber-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f] active:scale-95"
          >
            <span aria-hidden className="cta-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <span className="relative">Start Free Trial</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>

          <button
            type="button"
            className="group/btn flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-amber-400 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-white hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f] active:scale-95"
          >
            Schedule Demo
            <CalendarClock className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
          </button>
        </div>
      </article>
    </section>
  );
}