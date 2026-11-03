import { Tag } from "lucide-react";

export function PromoBadge({ label }: { label: string }) {
  return (
    <div className="absolute left-0 top-1.5 z-10 flex items-center gap-0.75 rounded-r-md bg-amber-400 py-px pl-2 pr-1.5 text-[0.6rem] font-bold text-white">
      <Tag size={10} />
      {label}
    </div>
  );
}
