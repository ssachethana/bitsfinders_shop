"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { cx } from "../../../shared/utils/cx";
import type { InventoryMenuAction } from "../inventory-product-card.types";

const MENU_ITEMS: ReadonlyArray<{ action: InventoryMenuAction; label: string; destructive?: boolean }> = [
  { action: "edit", label: "Edit" },
  { action: "duplicate", label: "Duplicate" },
  { action: "archive", label: "Archive" },
  { action: "delete", label: "Delete", destructive: true },
];

interface QuickEditMenuProps {
  /** Fires every time the trigger button is pressed. */
  onToggle?: () => void;
  onSelect?: (action: InventoryMenuAction) => void;
}

export function QuickEditMenu({ onToggle, onSelect }: QuickEditMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Product actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
          onToggle?.();
        }}
        className="rounded-lg p-1 text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-7 z-10 min-w-[130px] rounded-xl border border-gray-100 bg-white py-1 shadow-lg"
        >
          {MENU_ITEMS.map(({ action, label, destructive }) => (
            <button
              key={action}
              type="button"
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onSelect?.(action);
              }}
              className={cx(
                "w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-gray-50",
                destructive ? "text-red-500" : "text-gray-700"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
