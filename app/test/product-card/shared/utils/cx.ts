export type ClassValue = string | false | null | undefined;

/** Tiny class joiner. Swap for `clsx` / `tailwind-merge` if your project already uses them. */
export const cx = (...parts: ClassValue[]): string => parts.filter(Boolean).join(" ");
