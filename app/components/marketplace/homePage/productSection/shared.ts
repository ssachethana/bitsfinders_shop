/* Shared types, mock data, helpers and CSS for the Flash Deals feature. */

export interface Deal {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  /** Discount percentage, e.g. 59 for -59% */
  discount: number;
  seller: string;
  /** 0 – 5 */
  rating: number;
  reviews: number;
  /** Optional product image URL. Falls back to an icon tile. */
  image?: string;
}

/** Placeholder data – replace with your API response. */
export const MOCK_DEALS: Deal[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "boAt Rockerz 450 Wireless Headphones",
  price: 1637.85,
  oldPrice: 5999.0,
  discount: 59,
  seller: "Tech World",
  rating: 5,
  reviews: 125,
}));

export const formatPrice = (n: number) =>
  n.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Keyframes + helper classes used by the Flash Deals feature (Tailwind can't express these inline). */
export const FLASH_DEALS_CSS = `
  @keyframes fd-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
  @keyframes fd-pop   { 0% { transform: scale(.3) } 60% { transform: scale(1.35) } 100% { transform: scale(1) } }
  @keyframes fd-tick  { from { transform: translateY(-40%); opacity: 0 } to { transform: none; opacity: 1 } }
  @keyframes fd-bolt  { 0%,100% { transform: scale(1) rotate(0); filter: drop-shadow(0 0 0 rgba(251,146,60,0)) }
                        50% { transform: scale(1.18) rotate(-8deg); filter: drop-shadow(0 0 8px rgba(251,146,60,.9)) } }
  @keyframes fd-sheen { 0% { transform: translateX(-120%) } 60%,100% { transform: translateX(220%) } }
  .fd-float { animation: fd-float 3.6s ease-in-out infinite }
  .fd-pop   { animation: fd-pop .4s cubic-bezier(.34,1.56,.64,1) }
  .fd-tick  { animation: fd-tick .3s ease-out }
  .fd-bolt  { animation: fd-bolt 1.8s ease-in-out infinite }
  .fd-shine::after { content:""; position:absolute; inset:0; width:50%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,.7), transparent);
    animation: fd-sheen 2.8s ease-in-out infinite }
  @media (prefers-reduced-motion: reduce) {
    .fd-float,.fd-pop,.fd-tick,.fd-bolt,.fd-shine::after { animation: none !important }
  }
`;
