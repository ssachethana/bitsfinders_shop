import type { ReactNode } from "react";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import Badge from "@/app/components/marketplace/mCommon/header/badge";
import { cn } from "@/app/components/marketplace/mCommon/header/className";

interface HeaderActionsProps {
  wishlistCount: number;
  cartCount: number;
  onMenuClick: () => void;
}

const actionBase =
  "group/act relative flex items-center gap-2 rounded-xl px-2 py-1.5 text-white transition-colors hover:text-amber-400";

/** Icon + (desktop-only) label link, shared by wishlist and cart. */
function ActionLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={cn(actionBase, "flex-col gap-0 sm:flex-row sm:gap-2")}>
      <span className="relative">{children}</span>
      <span className="hidden text-xs font-semibold leading-tight lg:block">
        {label}
      </span>
    </a>
  );
}

export default function HeaderActions({
  wishlistCount,
  cartCount,
  onMenuClick,
}: HeaderActionsProps) {
  return (
    <nav className="flex items-center gap-1 sm:gap-3 lg:gap-5" aria-label="User">
      <ActionLink href="/wishlist" label="Wishlist">
        <Heart
          size={24}
          className="transition-all duration-300 group-hover/act:-translate-y-0.5 group-hover/act:scale-110 group-hover/act:fill-amber-400"
        />
        {wishlistCount > 0 && <Badge n={wishlistCount} />}
      </ActionLink>

      <ActionLink href="/cart" label="Cart">
        <ShoppingCart
          size={24}
          className="transition-all duration-300 group-hover/act:translate-x-0.5 group-hover/act:-rotate-12 group-hover/act:scale-110"
        />
        {cartCount > 0 && <Badge n={cartCount} />}
      </ActionLink>

      {/* account (desktop) */}
      <a href="/account" className={cn(actionBase, "hidden md:flex")}>
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
        onClick={onMenuClick}
        aria-label="Open menu"
        className="ml-1 grid h-10 w-10 place-items-center rounded-xl text-white transition-colors hover:bg-white/10 hover:text-amber-400 active:scale-95 md:hidden"
      >
        <Menu size={24} />
      </button>
    </nav>
  );
}