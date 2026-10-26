
import {
  Store,
  ShoppingBag,
  Smartphone,
  Sparkles,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

/**
 * Shop data contract.
 * Can later be replaced with data returned from your API.
 */
export type Shop = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  products: number;
  city: string;
  href: string;
  cover?: string;
  logo?: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
};

/** Temporary shop data */
export const SHOPS: Shop[] = [
  {
    id: 1,
    name: "Green Mart",
    rating: 4.8,
    reviews: 1200,
    products: 1200,
    city: "Colombo",
    href: "/shops/green-mart",
    icon: ShoppingBag,
    gradient: "from-fuchsia-500 via-orange-400 to-yellow-300",
    accent: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Tech World",
    rating: 4.7,
    reviews: 990,
    products: 990,
    city: "Kandy",
    href: "/shops/tech-world",
    icon: Store,
    gradient: "from-slate-900 via-slate-700 to-orange-500",
    accent: "bg-orange-500",
  },
  {
    id: 3,
    name: "Beauty Hub",
    rating: 4.8,
    reviews: 1500,
    products: 1500,
    city: "Colombo",
    href: "/shops/beauty-hub",
    icon: Sparkles,
    gradient: "from-pink-400 via-rose-300 to-purple-400",
    accent: "bg-stone-900",
  },
  {
    id: 4,
    name: "Daily Needs",
    rating: 4.6,
    reviews: 870,
    products: 180,
    city: "Colombo",
    href: "/shops/daily-needs",
    icon: Smartphone,
    gradient: "from-sky-400 via-cyan-300 to-teal-300",
    accent: "bg-indigo-950",
  },
  {
    id: 5,
    name: "Keels",
    rating: 4.8,
    reviews: 1200,
    products: 1200,
    city: "Colombo",
    href: "/shops/keels",
    icon: ShoppingCart,
    gradient: "from-green-600 via-green-500 to-sky-400",
    accent: "bg-green-500",
  },
];

