"use client"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { Bell, Menu, Minimize2, Maximize2, Paintbrush, X } from 'lucide-react'

type NavItem = { label: string; href: string; badge?: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'All Products', href: '#products' },
  { label: 'Deals', href: '#deals', badge: 'Hot' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'About Shop', href: '#about' },
]

// The brush button cycles through these accent colours.
const ACCENTS = ['#f97316', '#e11d48', '#7c3aed', '#059669', '#0284c7']

export default function Navbar() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [compact, setCompact] = useState(false)
  const [accentIdx, setAccentIdx] = useState(0)
  const [hasNotif, setHasNotif] = useState(true)
  const [ringKey, setRingKey] = useState(0)

  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const navRef = useRef<HTMLElement>(null)
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false })
  const [spot, setSpot] = useState({ left: 0, width: 0 })

  const accent = ACCENTS[accentIdx]

  // Measure the active / hovered link so the indicators can slide to it.
  const measure = useCallback(() => {
    const a = itemRefs.current[active]?.parentElement
    if (a) setBar({ left: a.offsetLeft, width: a.offsetWidth, ready: true })
    const h = itemRefs.current[hovered ?? active]?.parentElement
    if (h) setSpot({ left: h.offsetLeft, width: h.offsetWidth })
  }, [active, hovered])

  useLayoutEffect(measure, [measure, compact])

  useEffect(() => {
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape or when growing to desktop width.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => mq.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [])

  // Cursor-following glow (no re-render, just CSS variables).
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = navRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const select = (i: number) => {
    setActive(i)
    setMenuOpen(false)
  }

  const iconBtn =
    'group/btn relative grid h-10 w-10 place-items-center rounded-xl text-[var(--accent)] ' +
    'transition-all duration-300 hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] ' +
    'hover:-translate-y-0.5 active:scale-90 focus-visible:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-[var(--accent)]'

  return (
    <header
      className="sticky top-0 z-50 px-3 pt-3 sm:px-6"
      style={{ ['--accent' as string]: accent }}
    >
      {/* keyframes used by the effects below */}
      <style>{`
        @keyframes nb-ring{0%,100%{transform:rotate(0)}15%{transform:rotate(18deg)}30%{transform:rotate(-16deg)}45%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}75%{transform:rotate(4deg)}}
        @keyframes nb-shine{0%{transform:translateX(-120%) skewX(-20deg)}60%,100%{transform:translateX(220%) skewX(-20deg)}}
        @keyframes nb-in{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
        @keyframes nb-item{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
        @keyframes nb-spin{to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion:reduce){.nb-anim,.nb-anim *{animation:none!important;transition:none!important}}
      `}</style>

      <nav
        ref={navRef}
        onMouseMove={onMove}
        aria-label="Main"
        className={[
          'nb-anim group relative mx-auto overflow-hidden rounded-2xl bg-white/85 backdrop-blur-xl',
          'ring-1 ring-slate-900/5 transition-all duration-500 ease-out',
          'animate-[nb-in_.6s_ease-out]',
          compact ? 'max-w-3xl' : 'max-w-6xl',
          scrolled
            ? 'shadow-[0_12px_40px_-12px_color-mix(in_srgb,var(--accent)_45%,transparent)]'
            : 'shadow-[0_4px_20px_-8px_rgba(15,23,42,0.12)]',
        ].join(' ')}
      >
        {/* cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(220px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)',
          }}
        />
        {/* top accent hairline */}
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-transform duration-700 ${
            scrolled ? 'scale-x-100' : 'scale-x-0'
          }`}
        />

        <div
          className={`relative flex items-center justify-between gap-2 px-3 sm:px-5 transition-all duration-500 ${
            compact ? 'h-12' : 'h-14 sm:h-16'
          }`}
        >
          {/* Mobile hamburger */}
          <button
            type="button"
            className={`${iconBtn} md:hidden`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${
                menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${
                menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </button>

          {/* Mobile: current page label */}
          <span className="truncate text-sm font-semibold text-slate-800 md:hidden">
            {NAV_ITEMS[active].label}
          </span>

          {/* Desktop links */}
          <ul
            ref={listRef}
            className="relative hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {/* hover pill */}
            <span
              aria-hidden
              className="absolute inset-y-0 -z-0 my-auto h-9 rounded-xl bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] transition-all duration-300 ease-out"
              style={{
                left: spot.left,
                width: spot.width,
                opacity: hovered === null ? 0 : 1,
              }}
            />
            {NAV_ITEMS.map((item, i) => (
              <li key={item.label} className="relative z-10">
                <a
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  href={item.href}
                  aria-current={active === i ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    select(i)
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none lg:px-4 ${
                    active === i
                      ? 'text-[var(--accent)]'
                      : 'text-slate-800 hover:text-[var(--accent)]'
                  }`}
                >
                  {item.label}
                  {item.badge && <HotBadge label={item.badge} />}
                </a>
              </li>
            ))}

            {/* sliding active underline */}
            <span
              aria-hidden
              className="absolute -bottom-1 h-[3px] rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
              style={{
                left: bar.left + 12,
                width: Math.max(bar.width - 24, 0),
                opacity: bar.ready ? 1 : 0,
              }}
            />
          </ul>

          {/* Right-side actions */}
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <button
              type="button"
              className={iconBtn}
              aria-label={hasNotif ? 'Notifications (new)' : 'Notifications'}
              onClick={() => {
                setHasNotif(false)
                setRingKey((k) => k + 1)
              }}
              onMouseEnter={() => setRingKey((k) => k + 1)}
            >
              <Bell
                key={ringKey}
                className="h-5 w-5 origin-top"
                style={ringKey ? { animation: 'nb-ring .8s ease-in-out' } : undefined}
                fill={hasNotif ? 'currentColor' : 'none'}
                fillOpacity={0.18}
              />
              {hasNotif && (
                <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-2 ring-white" />
                </span>
              )}
            </button>

            <button
              type="button"
              className={iconBtn}
              aria-label="Change accent colour"
              onClick={() => setAccentIdx((i) => (i + 1) % ACCENTS.length)}
            >
              <Paintbrush className="h-5 w-5 transition-transform duration-500 group-hover/btn:-rotate-45 group-hover/btn:scale-110" />
            </button>

            <button
              type="button"
              className={`${iconBtn} hidden sm:grid`}
              aria-label={compact ? 'Expand navigation bar' : 'Shrink navigation bar'}
              aria-pressed={compact}
              onClick={() => setCompact((v) => !v)}
            >
              {compact ? (
                <Maximize2 className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-125" />
              ) : (
                <Minimize2 className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-75" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu: height animates via grid rows */}
        <div
          id="mobile-menu"
          className={`relative grid transition-[grid-template-rows,opacity] duration-500 ease-out md:hidden ${
            menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 border-t border-slate-100 px-3 pb-3 pt-2">
              {NAV_ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  style={
                    menuOpen
                      ? { animation: `nb-item .45s ${i * 70}ms both ease-out` }
                      : undefined
                  }
                >
                  <a
                    href={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    aria-current={active === i ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      select(i)
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 active:scale-[0.98] ${
                      active === i
                        ? 'bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-5 w-1 rounded-full bg-[var(--accent)] transition-all duration-300 ${
                          active === i ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                        }`}
                      />
                      {item.label}
                    </span>
                    {item.badge && <HotBadge label={item.badge} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

function HotBadge({ label }: { label: string }) {
  return (
    <span className="relative inline-flex animate-pulse items-center overflow-hidden rounded-md bg-red-500 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white shadow-[0_0_10px_rgba(239,68,68,.55)]">
      {label}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3 bg-white/40"
        style={{ animation: 'nb-shine 2.4s ease-in-out infinite' }}
      />
    </span>
  )
}