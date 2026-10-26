import { ArrowRight, Sparkles } from 'lucide-react'
import { THEMES, type PromoItem } from './carousel.config'

interface PromoCardProps {
  card: PromoItem
  visible: boolean
  animationDelay: number
  preventClick: () => boolean
}

/** Presentation only: the parent owns navigation and gesture state. */
export default function PromoCard({ card, visible, animationDelay, preventClick }: PromoCardProps) {
  const theme = THEMES[card.theme]

  return (
    <a
      href={card.href}
      draggable={false}
      onClick={(event) => { if (preventClick()) event.preventDefault() }}
      className={`pc-card group relative flex h-44 items-center overflow-hidden rounded-2xl p-5 shadow-lg ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:h-48 sm:p-6 lg:h-52 ${theme.card} ${visible ? 'pc-in' : ''}`}
      style={visible ? { animationDelay: `${animationDelay}ms` } : undefined}
    >
      {/* Decorative glow and hover shine. */}
      <span aria-hidden="true" className={`pointer-events-none absolute -right-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 ${theme.glow}`} />
      <span aria-hidden="true" className="pc-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ transform: 'translateX(-150%) skewX(-20deg)' }} />

      <div className="relative z-10 flex w-[55%] flex-col items-start gap-1.5">
        <h3 className={`text-xl font-semibold leading-tight sm:text-2xl ${theme.title}`}>{card.title}</h3>
        {card.highlight && <p className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-lg font-bold text-transparent sm:text-xl">{card.highlight}</p>}
        {card.subtitle && <p className={`text-xs sm:text-sm ${theme.sub}`}>{card.subtitle}</p>}
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-500 sm:text-base">
          {card.cta}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
        </span>
      </div>

      {/* Product imagery: plain img keeps the original remote placeholder behavior. */}
      <div className="pc-float absolute -right-2 top-1/2 z-10 h-32 w-32 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt={card.title} loading="lazy" draggable={false} className="h-full w-full rounded-2xl object-cover shadow-2xl ring-2 ring-white/20" />
      </div>
      <Sparkles aria-hidden="true" className="absolute right-3 top-3 z-20 h-4 w-4 text-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ animation: 'pc-pulse 1.2s ease-in-out infinite' }} />
    </a>
  )
}
