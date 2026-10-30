
'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface StickyHeaderProps {
  children: ReactNode
}

export default function StickyHeader({
  children,
}: StickyHeaderProps) {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY
        const previousY = lastScrollY.current
        const difference = currentY - previousY

        // Always show the header near the top.
        if (currentY < 80) {
          setVisible(true)
        }
        // Hide when scrolling down.
        else if (difference > 3) {
          setVisible(false)
        }
        // Show when scrolling up slightly.
        else if (difference < -3) {
          setVisible(true)
        }

        lastScrollY.current = currentY
        ticking = false
      })
    }

    // Initialize scroll position.
    lastScrollY.current = window.scrollY

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`
        fixed inset-x-0 top-0 z-50
        transition-transform duration-300 ease-in-out
        ${
          visible
            ? 'translate-y-0'
            : '-translate-y-full'
        }
      `}
    >
      {children}
    </div>
  )
}
