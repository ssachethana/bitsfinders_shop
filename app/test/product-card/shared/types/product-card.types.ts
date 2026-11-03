/** Types shared by more than one variant. Anything used by a single variant lives in that variant. */

export type ProductId = string | number;

/** "in" = healthy, "low" = at/below the reorder threshold, "out" = nothing left. */
export type StockStatus = "in" | "low" | "out";
