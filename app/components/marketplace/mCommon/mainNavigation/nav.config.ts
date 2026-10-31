import { Flame, LifeBuoy, Sparkles, Store, Tag, type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

/** Single source of truth for navigation links (used by desktop + mobile). */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "home", href: "#deals", icon: Tag },
  { label: "Brands", href: "#brands", icon: Flame },
  { label: "Shops", href: "#shops", icon: Store },
  { label: "Support", href: "#support", icon: LifeBuoy },
  
] as const;

export const DEFAULT_ACTIVE = NAV_ITEMS[0].label;
