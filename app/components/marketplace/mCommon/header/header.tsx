"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Heart, Menu, ShoppingCart, User, type LucideIcon } from "lucide-react";
import "./header.css";

import { DEFAULT_CATEGORIES, cn } from "@/app/components/marketplace/mCommon/header/header.lib";
import SearchBar from "@/app/components/marketplace/mCommon/header/searchbar";
import MobileDrawer from "@/app/components/marketplace/mCommon/header/mobiledrawer";

/* ── Small presentational pieces (only used by the header) ── */

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <Link href="/" className="group/logo shrink-0" aria-label={`${alt} – home`}>
      <img
        src={src}
        alt={alt}
        className="h-9 w-auto object-contain transition-all duration-300 group-hover/logo:-rotate-2 group-hover/logo:scale-105 group-hover/logo:drop-shadow-[0_0_12px_rgba(249,168,37,0.7)] sm:h-11"
      />
    </Link>
  );
}

const actionBase =
  "group/act relative flex items-center rounded-xl px-2 py-1.5 text-white transition-colors hover:text-amber-400";

interface ActionLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Hover animation for the icon (use `group-hover/act:` variants). */
  iconClass?: string;
  /** Shows a counter bubble when > 0. */
  count?: number;
}

/** Icon + (desktop-only) label link with an optional counter bubble. */
function ActionLink({ href, label, icon: Icon, iconClass, count = 0 }: ActionLinkProps) {
  return (
    <Link href={href} className={cn(actionBase, "flex-col sm:flex-row sm:gap-2")}>
      <span className="relative">
        <Icon size={24} className={cn("transition-all duration-300", iconClass)} />
        {count > 0 && (
          // `key` remounts the bubble so the pop animation replays on every change
          <span
            key={count}
            className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] animate-[bs-pop_0.4s_ease-out] place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-1 text-[10px] font-bold leading-none text-black"
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </span>
      <span className="hidden text-xs font-semibold leading-tight lg:block">
        {label}
      </span>
    </Link>
  );
}

/* ── Header ──────────────────────────────────────────────── */

export interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  categories?: string[];
  wishlistCount?: number;
  cartCount?: number;
  onSearch?: (query: string, category: string) => void;
}

export default function Header({
  logoSrc = "/bitsshoplogo.png",
  logoAlt = "Bits Shop",
  categories = DEFAULT_CATEGORIES,
  wishlistCount = 0,
  cartCount = 0,
  onSearch,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className=" w-full bg-black text-white">
        {/*
          One flex-wrap row:
            mobile  → [logo ........ actions]
                      [      search        ]   (order-last + w-full wraps it)
            desktop → [logo][   search   ][actions]
          so a single <SearchBar /> serves both layouts.
        */}
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-3 gap-y-3 px-3 py-3 sm:gap-x-5 sm:px-6 sm:py-4 lg:gap-x-8">
          <Logo src={logoSrc} alt={logoAlt} />

          <div className="order-last w-full md:order-none md:w-auto md:min-w-0 md:flex-1 lg:mx-4">
            <SearchBar
              categories={categories}
              category={category}
              onCategoryChange={setCategory}
              onSearch={onSearch}
            />
          </div>

          <nav
            className="ml-auto flex items-center gap-1 sm:gap-3 md:ml-0 lg:gap-5"
            aria-label="User"
          >
            <ActionLink
              href="/wishlist"
              label="Wishlist"
              icon={Heart}
              count={wishlistCount}
              iconClass="group-hover/act:-translate-y-0.5 group-hover/act:scale-110 group-hover/act:fill-amber-400"
            />
            <ActionLink
              href="/cart"
              label="Cart"
              icon={ShoppingCart}
              count={cartCount}
              iconClass="group-hover/act:translate-x-0.5 group-hover/act:-rotate-12 group-hover/act:scale-110"
            />

            {/* account (desktop) */}
            <Link href="/account" className={cn(actionBase, "hidden gap-2 md:flex")}>
              <User
                size={26}
                className="transition-all duration-300 group-hover/act:scale-110"
              />
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-[10px] text-neutral-400">Account</span>
                <span className="block text-xs font-semibold">Login / Register</span>
              </span>
            </Link>

            {/* hamburger (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="ml-1 grid h-10 w-10 place-items-center rounded-xl text-white transition-colors hover:bg-white/10 hover:text-amber-400 active:scale-95 md:hidden"
            >
              <Menu size={24} />
            </button>
          </nav>
        </div>
      </header>

      <MobileDrawer
        open={menuOpen}
        onClose={closeMenu}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
      />
    </>
  );
}