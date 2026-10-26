import { Menu, Search, ShoppingBag, X } from "lucide-react";

type Props = {
  cartCount: number;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

const iconBtn =
  "relative grid h-9 w-9 place-items-center rounded-full text-zinc-300 transition hover:bg-white/10 hover:text-white active:scale-90";

export function Brand() {
  return (
    <a href="#" className="flex items-center gap-2 text-white" aria-label="Home">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-red-500 to-orange-400 shadow-lg shadow-red-500/30 transition-transform duration-300 hover:rotate-12 hover:scale-110">
        <ShoppingBag className="h-4 w-4" />
      </span>
      <span className="hidden text-lg font-semibold tracking-tight sm:block">
        Shopi<span className="text-red-400">fy</span>
      </span>
    </a>
  );
}

export default function NavActions({ cartCount, menuOpen, onToggleMenu }: Props) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button aria-label="Search" className={iconBtn}>
        <Search className="h-[18px] w-[18px]" />
      </button>

      <button aria-label={`Cart, ${cartCount} items`} className={iconBtn}>
        <ShoppingBag className="h-[18px] w-[18px]" />
        {cartCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </button>

      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={onToggleMenu}
        className={`${iconBtn} text-white md:hidden`}
      >
        <Menu
          className={`absolute h-5 w-5 transition-all duration-300 ${
            menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100"
          }`}
        />
        <X
          className={`absolute h-5 w-5 transition-all duration-300 ${
            menuOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </button>
    </div>
  );
}
