"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

// Navigation content is defined separately from its presentation.
const columns = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
  { title: "Solutions", links: ["Retail", "Wholesale", "E-commerce", "Manufacturing"] },
  { title: "Resources", links: ["Help Center", "Guides", "Blogs", "API Docs"] },
  { title: "Company", links: ["About Us", "Careers", "Partners", "Contact Us"] },
];

/** Fades + slides children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function FooterLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#"
      className="group/link relative inline-flex items-center py-1 text-[15px] font-medium text-slate-700 transition-colors duration-300 hover:text-amber-600"
    >
      <span className="absolute -left-4 h-1.5 w-1.5 scale-0 rounded-full bg-amber-500 transition-transform duration-300 group-hover/link:scale-100" />
      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
        {children}
      </span>
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-orange-400 transition-transform duration-300 group-hover/link:scale-x-100" />
    </a>
  );
}

/** Mobile = accordion, md+ = always-open column. */
function LinkColumn({
  title,
  links,
  index,
}: {
  title: string;
  links: string[];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 90} className="border-b border-slate-200 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left md:pointer-events-none md:cursor-default md:py-0"
      >
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform duration-300 md:hidden ${
            open ? "rotate-180 text-amber-600" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out md:mt-5 md:block md:grid-rows-none ${
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden md:overflow-visible">
          <ul className="flex flex-col gap-1 pl-4 md:pl-4">
            {links.map((l) => (
              <li key={l} className="list-none">
                <FooterLink>{l}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

// Responsive navigation: accordion on mobile, columns on larger screens.
export default function FooterLinks() {
  return (
    <div className="border-t border-slate-200 md:col-span-4 md:grid md:grid-cols-4 md:gap-8 md:border-0 lg:col-span-4">
      {columns.map((column, index) => (
        <LinkColumn key={column.title} {...column} index={index} />
      ))}
    </div>
  );
}
