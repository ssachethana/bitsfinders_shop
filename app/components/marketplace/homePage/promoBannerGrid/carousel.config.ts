export type Theme = 'dark' | 'cream' | 'charcoal'

export interface PromoItem {
  id: number
  title: string
  highlight?: string
  subtitle?: string
  cta: string
  href: string
  theme: Theme
  image: string
}

export const AUTOPLAY_MS = 3500
export const SWIPE_THRESHOLD = 50

// Replace placeholder images and destinations with actual campaign assets.
const placeholder = (id: number) => `https://picsum.photos/seed/promo-${id}/400/400`

export const CARDS: PromoItem[] = [
  { id: 1, title: 'Mega Sale', highlight: 'Up to 50% Off', cta: 'Shop Now', href: '#', theme: 'dark', image: placeholder(1) },
  { id: 2, title: 'New Arrivals', subtitle: 'Check out the latest products', cta: 'Shop Now', href: '#', theme: 'cream', image: placeholder(2) },
  { id: 3, title: 'Electronics', highlight: 'Up to 30% Off', cta: 'Shop Now', href: '#', theme: 'charcoal', image: placeholder(3) },
  { id: 4, title: 'Fashion Week', highlight: 'Flat 40% Off', cta: 'Explore', href: '#', theme: 'cream', image: placeholder(4) },
  { id: 5, title: 'Home Decor', highlight: 'Up to 35% Off', cta: 'Shop Now', href: '#', theme: 'dark', image: placeholder(5) },
  { id: 6, title: 'Gadget Fest', subtitle: 'Smart devices, smarter prices', cta: 'Discover', href: '#', theme: 'charcoal', image: placeholder(6) },
  { id: 7, title: 'Beauty Deals', highlight: 'Buy 1 Get 1', cta: 'Grab Now', href: '#', theme: 'cream', image: placeholder(7) },
  { id: 8, title: 'Sports Gear', highlight: 'Up to 25% Off', cta: 'Shop Now', href: '#', theme: 'dark', image: placeholder(8) },
  { id: 9, title: 'Back to School', subtitle: 'Bags, books & more', cta: 'Shop Now', href: '#', theme: 'cream', image: placeholder(9) },
  { id: 10, title: 'Flash Sale', highlight: 'Ends Tonight', cta: 'Hurry Up', href: '#', theme: 'charcoal', image: placeholder(10) },
]

export const THEMES: Record<Theme, { card: string; title: string; sub: string; glow: string }> = {
  dark: { card: 'bg-gradient-to-br from-black via-neutral-950 to-neutral-800', title: 'text-white', sub: 'text-neutral-300', glow: 'bg-amber-400/30' },
  cream: { card: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100', title: 'text-neutral-900', sub: 'text-neutral-700', glow: 'bg-orange-300/50' },
  charcoal: { card: 'bg-gradient-to-br from-neutral-800 via-neutral-900 to-black', title: 'text-white', sub: 'text-neutral-300', glow: 'bg-sky-400/25' },
}
