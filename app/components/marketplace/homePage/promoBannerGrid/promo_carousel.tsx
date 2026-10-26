'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import PromoCard from '@/app/components/marketplace/homePage/promoBannerGrid/promo_card'
import CarouselControls from '@/app/components/marketplace/homePage/promoBannerGrid/carousel_controls'
import { AUTOPLAY_MS, CARDS, SWIPE_THRESHOLD } from '@/app/components/marketplace/homePage/promoBannerGrid/carousel.config'

/** Match the original 1 / 2 / 3-card mobile / tablet / desktop layout. */
function usePerView() {
  const [perView, setPerView] = useState(1)
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return perView
}

/** Container: owns index, autoplay, hover state, and pointer gestures. */
export default function PromoCarousel() {
  const perView = usePerView()
  const maxIndex = Math.max(0, CARDS.length - perView)
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [drag, setDrag] = useState(0)
  const startX = useRef<number | null>(null)
  const dragged = useRef(false)
  const suppressClick = useRef(false)
  const safeIndex = Math.min(index, maxIndex)
  const paused = userPaused || hovered || dragging

  const next = useCallback(() => setIndex(i => Math.min(i, maxIndex) >= maxIndex ? 0 : Math.min(i, maxIndex) + 1), [maxIndex])
  const previous = useCallback(() => setIndex(i => Math.min(i, maxIndex) <= 0 ? maxIndex : Math.min(i, maxIndex) - 1), [maxIndex])

  // One timeout per slide; pausing cancels the pending advance.
  useEffect(() => {
    if (paused || maxIndex === 0) return
    const timer = window.setTimeout(next, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [safeIndex, paused, maxIndex, next])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    startX.current = event.clientX
    dragged.current = false
    suppressClick.current = false
    setDragging(true)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return
    const dx = event.clientX - startX.current
    if (Math.abs(dx) > 6) dragged.current = true
    setDrag(dx)
  }

  const finishPointer = (cancelled = false) => {
    if (startX.current === null) return
    suppressClick.current = dragged.current
    if (!cancelled) {
      if (drag < -SWIPE_THRESHOLD) next()
      else if (drag > SWIPE_THRESHOLD) previous()
    }
    startX.current = null
    setDrag(0)
    setDragging(false)
  }

  return (
    <section aria-label="Promotional offers" className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-12">
      {/* Local animations: no Tailwind config changes required. */}
      <style>{`
        @keyframes pc-float { 0%,100% { transform: translateY(0) rotate(-3deg) } 50% { transform: translateY(-10px) rotate(3deg) } }
        @keyframes pc-in { from { opacity: 0; transform: translateX(60px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes pc-shine { from { transform: translateX(-150%) skewX(-20deg) } to { transform: translateX(250%) skewX(-20deg) } }
        @keyframes pc-bar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes pc-pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.15) } }
        .pc-float { animation: pc-float 5s ease-in-out infinite }
        .pc-in { animation: pc-in .8s cubic-bezier(.2,.8,.2,1) both }
        .pc-card:hover .pc-shine { animation: pc-shine .9s ease }
        .pc-bar { transform-origin: left; animation: pc-bar ${AUTOPLAY_MS}ms linear forwards }
        @media (prefers-reduced-motion: reduce) { .pc-float,.pc-in,.pc-bar,.pc-card:hover .pc-shine { animation: none } }
      `}</style>

      <div className="relative mx-auto max-w-7xl" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Viewport clips the sliding track; vertical page scrolling remains enabled. */}
        <div
          className="touch-pan-y select-none overflow-hidden rounded-3xl"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => finishPointer()}
          onPointerCancel={() => finishPointer(true)}
          onPointerLeave={() => finishPointer(true)}
        >
          <div
            className={`flex ${dragging ? '' : 'transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]'}`}
            style={{ transform: `translateX(calc(${-safeIndex * (100 / perView)}% + ${drag}px))` }}
          >
            {CARDS.map((card, i) => (
              <div key={card.id} className="shrink-0 px-2 py-3 sm:px-2.5" style={{ width: `${100 / perView}%` }}>
                <PromoCard
                  card={card}
                  visible={i >= safeIndex && i < safeIndex + perView}
                  animationDelay={(i - safeIndex) * 120}
                  preventClick={() => suppressClick.current}
                />
              </div>
            ))}
          </div>
        </div>

        <CarouselControls
          index={safeIndex}
          pageCount={maxIndex + 1}
          paused={paused}
          onPrevious={previous}
          onNext={next}
          onGoTo={setIndex}
          onTogglePause={() => setUserPaused(p => !p)}
        />
      </div>
    </section>
  )
}
