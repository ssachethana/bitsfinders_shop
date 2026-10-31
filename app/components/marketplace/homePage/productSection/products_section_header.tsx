"use client"


import { ArrowRight, Zap } from "lucide-react";

interface Props {
  viewAllHref?: string;
  
}

export default function FlashDealsHeader({ viewAllHref = "#"}: Props) {
  return (
    <header className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mb-6">
      <div className="flex items-center gap-2">
        <Zap className="fd-bolt h-7 w-7 fill-amber-400 text-amber-500 sm:h-8 sm:w-8" />
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
          Products for you
        </h2>
      </div>

      

      

      <a
        href={viewAllHref}
        className="group/link ml-auto inline-flex items-center gap-1 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
      >
        <span className="relative">
          View All Deals
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover/link:w-full" />
        </span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
      </a>
    </header>
  );
}
