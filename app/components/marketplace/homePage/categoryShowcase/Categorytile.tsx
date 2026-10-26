import type { Category } from "@/app/components/marketplace/homePage/categoryShowcase/Categories";

type CategoryTileProps = {
  category: Category;
  /** Position in the list; drives the staggered reveal delay */
  index: number;
  visible: boolean;
  isActive: boolean;
  onSelect: (name: string) => void;
};

const STAGGER_MS = 70;

export default function CategoryTile({
  category,
  index,
  visible,
  isActive,
  onSelect,
}: CategoryTileProps) {
  const { name, href, icon: Icon, tile, glow, ink } = category;

  return (
    <li
      className={`shrink-0 snap-start sm:shrink ${visible ? "sbc-rise" : "opacity-0"}`}
      style={{ animationDelay: `${index * STAGGER_MS}ms` }}
    >
      <a
        href={href}
        onClick={() => onSelect(name)}
        className="sbc-tile group flex w-[76px] flex-col items-center gap-2.5 rounded-2xl p-1 outline-none sm:w-full focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <span
          className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-md ring-1 ring-black/5 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:rotate-3 group-hover:scale-110 group-active:scale-95 sm:h-[72px] sm:w-[72px] ${tile} ${
            isActive ? "ring-2 ring-amber-500 ring-offset-2" : ""
          }`}
          style={{ ["--glow" as string]: glow }}
        >
          {/* hover glow */}
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ boxShadow: `0 12px 28px -6px rgba(${glow},.6)` }}
          />
          {/* gloss highlight */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
          {/* shine sweep */}
          <span className="sbc-shine pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-white/60 blur-sm" />
          <Icon
            className={`sbc-icon relative h-8 w-8 drop-shadow-sm sm:h-9 sm:w-9 ${ink}`}
            strokeWidth={1.8}
          />
        </span>

        <span className="relative text-center text-xs font-bold leading-tight text-gray-900 sm:text-[13px]">
          {name}
          <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-amber-500 transition-all duration-300 group-hover:w-full" />
        </span>
      </a>
    </li>
  );
}