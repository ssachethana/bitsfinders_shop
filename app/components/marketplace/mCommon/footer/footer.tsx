'use client'
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import {
  ArrowUp,
  Apple,
  Check,
  ChevronDown,
  Globe,
  Heart,
  Leaf,
  Play,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
  { title: "Solutions", links: ["Retail", "Wholesale", "E-commerce", "Manufacturing"] },
  { title: "Resources", links: ["Help Center", "Guides", "Blogs", "API Docs"] },
  { title: "Company", links: ["About Us", "Careers", "Partners", "Contact Us"] },
];

const languages = ["English", "Español", "Français", "Deutsch", "සිංහල", "தமிழ்"];

/* Brand icons (lucide-react no longer ships brand logos) */
type IconProps = SVGProps<SVGSVGElement>;
const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.3H7.7V13h2.7v8h3.1z" />
  </svg>
);
const XIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
  </svg>
);
const LinkedinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.5 8.8h3.1V20H4.5V8.8zM6 3.8a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6zM9.6 8.8h3v1.5c.4-.8 1.5-1.8 3.1-1.8 3.3 0 3.9 2.2 3.9 5V20h-3.1v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H9.6V8.8z" />
  </svg>
);
const TumblrIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M14.6 21c-3 0-4.6-1.6-4.6-4.3v-5.2H7.6V8.7c2-.7 3-2.2 3.2-4.4h2.6v4h3.1v3.2h-3.1v4.9c0 1.4.7 1.9 1.8 1.9.5 0 1-.1 1.4-.3l.8 2.4c-.7.4-1.8.6-2.8.6z" />
  </svg>
);

