import type { SVGProps } from "react";
import { Reveal } from "./footer_links";

// Keep brand-specific SVG assets and social configuration together.
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

export default function FooterBrand() {
  return (
    <Reveal className="md:col-span-4 lg:col-span-1">
              {/* Replace with your actual logo */}
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

  );
}
