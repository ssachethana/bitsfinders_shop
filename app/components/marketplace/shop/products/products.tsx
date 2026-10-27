'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpDown,
  Check,
  ChevronDown,
  Clock,
  Heart,
  Info,
  Minus,
  MessageCircle,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  ThumbsUp,
  Truck,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type ArtKind = "carton" | "bag" | "bottle" | "pouch" | "packet" | "oil";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  art: ArtKind;
  /** Optional real product photo. Falls back to the illustrated pack. */
  image?: string;
  colors: [string, string];
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Fresh Milk 1L", category: "Dairy", price: 450, rating: 4.8, reviews: 320, inStock: true, art: "carton", colors: ["#3b82f6", "#dbeafe"] },
  { id: 2, name: "Basmati Rice 5kg", category: "Grocery", price: 2850, rating: 4.9, reviews: 280, inStock: true, art: "bag", colors: ["#16a34a", "#fde68a"] },
  { id: 3, name: "Dishwash Liquid 750ml", category: "Household", price: 620, rating: 4.7, reviews: 410, inStock: true, art: "bottle", colors: ["#facc15", "#fef08a"] },
  { id: 4, name: "Tea Pack 400g", category: "Beverages", price: 1250, rating: 4.8, reviews: 350, inStock: true, art: "pouch", colors: ["#f59e0b", "#fef3c7"] },
  { id: 5, name: "Biscuit Family Pack", category: "Snacks", price: 380, rating: 4.6, reviews: 220, inStock: true, art: "packet", colors: ["#dc2626", "#fecaca"] },
  { id: 6, name: "Cooking Oil 1L", category: "Grocery", price: 890, rating: 4.8, reviews: 480, inStock: true, art: "oil", colors: ["#eab308", "#fef9c3"] },
];

const CATEGORIES = ["All Categories", "Dairy", "Grocery", "Household", "Beverages", "Snacks"];

const PRICE_RANGES = [
  { label: "Price Range", test: () => true },
  { label: "Under Rs. 500", test: (p: number) => p < 500 },
  { label: "Rs. 500 – 1,000", test: (p: number) => p >= 500 && p <= 1000 },
  { label: "Over Rs. 1,000", test: (p: number) => p > 1000 },
];

const SORTS = ["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated"];

const FEEDBACK = [
  { name: "Sanduni Perera", when: "2 days ago", initials: "SP", hue: "from-rose-400 to-orange-400", helpful: 12, text: "Great quality products and very fast delivery. I always shop from Green Mart. Highly recommended!" },
  { name: "Kasun Silva", when: "5 days ago", initials: "KS", hue: "from-sky-400 to-indigo-500", helpful: 8, text: "Good prices and wide range of items. The delivery was on time. Keep it up!" },
  { name: "Nimali Fernando", when: "1 week ago", initials: "NF", hue: "from-emerald-400 to-teal-500", helpful: 15, text: "Very convenient and easy to order. Fresh products and excellent service." },
];

const rs = (n: number) => `Rs. ${n.toLocaleString("en-US")}`;

/* -------------------------------------------------------------------------- */
/*  Small hooks / helpers                                                     */
/* -------------------------------------------------------------------------- */

/** Reveals an element once it scrolls into view. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // Must start identical on server and client (no window/IntersectionObserver checks here),
  // otherwise React reports a hydration mismatch.
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Without IntersectionObserver (old browsers) show content immediately.
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(value) ? "fill-orange-400 text-orange-400" : "text-slate-300"} />
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Illustrated product packs (original artwork, no brand marks)              */
/* -------------------------------------------------------------------------- */

