import { NAV_ITEMS, type NavItem } from "@/app/components/marketplace/mCommon/mainNavigation/nav.config";

type Props = {
  active: string;
  onSelect: (label: string) => void;
};

function HotBadge({ text }: { text: string }) {
  return (
    <span className="relative ml-0.5">
      <span className="nav-anim absolute inset-0 rounded bg-red-500 [animation:nav-ping_1.6s_ease-out_infinite]" />
      <span className="relative block rounded bg-red-500 px-1.5 py-px text-[10px] font-semibold leading-4 text-white">
        {text}
      </span>
    </span>
  );
}

function DesktopLink({
  item,
  index,
  isActive,
  onSelect,
}: {
  item: NavItem;
  index: number;
  isActive: boolean;
  onSelect: (label: string) => void;
}) {
  const { label, href, icon: Icon, badge } = item;

  return (
    <li
      className="nav-anim"
      style={{ animation: `nav-in .5s ${index * 70}ms both ease-out` }}
    >
      <a
        href={href}
        onClick={() => onSelect(label)}
        aria-current={isActive ? "page" : undefined}
        className={`group relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 lg:px-4 ${
          isActive ? "text-white" : "text-zinc-300 hover:text-white"
        }`}
      >
        <Icon className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-red-400 group-hover:opacity-100" />
        <span className="-ml-5 transition-all duration-300 group-hover:ml-0">
          {label}
        </span>
        {badge && <HotBadge text={badge} />}

        <span
          className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-transform duration-300 ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </a>
    </li>
  );
}

export default function DesktopNav({ active, onSelect }: Props) {
  return (
    <ul className="hidden items-center gap-1 md:flex lg:gap-3">
      {NAV_ITEMS.map((item, i) => (
        <DesktopLink
          key={item.label}
          item={item}
          index={i}
          isActive={active === item.label}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
