"use client"
import { useState } from "react";
import { DEFAULT_ACTIVE } from "@/app/components/marketplace/mCommon/mainNavigation/nav.config";
import { useMobileMenu, useScrollState, useSpotlight } from "@/app/components/marketplace/mCommon/mainNavigation/hooks";
import DesktopNav from "@/app/components/marketplace/mCommon/mainNavigation/DesktopNav";
import MobileMenu from "@/app/components/marketplace/mCommon/mainNavigation/MobileMenu";
import NavActions, { Brand } from "@/app/components/marketplace/mCommon/mainNavigation/NavActions";

/** Keyframes live here so the component works without editing tailwind.config. */
const NAV_KEYFRAMES = `
  @keyframes nav-ping { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.2);opacity:0} }
  @keyframes nav-in   { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
  @keyframes nav-drop { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:none} }
  @media (prefers-reduced-motion: reduce){ .nav-anim{animation:none!important} }
`;

type Props = { cartCount?: number };

export default function Navbar({ cartCount = 3 }: Props) {
  const [active, setActive] = useState(DEFAULT_ACTIVE);
  const { scrolled, progress } = useScrollState();
  const { open, close, toggle } = useMobileMenu();
  const spotlight = useSpotlight<HTMLDivElement>();

  return (
    <>
      <style>{NAV_KEYFRAMES}</style>

      <header
        className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,.45)]" : ""
        }`}
      >
        <div
          ref={spotlight.ref}
          onMouseMove={spotlight.onMouseMove}
          className={`group/nav relative overflow-hidden bg-[#141414]/95 backdrop-blur-md transition-[height] duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* cursor spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100"
            style={{
              background:
                "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.09), transparent 70%)",
            }}
          />
          {/* scroll progress */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />

          <nav
            aria-label="Main"
            className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          >
            <Brand />
            <DesktopNav active={active} onSelect={setActive} />
            <NavActions cartCount={cartCount} menuOpen={open} onToggleMenu={toggle} />
          </nav>
        </div>

        <MobileMenu open={open} active={active} onSelect={setActive} onClose={close} />
      </header>
    </>
  );
}
