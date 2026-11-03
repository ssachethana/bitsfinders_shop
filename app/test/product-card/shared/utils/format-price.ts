// One shared formatter - `toLocaleString` builds a new Intl object on every call.
const priceFormatter = new Intl.NumberFormat("en-LK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 2450 -> "2,450.00". The single place price formatting is decided for all three cards. */
export const formatPrice = (amount: number): string => priceFormatter.format(amount);
