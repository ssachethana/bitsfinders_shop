import Link from "next/link";

interface ProductTitleProps {
  title: string;
  href?: string;
}

export function ProductTitle({ title, href }: ProductTitleProps) {
  return (
    <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-5 text-gray-800 sm:text-sm">
      {href ? (
        // "Stretched link": the ::after covers the whole card, so the card is one big
        // click target with a single, accessible link. Buttons sit above it (z-20).
        <Link
          href={href}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-gray-900"
        >
          {title}
        </Link>
      ) : (
        title
      )}
    </h3>
  );
}
