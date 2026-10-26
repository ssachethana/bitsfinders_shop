import { Flame, LifeBuoy, Sparkles, Store, Tag, type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

/** Single source of truth for navigation links (used by desktop + mobile). */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Deals", href: "#deals", icon: Tag, badge: "Hot" },
  { label: "New Arrivals", href: "#new", icon: Sparkles },
  { label: "Brands", href: "#brands", icon: Flame },
  { label: "Support", href: "#support", icon: LifeBuoy },
  { label: "Shops", href: "#shops", icon: Store },
] as const;

export const DEFAULT_ACTIVE = NAV_ITEMS[0].label;