function ProductArt({ kind, colors }: { kind: ArtKind; colors: [string, string] }) {
  const [c1, c2] = colors;
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_10px_8px_rgba(15,23,42,0.18)]" role="img" aria-hidden>
      {kind === "carton" && (
        <>
          <path d="M40 26 L60 14 L80 26 V104 H40 Z" fill={c2} />
          <path d="M40 26 L60 14 L80 26 L60 36 Z" fill="#fff" />
          <rect x="40" y="50" width="40" height="30" fill={c1} />
          <circle cx="60" cy="65" r="9" fill="#fff" opacity=".9" />
          <path d="M55 65 q5 -9 10 0 q-5 8 -10 0" fill={c1} />
          <rect x="40" y="86" width="40" height="18" fill={c1} opacity=".25" />
        </>
      )}
      {kind === "bag" && (
        <>
          <path d="M28 22 H92 L98 104 H22 Z" fill={c1} />
          <path d="M28 22 H92 L90 30 H30 Z" fill="#fff" opacity=".35" />
          <ellipse cx="60" cy="66" rx="26" ry="20" fill={c2} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} cx={46 + i * 6} cy={64 + (i % 2) * 6} rx="2.2" ry="5" fill="#fff" transform={`rotate(${i * 20 - 40} ${46 + i * 6} ${64})`} />
          ))}
          <rect x="34" y="40" width="52" height="9" rx="4" fill="#fff" opacity=".9" />
        </>
      )}
      {kind === "bottle" && (
        <>
          <rect x="52" y="10" width="16" height="12" rx="3" fill="#475569" />
          <path d="M52 22 H68 L70 34 Q88 44 88 64 V100 Q88 108 80 108 H40 Q32 108 32 100 V64 Q32 44 50 34 Z" fill={c1} />
          <rect x="34" y="62" width="52" height="32" fill="#fff" opacity=".85" />
          <circle cx="60" cy="78" r="9" fill={c1} />
          <path d="M44 38 Q36 50 38 70" stroke="#fff" strokeWidth="3" opacity=".5" fill="none" strokeLinecap="round" />
        </>
      )}
      {kind === "pouch" && (
        <>
          <path d="M26 18 Q60 10 94 18 L98 102 Q60 110 22 102 Z" fill={c1} />
          <path d="M26 18 Q60 10 94 18 L95 26 Q60 18 25 26 Z" fill="#fff" opacity=".4" />
          <circle cx="60" cy="62" r="24" fill="#fff" opacity=".92" />
          <path d="M44 62 Q60 40 76 62 Q60 82 44 62" fill={c1} opacity=".9" />
          <circle cx="60" cy="62" r="6" fill={c2} />
        </>
      )}
      {kind === "packet" && (
        <>
          <path d="M16 30 Q60 20 104 30 L100 94 Q60 104 20 94 Z" fill={c1} />
          <ellipse cx="60" cy="62" rx="30" ry="22" fill={c2} />
          <circle cx="50" cy="58" r="12" fill="#f5c26b" />
          <circle cx="70" cy="66" r="12" fill="#f0b24f" />
          {[[46, 55], [53, 60], [66, 62], [72, 69]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.4" fill="#b7791f" />
          ))}
          <rect x="30" y="34" width="60" height="8" rx="4" fill="#fff" opacity=".9" />
        </>
      )}
      {kind === "oil" && (
        <>
          <rect x="50" y="8" width="20" height="10" rx="3" fill="#dc2626" />
          <path d="M50 18 H70 L74 30 Q92 38 92 58 V100 Q92 108 84 108 H36 Q28 108 28 100 V58 Q28 38 46 30 Z" fill={c1} opacity=".9" />
          <path d="M92 50 V70 Q108 70 108 60 Q108 50 92 50" fill="none" stroke={c1} strokeWidth="5" />
          <rect x="30" y="58" width="60" height="34" fill="#fff" opacity=".9" />
          <path d="M60 64 q10 12 0 22 q-10 -10 0 -22" fill={c1} />
          <path d="M42 36 Q34 48 34 66" stroke="#fff" strokeWidth="3" opacity=".6" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Select with custom chevron                                                */
/* -------------------------------------------------------------------------- */

function Select({
  value,
  onChange,
  options,
  icon,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon?: ReactNode;
  label: string;
}) {
  return (
    <label className="group relative block">
      <span className="sr-only">{label}</span>
      {icon && <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-orange-500">{icon}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 w-full cursor-pointer appearance-none rounded-xl sm:h-11 border border-slate-200 bg-white/80 pr-9 text-sm font-medium text-slate-700 shadow-sm outline-none backdrop-blur transition hover:border-orange-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 ${
          icon ? "pl-9" : "pl-3.5"
        }`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-transform group-focus-within:rotate-180 group-focus-within:text-orange-500" />
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*  Product card                                                              */
/* -------------------------------------------------------------------------- */

function ProductCard({
  product,
  index,
  qty,
  liked,
  onAdd,
  onChangeQty,
  onLike,
}: {
  product: Product;
  index: number;
  qty: number;
  liked: boolean;
  onAdd: (p: Product) => void;
  onChangeQty: (id: number, d: number) => void;
  onLike: (id: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [burst, setBurst] = useState(0);
  const [ripple, setRipple] = useState<{ x: number; y: number; k: number } | null>(null);

  // Gentle 3D tilt for mouse users only.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
    cardRef.current.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
    cardRef.current.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    cardRef.current.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => {
    cardRef.current?.style.setProperty("--rx", "0deg");
    cardRef.current?.style.setProperty("--ry", "0deg");
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, k: Date.now() });
    setBurst((b) => b + 1);
    onAdd(product);
  };

  return (
    <Reveal delay={(index % 3) * 90}>
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={
          {
            transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          } as CSSProperties
        }
        className="group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out will-change-transform hover:border-orange-200 hover:shadow-xl hover:shadow-orange-200/40 sm:p-3"
      >
        {/* spotlight following the cursor */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(251,146,60,.10), transparent 60%)" }}
        />

        {/* image */}
        <div className="relative aspect-square overflow-hidden sm:aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-50 via-white to-orange-50">
          <span aria-hidden className="gm-blob absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-60 blur-2xl" style={{ background: product.colors[1] }} />
          <span aria-hidden className="absolute inset-x-0 bottom-3 mx-auto h-3 w-1/2 rounded-full bg-slate-900/10 blur-md transition-all duration-500 group-hover:w-2/5 group-hover:opacity-60" />
          <div className="relative flex h-full items-center justify-center p-3 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:-rotate-3">
            {product.image ? (
              <img src={product.image} alt={product.name} loading="lazy" className="h-full w-auto object-contain drop-shadow-xl" />
            ) : (
              <div className="h-full aspect-square">
                <ProductArt kind={product.art} colors={product.colors} />
              </div>
            )}
          </div>
          {/* shine sweep */}
          <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover:animate-[gm-shine_0.9s_ease-out] motion-reduce:hidden" />

          {/* like */}
          <button
            onClick={() => onLike(product.id)}
            aria-pressed={liked}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur transition hover:scale-110 hover:text-rose-500 active:scale-90"
          >
            <Heart size={16} key={String(liked)} className={liked ? "animate-[gm-pop_0.4s_ease-out] fill-rose-500 text-rose-500" : ""} />
          </button>

          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 backdrop-blur">
            {product.category}
          </span>
        </div>

        {/* info */}
        <div className="relative mt-3 flex flex-1 flex-col px-0.5">
          <h3 className="text-sm font-semibold leading-snug text-slate-800 sm:text-[15px]">{product.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <Star size={13} className="fill-orange-400 text-orange-400" />
            <span className="font-semibold text-slate-700">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
          <p className="mt-1.5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">{rs(product.price)}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </span>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* add to cart / stepper */}
          <div className="mt-3">
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className="relative flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-sm font-semibold text-white shadow-md shadow-orange-300/50 transition hover:from-orange-600 hover:to-orange-500 hover:shadow-lg active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {ripple && (
                  <span
                    key={ripple.k}
                    aria-hidden
                    className="pointer-events-none absolute h-4 w-4 animate-[gm-ripple_0.6s_ease-out_forwards] rounded-full bg-white/60"
                    style={{ left: ripple.x - 8, top: ripple.y - 8 }}
                  />
                )}
                <ShoppingCart size={16} className="transition-transform group-hover:-translate-x-0.5" />
                Add to Cart
              </button>
            ) : (
              <div
                key={burst}
                className="flex h-10 w-full animate-[gm-pop_0.35s_ease-out] items-center justify-between rounded-lg border border-orange-300 bg-orange-50 px-1"
              >
                <button onClick={() => onChangeQty(product.id, -1)} aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center rounded-md text-orange-600 transition hover:bg-orange-100 active:scale-90">
                  <Minus size={16} />
                </button>
                <span className="flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-orange-700">
                  <Check size={14} /> {qty}<span className="hidden min-[420px]:inline"> in cart</span>
                </span>
                <button onClick={() => onChangeQty(product.id, 1)} aria-label="Increase quantity" className="grid h-8 w-8 place-items-center rounded-md text-orange-600 transition hover:bg-orange-100 active:scale-90">
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function GreenMartShop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [priceLabel, setPriceLabel] = useState(PRICE_RANGES[0].label);
  const [sort, setSort] = useState(SORTS[0]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [helpful, setHelpful] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const products = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.label === priceLabel) ?? PRICE_RANGES[0];
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter(
      (p) =>
        (category === CATEGORIES[0] || p.category === category) &&
        range.test(p.price) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)),
    );
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, priceLabel, sort]);

  const flash = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
    flash(`${p.name} added to cart`);
  };
  const changeQty = (id: number, d: number) =>
    setCart((c) => {
      const n = (c[id] ?? 0) + d;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
  const toggle = (set: Set<number>, id: number) => {
    const n = new Set(set);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = PRODUCTS.reduce((s, p) => s + (cart[p.id] ?? 0) * p.price, 0);
  const hasFilters = query || category !== CATEGORIES[0] || priceLabel !== PRICE_RANGES[0].label || sort !== SORTS[0];
  const reset = () => {
    setQuery("");
    setCategory(CATEGORIES[0]);
    setPriceLabel(PRICE_RANGES[0].label);
    setSort(SORTS[0]);
  };

  return (
    <div className="relative min-w-0 flex-1 font-sans text-slate-800 antialiased">
      {/* keyframes (self-contained: no tailwind.config changes needed) */}
      <style>{`
        @keyframes gm-float { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(30px,-24px,0) scale(1.12) } }
        @keyframes gm-shine { from { left: -50%; opacity: 1 } to { left: 130%; opacity: 1 } }
        @keyframes gm-pop { 0% { transform: scale(.85) } 60% { transform: scale(1.12) } 100% { transform: scale(1) } }
        @keyframes gm-ripple { to { transform: scale(30); opacity: 0 } }
        @keyframes gm-toast { from { opacity: 0; transform: translate(-50%, 16px) scale(.96) } to { opacity: 1; transform: translate(-50%, 0) scale(1) } }
        @keyframes gm-gradient { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes gm-wiggle { 0%,100% { transform: rotate(0) } 25% { transform: rotate(-10deg) } 75% { transform: rotate(10deg) } }
        .gm-blob { animation: gm-float 9s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .gm-blob, [class*="animate-"] { animation: none !important } }
      `}</style>

      {/* ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="gm-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="gm-blob absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl [animation-delay:-3s]" />
        <div className="gm-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <main className="relative z-10 w-full pb-28">
        {/* ------------------------------ toolbar ------------------------------ */}
        <div
          className={`z-30 rounded-2xl sm:sticky sm:top-24 border bg-white/70 p-2.5 backdrop-blur-xl transition-all duration-300 sm:p-3 ${
            scrolled ? "border-orange-200 shadow-lg shadow-orange-200/30" : "border-slate-200 shadow-sm"
          }`}
        >
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <label className="group relative block col-span-2 lg:col-span-1">
              <span className="sr-only">Search in this shop</span>
              <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-orange-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search in this shop..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 sm:h-11 pl-10 pr-9 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-orange-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </label>
            <Select label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
            <Select label="Price range" value={priceLabel} onChange={setPriceLabel} options={PRICE_RANGES.map((r) => r.label)} />
            <div className="col-span-2 lg:col-span-1">
              <Select label="Sort by" value={sort} onChange={setSort} options={SORTS} icon={<ArrowUpDown size={16} />} />
            </div>
          </div>
        </div>

        {/* result bar */}
        <div className="mt-4 flex items-center justify-between gap-3 px-1 text-sm text-slate-500">
          <p className="flex items-center gap-1.5">
            <Sparkles size={15} className="text-orange-500" />
            <span>
              <b className="text-slate-700">{products.length}</b> {products.length === 1 ? "product" : "products"}
            </span>
          </p>
          <p className="hidden items-center gap-1.5 sm:flex">
            <Truck size={15} className="text-orange-500" /> Fast delivery across Colombo
          </p>
          {hasFilters && (
            <button onClick={reset} className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 transition hover:bg-orange-100 active:scale-95">
              <X size={12} /> Reset
            </button>
          )}
        </div>

        {/* ------------------------------ products ------------------------------ */}
        {products.length > 0 ? (
          <section aria-label="Products" className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                qty={cart[p.id] ?? 0}
                liked={liked.has(p.id)}
                onAdd={addToCart}
                onChangeQty={changeQty}
                onLike={(id) => setLiked((s) => toggle(s, id))}
              />
            ))}
          </section>
        ) : (
          <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <Search size={32} className="mb-3 text-slate-400" />
            <p className="font-semibold text-slate-700">Nothing matches your filters</p>
            <p className="mt-1 text-sm text-slate-500">Try a different keyword or reset the filters.</p>
            <button onClick={reset} className="mt-4 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-300/50 transition hover:bg-orange-600 active:scale-95">
              Reset filters
            </button>
          </div>
        )}

        {/* ------------------------------ feedback ------------------------------ */}
        <Reveal className="mt-6 sm:mt-8">
          <section aria-labelledby="feedback" className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 id="feedback" className="flex items-center gap-2 text-base font-bold text-slate-800 sm:text-lg">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-100 text-orange-500">
                  <MessageCircle size={17} />
                </span>
                Customer Feedback
              </h2>
              <a href="#" className="group inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 sm:text-sm">
                View all reviews
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
              {FEEDBACK.map((f, i) => {
                const on = helpful.has(i);
                return (
                  <article
                    key={f.name}
                    className="group w-[82%] shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-3.5 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100 sm:w-[60%] md:w-auto"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${f.hue} text-sm font-bold text-white shadow-md ring-2 ring-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                        {f.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">{f.name}</p>
                        <p className="text-xs text-slate-500">{f.when}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Stars value={5} size={15} />
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{f.text}</p>
                    <button
                      onClick={() => setHelpful((s) => toggle(s, i))}
                      aria-pressed={on}
                      className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition active:scale-90 ${
                        on ? "bg-orange-100 text-orange-700" : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <ThumbsUp size={14} className={on ? "animate-[gm-wiggle_0.5s_ease-in-out] fill-orange-200" : ""} />
                      Helpful ({f.helpful + (on ? 1 : 0)})
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* ------------------------------ about ------------------------------ */}
        <Reveal className="mt-4 sm:mt-5" delay={80}>
          <section aria-labelledby="about" className="grid gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3.5 shadow-sm backdrop-blur sm:p-4 lg:grid-cols-[1.6fr_1fr_1fr]">
            <div>
              <h2 id="about" className="flex items-center gap-2 text-base font-bold text-slate-800 sm:text-lg">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-100 text-orange-500">
                  <Info size={17} />
                </span>
                About Green Mart
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                Green Mart is your trusted neighborhood store delivering high-quality fresh products, groceries, beverages, household supplies, and personal care items directly to your doorstep across Colombo and surrounding areas. Freshness, quality and customer satisfaction are our top priorities.
              </p>
            </div>

            {[
              { icon: <Clock size={20} />, title: "Opening Hours", body: "8:00 AM - 10:00 PM (Everyday)" },
              { icon: <Phone size={20} />, title: "Contact Support", body: "+94 011 234 5678", href: "tel:+94112345678" },
            ].map((c) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-500 transition-all duration-300 group-hover:rotate-6 group-hover:bg-orange-500 group-hover:text-white">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-800">{c.title}</span>
                    <span className="block text-xs text-slate-500">{c.body}</span>
                  </span>
                </>
              );
              const cls = "group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-white hover:shadow-md";
              return c.href ? (
                <a key={c.title} href={c.href} className={cls}>{inner}</a>
              ) : (
                <div key={c.title} className={cls}>{inner}</div>
              );
            })}
          </section>
        </Reveal>
      </main>

      {/* ------------------------------ floating cart ------------------------------ */}
      <button
        aria-label={`Cart, ${cartCount} items`}
        className={`fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-full bg-slate-900 py-2.5 pl-3 pr-4 text-white shadow-2xl shadow-slate-900/30 transition-all duration-500 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 ${
          cartCount ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400">
          <ShoppingCart size={18} />
          <span key={cartCount} className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 animate-[gm-pop_0.35s_ease-out] place-items-center rounded-full bg-white px-1 text-[11px] font-bold text-slate-900">
            {cartCount}
          </span>
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wider text-slate-400">Total</span>
          <span className="block text-sm font-bold">{rs(cartTotal)}</span>
        </span>
      </button>

      {/* toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 flex max-w-[90vw] -translate-x-1/2 animate-[gm-toast_0.3s_ease-out] items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-xl sm:bottom-8"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500">
            <Check size={12} />
          </span>
          <span className="truncate">{toast}</span>
        </div>
      )}
    </div>
  );
}