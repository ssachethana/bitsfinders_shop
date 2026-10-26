import { ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "@/app/components/marketplace/mCommon/mainNavigation/nav.config"

type Props = {
  open: boolean;
  active: string;
  onSelect: (label: string) => void;
  onClose: () => void;
};

/** Rendered inside <header>; the backdrop sits behind the bar via -z-10. */
export default function MobileMenu({ open, active, onSelect, onClose }: Props) {
  return (
    <div
      id="mobile-menu"
      className={`md:hidden ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute inset-x-0 top-full origin-top overflow-y-auto bg-[#141414] transition-all duration-300 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 p-4">
          {NAV_ITEMS.map(({ label, href, icon: Icon, badge }, i) => (
            <li
              key={label}
              className="nav-anim"
              style={
                open
                  ? { animation: `nav-drop .4s ${i * 60 + 80}ms both ease-out` }
                  : undefined
              }
            >
              <a
                href={href}
                onClick={() => {
                  onSelect(label);
                  onClose();
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition active:scale-[.98] ${
                  active === label
                    ? "bg-white/10 text-white"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-red-400">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  {label}
                  {badge && (
                    <span className="rounded bg-red-500 px-1.5 py-px text-[10px] font-semibold text-white">
                      {badge}
                    </span>
                  )}
                </span>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
