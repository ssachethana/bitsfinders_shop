import type { ReactNode } from "react";

interface IconToggleButtonProps {
  pressed: boolean;
  /** Called with the NEW value. */
  onPressedChange: (next: boolean) => void;
  /** Accessible name. Pass a different label per state if the wording changes. */
  label: string;
  /** Set when the button sits inside a clickable card so the card's onClick doesn't also fire. */
  stopPropagation?: boolean;
  /** All visual styling comes from the caller - this primitive only owns behaviour + a11y. */
  className?: string;
  children: ReactNode;
}

/** Behaviour + accessibility for heart / star / bookmark style toggles. */
export function IconToggleButton({
  pressed,
  onPressedChange,
  label,
  stopPropagation = false,
  className,
  children,
}: IconToggleButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      className={className}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        onPressedChange(!pressed);
      }}
    >
      {children}
    </button>
  );
}
