"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { BadgePercent, RotateCcw, ShieldCheck, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  hover: string; // icon hover animation (tailwind classes)
};

const features: Feature[] = [
  {
    icon: BadgePercent,
    title: "Best Prices",
    description: "We offer best prices on all products",
    hover: "group-hover:rotate-[-12deg] group-hover:scale-110",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7 day easy return policy",
    hover: "group-hover:-rotate-180",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure payment gateway",
    hover: "group-hover:scale-125",
  },
];

/** Fades/slides an element in once it scrolls into view. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

function FeatureCard({ feature, index, visible }: { feature: Feature; index: number; visible: boolean }) {
  const { icon: Icon, title, description, hover } = feature;
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor-follow spotlight (desktop). Sets CSS vars read by the gradient below.
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`group relative overflow-hidden rounded-2xl sm:last:col-span-2 sm:last:mx-auto sm:last:w-full sm:last:max-w-md lg:last:col-span-1 lg:last:max-w-none border border-amber-200/70 bg-amber-50
        p-5 sm:p-6 shadow-sm transition-all duration-700 ease-out
        hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-300/40
        active:scale-[0.98]
        ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      {/* spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--x,50%) var(--y,50%), rgba(251,191,36,0.28), transparent 70%)",
        }}
      />
      {/* shine sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent
          opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
      />

      <div className="relative flex items-start gap-4">
        <div
          className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-amber-500 shadow-inner
            ring-1 ring-amber-200 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-white"
        >
          <span aria-hidden className="absolute inset-0 rounded-xl bg-amber-300/40 opacity-0 group-hover:animate-ping" />
          <Icon className={`relative h-6 w-6 transition-transform duration-500 ${hover}`} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{description}</p>
        </div>
      </div>

      {/* bottom accent bar grows on hover */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-500 group-hover:w-full"
      />
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      {/* floating background blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-16 top-4 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl animate-pulse" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-4 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <h2
          className={`text-center text-3xl font-extrabold tracking-tight text-neutral-950 transition-all duration-700 sm:text-4xl lg:text-5xl
            ${visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
        >
          Why Choose{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            BitsShop?
          </span>
        </h2>

        {/* animated underline */}
        <div
          className={`mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all delay-300 duration-1000
            ${visible ? "w-24 opacity-100" : "w-0 opacity-0"}`}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}