"use client"
import { useEffect, useState, type ComponentType } from "react";
import {
  ChevronRight,
  CookingPot,
  Cookie,
  House,
  ListFilter,
  Milk,
  RotateCcw,
  ShieldCheck,
  ShieldHalf,
  ShoppingBasket,
  SprayCan,
  Truck,
  X,
  SlidersHorizontal,
  type LucideProps,
} from "lucide-react";

type Icon = ComponentType<LucideProps>;

type Category = {
  id: string;
  name: string;
  count: number;
  icon: Icon;
  /** tile bg + icon colour + hover glow */
  tile: string;
  glow: string;
};

type Highlight = {
  title: string;
  sub: string;
  icon: Icon;
  card: string;
  iconColor: string;
};

const CATEGORIES: Category[] = [
  { id: "groceries", name: "Groceries", count: 320, icon: ShoppingBasket, tile: "bg-emerald-100 text-emerald-700", glow: "hover:shadow-emerald-200/70" },
  { id: "beverages", name: "Beverages", count: 180, icon: Milk, tile: "bg-blue-100 text-blue-600", glow: "hover:shadow-blue-200/70" },
  { id: "snacks", name: "Snacks", count: 220, icon: Cookie, tile: "bg-amber-100 text-amber-600", glow: "hover:shadow-amber-200/70" },
  { id: "household", name: "Household", count: 160, icon: House, tile: "bg-violet-100 text-violet-600", glow: "hover:shadow-violet-200/70" },
  { id: "personal", name: "Personal Care", count: 120, icon: SprayCan, tile: "bg-pink-100 text-pink-600", glow: "hover:shadow-pink-200/70" },
  { id: "kitchenware", name: "Kitchenware", count: 100, icon: CookingPot, tile: "bg-sky-100 text-slate-700", glow: "hover:shadow-sky-200/70" },
];

const HIGHLIGHTS: Highlight[] = [
  { title: "Free Delivery", sub: "On orders over Rs. 5,000", icon: Truck, card: "bg-emerald-50 hover:bg-emerald-100/70", iconColor: "text-emerald-700" },
  { title: "Secure Payments", sub: "100% safe & trusted", icon: ShieldCheck, card: "bg-blue-50 hover:bg-blue-100/70", iconColor: "text-blue-600" },
  { title: "Easy Returns", sub: "Hassle-free return policy", icon: RotateCcw, card: "bg-orange-50 hover:bg-orange-100/70", iconColor: "text-orange-500" },
];

const CSS = `
@keyframes ss-rise { from { opacity:0; transform: translateY(14px) scale(.98);} to {opacity:1; transform:none;} }
@keyframes ss-sheen { 0% { transform: translateX(-120%) skewX(-20deg);} 100% { transform: translateX(320%) skewX(-20deg);} }
@keyframes ss-float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-3px);} }
@keyframes ss-pulse-ring { 0% { box-shadow:0 0 0 0 rgba(249,115,22,.45);} 100% { box-shadow:0 0 0 14px rgba(249,115,22,0);} }
.ss-rise { animation: ss-rise .55s cubic-bezier(.2,.8,.2,1) both; }
.ss-float { animation: ss-float 3.2s ease-in-out infinite; }
.ss-ring { animation: ss-pulse-ring 2s ease-out infinite; }
.ss-sheen::after { content:""; position:absolute; inset:0; width:35%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent); transform: translateX(-120%) skewX(-20deg); pointer-events:none; }
.group:hover > .ss-sheen::after, .ss-sheen:hover::after { animation: ss-sheen .9s ease; }
@media (prefers-reduced-motion: reduce) { .ss-rise,.ss-float,.ss-ring,.ss-sheen::after { animation:none !important; } }
`;

function Panel({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <section
      className="ss-rise rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_24px_-8px_rgba(15,23,42,.12)] sm:p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

function SidebarContent({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: (id: string | null) => void;
}) {
  const [spin, setSpin] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* ───────── Shop Categories ───────── */}
      <Panel>
        <header className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            <ListFilter className="h-5 w-5 text-orange-500" />
            Shop Categories
          </h2>
          <button
            onClick={() => {
              setSelected(null);
              setSpin((s) => s + 1);
            }}
            className={`group inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-orange-600 transition hover:bg-orange-50 active:scale-95 ${
              selected ? "opacity-100" : "opacity-70"
            }`}
          >
            <RotateCcw
              key={spin}
              className="h-3 w-3 transition-transform duration-500 group-hover:-rotate-180"
            />
            Reset
          </button>
        </header>

        <ul className="flex flex-col gap-1">
          {CATEGORIES.map((c, i) => {
            const active = selected === c.id;
            const I = c.icon;
            return (
              <li key={c.id} className="ss-rise" style={{ animationDelay: `${120 + i * 70}ms` }}>
                <button
                  onClick={() => setSelected(active ? null : c.id)}
                  aria-pressed={active}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl p-2 text-left shadow-none transition-all duration-300 hover:translate-x-1 hover:bg-slate-50 hover:shadow-lg ${c.glow} ${
                    active ? "bg-orange-50 ring-1 ring-orange-200" : ""
                  }`}
                >
                  {/* active indicator bar */}
                  <span
                    className={`absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-orange-500 transition-all duration-300 ${
                      active ? "h-7 opacity-100" : "h-0 opacity-0"
                    }`}
                  />
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12 ${c.tile}`}
                  >
                    <I className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">
                    {c.name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums transition-colors ${
                      active ? "bg-orange-500 text-white" : "text-slate-500 group-hover:bg-white"
                    }`}
                  >
                    {c.count}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-orange-500 ${
                      active ? "rotate-90 text-orange-500" : ""
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>

      {/* ───────── Shop Highlights ───────── */}
      <Panel delay={200}>
        <header className="mb-4 flex items-center gap-2">
          <ShieldHalf className="ss-float h-5 w-5 text-orange-500" />
          <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            Shop Highlights
          </h2>
        </header>

        <div className="flex flex-col gap-2.5">
          {HIGHLIGHTS.map((h, i) => {
            const I = h.icon;
            return (
              <div
                key={h.title}
                className={`ss-rise ss-sheen group relative flex items-center gap-3 overflow-hidden rounded-xl px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${h.card}`}
                style={{ animationDelay: `${450 + i * 100}ms` }}
              >
                <I
                  className={`h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${h.iconColor}`}
                  strokeWidth={1.7}
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">{h.title}</p>
                  <p className="truncate text-xs text-slate-500">{h.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

export default function ShopSidebar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // close drawer with Esc + lock body scroll while open (mobile)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <style>{CSS}</style>

      {/* Desktop / large tablet: sticky sidebar */}
      <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-72 shrink-0 self-start overflow-y-auto overscroll-contain pr-1 lg:block xl:w-80 [scrollbar-width:thin]">
        <SidebarContent selected={selected} setSelected={setSelected} />
      </aside>

      {/* Mobile / tablet: floating button + slide-over drawer */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open shop categories"
          className="ss-ring fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-orange-500/30 transition active:scale-95 hover:bg-orange-600"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Categories
        </button>

        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          className={`fixed inset-y-0 left-0 z-50 w-[88%] max-w-sm overflow-y-auto bg-slate-50 p-3 pt-4 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] sm:p-4 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="mb-3 ml-auto grid h-9 w-9 place-items-center rounded-full bg-white text-slate-600 shadow transition hover:rotate-90 hover:text-orange-500 active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
          {open && <SidebarContent selected={selected} setSelected={setSelected} />}
        </aside>
      </div>
    </>
  );
}