"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ArrowUp, Apple, Play } from "lucide-react";
import FooterBrand from "@/app/components/marketplace/mCommon/footer/footer_brand";
import FooterLinks, { Reveal } from "@/app/components/marketplace/mCommon/footer/footer_links";
import FooterBottom from "@/app/components/marketplace/mCommon/footer/footer_bottom";

// App-store CTA is used only by the footer layout.
function StoreButton({
  icon,
  small,
  big,
}: {
  icon: ReactNode;
  small: string;
  big: string;
}) {
  return (
    <a
      href="#"
      className="group/store relative flex w-40 items-center gap-2.5 overflow-hidden rounded-lg border border-slate-700 bg-black px-3 py-2 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/30 active:scale-95"
    >
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover/store:left-[150%]" />
      <span className="transition-transform duration-300 group-hover/store:scale-110">
        {icon}
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-wide text-white/70">{small}</span>
        <span className="mt-0.5 text-[17px] font-semibold">{big}</span>
      </span>
    </a>
  );
}

// Composition root: owns only footer-wide visual interactions.
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = footerRef.current?.getBoundingClientRect();
    if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };

  return (
    <>
      <style>{`
        @keyframes bs-sway { 0%,100%{transform:rotate(-6deg) translateY(0)} 50%{transform:rotate(8deg) translateY(-3px)} }
        @keyframes bs-flow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes bs-float { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
        @keyframes bs-beat { 0%,100%{transform:scale(1)} 15%{transform:scale(1.3)} 30%{transform:scale(1)} 45%{transform:scale(1.2)} }
        @media (prefers-reduced-motion: reduce){ .bs-anim{animation:none!important} }
      `}</style>

      <footer
        ref={footerRef}
        onMouseMove={onMove}
        onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
        className="relative isolate overflow-hidden bg-white"
      >
        {/* animated gradient top edge */}
        <div
          className="bs-anim absolute inset-x-0 top-0 h-1 bg-[length:200%_100%] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300"
          style={{ animation: "bs-flow 4s linear infinite" }}
        />

        {/* ambient blobs */}
        <div
          className="bs-anim pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"
          style={{ animation: "bs-float 12s ease-in-out infinite" }}
        />
        <div
          className="bs-anim pointer-events-none absolute -right-20 bottom-20 -z-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"
          style={{ animation: "bs-float 15s ease-in-out infinite reverse" }}
        />

        {/* cursor spotlight (desktop pointers only) */}
        <div
          className="pointer-events-none absolute -z-10 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/30 blur-3xl transition-opacity duration-300 md:block"
          style={{ left: spot.x, top: spot.y, opacity: spot.on ? 1 : 0 }}
        />

        <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-4 lg:grid-cols-[1.3fr_repeat(4,1fr)_1.2fr] lg:gap-8">
            <FooterBrand />

            <FooterLinks />

            {/* App download */}
            <Reveal delay={200} className="md:col-span-4 lg:col-span-1">
              <h3 className="text-base font-bold text-slate-900">Download Our App</h3>
              <p className="mt-1.5 text-xs text-slate-600">
                Get the app for better experience
              </p>
              <div className="mt-4 flex flex-wrap gap-3 lg:flex-col">
                <StoreButton
                  icon={<Play className="h-6 w-6 fill-emerald-400 text-emerald-400" />}
                  small="Get it on"
                  big="Google Play"
                />
                <StoreButton
                  icon={<Apple className="h-6 w-6 fill-white" />}
                  small="Download on the"
                  big="App Store"
                />
              </div>
            </Reveal>
          </div>

          <FooterBottom />
        </div>
      </footer>

      {/* Back to top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-90 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}