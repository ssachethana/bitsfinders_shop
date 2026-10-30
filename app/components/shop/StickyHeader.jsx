'use client'

import { useEffect, useRef, useState } from 'react'

export default function StickyHeader({ top, children }) {
  const topRef = useRef(null)
  const [topHeight, setTopHeight] = useState(0)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const ticking = useRef(false)

  // measure the height of the part that should hide (Header + Shopheder)
  useEffect(() => {
    if (!topRef.current) return
    const ro = new ResizeObserver(([entry]) =>
      setTopHeight(entry.target.offsetHeight)
    )
    ro.observe(topRef.current)
    return () => ro.disconnect()
  }, [])

  // hide on scroll down, show on scroll up
  useEffect(() => {
    lastY.current = window.scrollY

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const y = window.scrollY
        const diff = y - lastY.current

        if (y < 80) {
          setHidden(false)            // always show near the top
        } else if (Math.abs(diff) > 8) {
          setHidden(diff > 0)         // down = hide, up = show
        }

        lastY.current = y
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="sticky z-40 transition-[top] duration-300 ease-in-out motion-reduce:transition-none"
      style={{ top: hidden ? -topHeight : 0 }}
    >
      <div ref={topRef}>{top}</div>
      {children}
    </div>
  )
}