# product-card

Three product cards, one feature folder.

| Card | Used in | Import |
|---|---|---|
| `MarketplaceProductCard` | storefront grids | `@/…/product-card` |
| `InventoryProductCard` | inventory dashboard | `@/…/product-card` |
| `CashierProductCard` | POS / cashier screen | `@/…/product-card` |

```tsx
import { CashierProductCard, MarketplaceProductCard } from "@/features/product-card";
```

Always import from the folder root (`index.ts`). Never deep-import from `variants/*` or `primitives/*`.

## Layout

```
product-card/
├── index.ts                 PUBLIC API
├── primitives/              tiny, generic building blocks (no business rules)
│   ├── price.tsx            "LKR 2,450.00" or "—"
│   ├── progress-bar.tsx     accessible progressbar (stock meters)
│   ├── icon-toggle-button.tsx   heart / star behaviour + aria-pressed
│   └── product-image.tsx    <img> with load-error fallback
├── shared/
│   ├── types/               ProductId, StockStatus
│   └── utils/               cx, formatPrice, getStockStatus
└── variants/
    ├── marketplace/
    ├── inventory/
    └── cashier/
```

Each variant has the same shape:

```
<name>/
├── <name>-product-card.tsx          composes components; no data massaging
├── <name>-product-card.types.ts     API shape + props
├── <name>-product-card.mapper.ts    API shape -> view model (pure, unit-tested)
├── components/                      pieces that only this variant uses
├── hooks/                           (marketplace only, for now)
├── utils/                           variant-specific helpers
├── __tests__/
└── index.ts                         variant public API
```

## Rules

1. **Dependencies point one way:** `variants → primitives → shared`. Primitives never import a variant. Variants never import each other.
2. **Components render, mappers decide.** Anything like "is it low stock?", "what discount %?", "which label?" belongs in the mapper so it can be unit-tested without React.
3. **Rule of three.** Keep code inside a variant until a second variant needs it, then move it to `primitives/` or `shared/`. (`useCountdown`, `useTilt` etc. stay in marketplace because nothing else uses them.)
4. **Backend changes touch one file.** If the API renames a field, fix that variant's mapper; components don't change.
5. **Tailwind classes must be full string literals** (no `` `bg-${color}-100` ``), otherwise they are purged.
6. **Imports inside this folder are relative**, so the folder can be moved anywhere without editing paths.

## Adding things

**A new marketplace look (e.g. `"new-arrival"`)** — add it to `MarketplaceVariant` in `marketplace-product-card.types.ts` and one entry in `marketplace-product-card.config.ts`. The card doesn't change.

**A new inventory category icon** — add one line to `variants/inventory/utils/category-presentation.ts`.

**A fourth card (e.g. `kiosk`)** — copy the shape above into `variants/kiosk/`, export it from `variants/kiosk/index.ts`, and add one export line to the root `index.ts`. No existing variant is edited.

## Tests

Pure logic (mappers, utils) is covered with Vitest:

```bash
npx vitest run src/product-card
```

If your project uses Jest instead, delete the `import { describe, expect, it } from "vitest"` line in each test file; the rest is compatible.
