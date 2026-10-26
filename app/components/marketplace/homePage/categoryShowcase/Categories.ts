import {
  Armchair,
  BookOpen,
  Car,
  Dumbbell,
  Pill,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  ToyBrick,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  name: string;
  href: string;
  icon: LucideIcon;
  /** tile gradient */
  tile: string;
  /** glow colour on hover (rgb triplet) */
  glow: string;
  /** icon colour */
  ink: string;
};

export const CATEGORIES: Category[] = [
  { name: "Grocery", href: "/category/grocery", icon: ShoppingBasket, tile: "from-green-200 to-emerald-300", glow: "52,211,153", ink: "text-emerald-700" },
  { name: "Pharmacy", href: "/category/pharmacy", icon: Pill, tile: "from-sky-200 to-cyan-300", glow: "34,211,238", ink: "text-sky-700" },
  { name: "Electronics", href: "/category/electronics", icon: Smartphone, tile: "from-indigo-200 to-blue-300", glow: "99,102,241", ink: "text-indigo-700" },
  { name: "Home & Living", href: "/category/home-living", icon: Armchair, tile: "from-purple-300 to-amber-200", glow: "168,85,247", ink: "text-purple-700" },
  { name: "Beauty", href: "/category/beauty", icon: Sparkles, tile: "from-fuchsia-200 to-pink-300", glow: "217,70,239", ink: "text-fuchsia-700" },
  { name: "Sports", href: "/category/sports", icon: Dumbbell, tile: "from-zinc-100 to-zinc-300", glow: "113,113,122", ink: "text-zinc-800" },
  { name: "Automotive", href: "/category/automotive", icon: Car, tile: "from-yellow-200 to-orange-300", glow: "251,191,36", ink: "text-amber-700" },
  { name: "Books", href: "/category/books", icon: BookOpen, tile: "from-cyan-200 to-blue-400", glow: "56,189,248", ink: "text-blue-800" },
  { name: "Baby & Toys", href: "/category/baby-toys", icon: ToyBrick, tile: "from-rose-300 to-red-300", glow: "251,113,133", ink: "text-rose-700" },
  { name: "Fashion", href: "/category/fashion", icon: Shirt, tile: "from-red-300 to-rose-200", glow: "248,113,113", ink: "text-red-700" },
];