const socials = [
  { label: "Facebook", Icon: FacebookIcon, hover: "hover:bg-[#1877f2]" },
  { label: "X (Twitter)", Icon: XIcon, hover: "hover:bg-black" },
  { label: "LinkedIn", Icon: LinkedinIcon, hover: "hover:bg-[#0a66c2]" },
  { label: "Tumblr", Icon: TumblrIcon, hover: "hover:bg-[#35465c]" },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/** Fades + slides children in the first time they scroll into view. */
function Reveal({
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
      <ul
        className={`grid transition-all duration-300 ease-out md:mt-5 md:block md:grid-rows-none ${
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden md:overflow-visible">
          <div className="flex flex-col gap-1 pl-4 md:pl-4">
            {links.map((l) => (
              <li key={l} className="list-none">
                <FooterLink>{l}</FooterLink>
              </li>
            ))}
          </div>
        </div>
      </ul>
    </Reveal>
  );
}

function StoreButton({
  icon,
  small,
  big,
}: {
  icon: ReactNode;
  small: string;
  big: string;
}) {
  return (
    <a
      href="#"
      className="group/store relative flex w-40 items-center gap-2.5 overflow-hidden rounded-lg border border-slate-700 bg-black px-3 py-2 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/30 active:scale-95"
    >
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover/store:left-[150%]" />
      <span className="transition-transform duration-300 group-hover/store:scale-110">
        {icon}
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-wide text-white/70">{small}</span>
        <span className="mt-0.5 text-[17px] font-semibold">{big}</span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const [lang, setLang] = useState("English");
  const [langOpen, setLangOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langOpen]);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = footerRef.current?.getBoundingClientRect();
    if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };

  return (
    <>
      <style>{`
        @keyframes bs-sway { 0%,100%{transform:rotate(-6deg) translateY(0)} 50%{transform:rotate(8deg) translateY(-3px)} }
        @keyframes bs-flow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes bs-float { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
        @keyframes bs-beat { 0%,100%{transform:scale(1)} 15%{transform:scale(1.3)} 30%{transform:scale(1)} 45%{transform:scale(1.2)} }
        @media (prefers-reduced-motion: reduce){ .bs-anim{animation:none!important} }
      `}</style>

      <footer
        ref={footerRef}
        onMouseMove={onMove}
        onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
        className="relative isolate overflow-hidden bg-white"
      >
        {/* animated gradient top edge */}
        <div
          className="bs-anim absolute inset-x-0 top-0 h-1 bg-[length:200%_100%] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300"
          style={{ animation: "bs-flow 4s linear infinite" }}
        />

        {/* ambient blobs */}
        <div
          className="bs-anim pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"
          style={{ animation: "bs-float 12s ease-in-out infinite" }}
        />
        <div
          className="bs-anim pointer-events-none absolute -right-20 bottom-20 -z-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"
          style={{ animation: "bs-float 15s ease-in-out infinite reverse" }}
        />

        {/* cursor spotlight (desktop pointers only) */}
        <div
          className="pointer-events-none absolute -z-10 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/30 blur-3xl transition-opacity duration-300 md:block"
          style={{ left: spot.x, top: spot.y, opacity: spot.on ? 1 : 0 }}
        />

        <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-4 lg:grid-cols-[1.3fr_repeat(4,1fr)_1.2fr] lg:gap-8">
            {/* Brand */}
            <Reveal className="md:col-span-4 lg:col-span-1">
              // logo img
              <p className="mt-3 max-w-xs text-[15px] leading-7 text-slate-500">
                All-in-one business management platform to simplify your operations
                and accelerate growth.
              </p>

              <div className="mt-6 flex gap-3">
                {socials.map(({ label, Icon, hover }, i) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    style={{ transitionDelay: `${i * 30}ms` }}
                    className={`grid h-10 w-10 place-items-center rounded-full bg-slate-500 text-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[360deg] hover:shadow-lg active:scale-90 ${hover}`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Link columns */}
            <div className="border-t border-slate-200 md:col-span-4 md:grid md:grid-cols-4 md:gap-8 md:border-0 lg:col-span-4">
              {columns.map((c, i) => (
                <LinkColumn key={c.title} {...c} index={i} />
              ))}
            </div>

            {/* App download */}
            <Reveal delay={200} className="md:col-span-4 lg:col-span-1">
              <h3 className="text-base font-bold text-slate-900">Download Our App</h3>
              <p className="mt-1.5 text-xs text-slate-600">
                Get the app for better experience
              </p>
              <div className="mt-4 flex flex-wrap gap-3 lg:flex-col">
                <StoreButton
                  icon={<Play className="h-6 w-6 fill-emerald-400 text-emerald-400" />}
                  small="Get it on"
                  big="Google Play"
                />
                <StoreButton
                  icon={<Apple className="h-6 w-6 fill-white" />}
                  small="Download on the"
                  big="App Store"
                />
              </div>
            </Reveal>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-200 pt-6 text-center text-sm md:flex-row md:justify-between md:text-left">
            <p className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start font-semibold text-slate-900">
              © 2026 Bits Shop. Built with
              <Heart
                className="bs-anim h-4 w-4 fill-rose-500 text-rose-500"
                style={{ animation: "bs-beat 1.6s ease-in-out infinite" }}
              />
              for growing businesses.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-medium text-slate-500">
              {["Privacy Policy", "Terms of Service"].map((t) => (
                <a key={t} href="#" className="group/t relative transition-colors hover:text-slate-900">
                  {t}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-center scale-x-0 bg-slate-900 transition-transform duration-300 group-hover/t:scale-x-100" />
                </a>
              ))}

              {/* Language picker */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setLangOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-amber-50 hover:text-slate-900"
                >
                  <Globe className="h-4 w-4" />
                  {lang}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ul
                  role="listbox"
                  className={`absolute bottom-full right-1/2 z-20 mb-2 w-40 translate-x-1/2 origin-bottom overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl transition-all duration-200 md:right-0 md:translate-x-0 ${
                    langOpen
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }`}
                >
                  {languages.map((l) => (
                    <li key={l}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={l === lang}
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-slate-700 hover:bg-amber-50"
                      >
                        {l}
                        {l === lang && <Check className="h-4 w-4 text-amber-600" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-90 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}