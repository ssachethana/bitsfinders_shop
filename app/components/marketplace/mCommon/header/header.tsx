"use client"; // remove this line if you are not using Next.js App Router

import { useCallback, useState } from "react";
import "./header.css";
import { cn } from "@/app/components/marketplace/mCommon/header/className";
import { DEFAULT_CATEGORIES, SCROLL_THRESHOLD_PX } from "@/app/components/marketplace/mCommon/header/header.constants";
import { useScrolled } from "@/app/components/marketplace/mCommon/header/hooks/usescrolled";
import Logo from "@/app/components/marketplace/mCommon/header/logo";
import SearchBar from "./searchbar";
import HeaderActions from "./headeractions";
import MobileDrawer from "@/app/components/marketplace/mCommon/header/mobiledrawer";

interface HeaderProps {
  /** Path/URL of your PNG logo, e.g. "/logo.png" */
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
  const scrolled = useScrolled(SCROLL_THRESHOLD_PX);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState("");

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const submit = () => onSearch?.(query.trim(), category);

  // shared by the desktop and the mobile search bar
  const searchProps = {
    query,
    onQueryChange: setQuery,
    categories,
    category,
    onCategoryChange: setCategory,
    onSubmit: submit,
  };

  return (
    <>
      <header
        className={cn(
          "bs-motion sticky top-0 z-50 w-full text-white transition-all duration-300",
          scrolled
            ? "bg-black/85 shadow-xl shadow-black/50 backdrop-blur-lg"
            : "bg-black"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl items-center gap-3 px-3 transition-all duration-300 sm:gap-5 sm:px-6 lg:gap-8",
            scrolled ? "py-2" : "py-3 sm:py-4"
          )}
        >
          <Logo src={logoSrc} alt={logoAlt} compact={scrolled} />

          {/* desktop / tablet search */}
          <div className="hidden min-w-0 flex-1 md:block lg:mx-4">
            <SearchBar {...searchProps} />
          </div>

          {/* spacer on mobile */}
          <div className="flex-1 md:hidden" />

          <HeaderActions
            wishlistCount={wishlistCount}
            cartCount={cartCount}
            onMenuClick={() => setMenuOpen(true)}
          />
        </div>

        {/* mobile search row */}
        <div className="px-3 pb-3 sm:px-6 md:hidden">
          <SearchBar {...searchProps} />
        </div>

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