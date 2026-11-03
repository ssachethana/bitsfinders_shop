interface CategoryPresentation {
  emoji: string;
  /** Full Tailwind class (must stay a literal so it isn't purged). */
  bgClass: string;
}

/**
 * First match wins, so keep more specific words above broader ones.
 * To support a new category, add one line - no other file changes.
 */
const CATEGORY_RULES: ReadonlyArray<CategoryPresentation & { match: string }> = [
  { match: "electron", emoji: "⌚", bgClass: "bg-orange-100" },
  { match: "audio", emoji: "🎧", bgClass: "bg-blue-100" },
  { match: "lifestyle", emoji: "🧴", bgClass: "bg-green-100" },
  { match: "watch", emoji: "⌚", bgClass: "bg-purple-100" },
  { match: "fitness", emoji: "🏃", bgClass: "bg-red-100" },
  { match: "gaming", emoji: "🎮", bgClass: "bg-indigo-100" },
  { match: "fruit", emoji: "🍎", bgClass: "bg-lime-100" },
  { match: "food", emoji: "🍽️", bgClass: "bg-yellow-100" },
  { match: "cloth", emoji: "👕", bgClass: "bg-gray-100" },
  { match: "book", emoji: "📚", bgClass: "bg-gray-100" },
  { match: "tool", emoji: "🔧", bgClass: "bg-gray-100" },
];

const DEFAULT_PRESENTATION: CategoryPresentation = { emoji: "📦", bgClass: "bg-gray-100" };

/** Emoji + background for any category string (case-insensitive, falls back to 📦). */
export function getCategoryPresentation(category: string): CategoryPresentation {
  const c = category.toLowerCase();
  const rule = CATEGORY_RULES.find((r) => c.includes(r.match));
  return rule ?? DEFAULT_PRESENTATION;
}
