
import {
  BadgePercent,
  RotateCcw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * Defines the structure of an individual feature.
 *
 * Exported because FeatureCard also needs this type.
 */
export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  hover: string;
};

/**
 * Feature content.
 *
 * To add another feature, simply add a new object.
 * No changes to the card component are required.
 */
export const features: Feature[] = [
  {
    icon: BadgePercent,
    title: "Best Prices",
    description: "We offer best prices on all products",
    hover: "group-hover:rotate-[-12deg] group-hover:scale-110",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7 day easy return policy",
    hover: "group-hover:-rotate-180",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure payment gateway",
    hover: "group-hover:scale-125",
  },
];
