'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CarouselProps {
  children: React.ReactNode
  autoScroll?: boolean
  autoScrollInterval?: number
  pauseOnHover?: boolean // Default false per user requirement: never pause on cursor hover
  onlyMobile?: boolean
  desktopClassName?: string
  className?: string
  itemClassName?: string
  showDots?: boolean
  showArrows?: boolean
}

export function Carousel({
  children,
  autoScroll = true,
  autoScrollInterval = 3500,
  pauseOnHover = false, // Never stop on cursor trigger
  onlyMobile = false,
  desktopClassName = 'hidden md:grid md:grid-cols-2 gap-8 lg:gap-10',
  className = '',
  itemClassName = 'w-[88vw] sm:w-[380px] shrink-0 snap-center sm:snap-start',
  showDots = true,
  showArrows = true
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const items = React.Children.toArray(children)
  const totalItems = items.length

  // Check scroll boundary & calculate active index
  const checkScroll = useCallback(() => {
    if (!scrollRef.current || totalItems === 0) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    const firstChild = scrollRef.current.firstElementChild as HTMLElement | null
    const cardWidth = firstChild?.clientWidth || clientWidth
    const gap = 16
    const index = Math.round(scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(Math.max(0, index), totalItems - 1))
  }, [totalItems])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  // Scroll prev/next
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const firstChild = scrollRef.current.firstElementChild as HTMLElement | null
    const cardWidth = firstChild?.clientWidth || 320
    const gap = 16
    const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap

    scrollRef.current.scrollBy({
      left: offset,
      behavior: 'smooth'
    })
  }

  // Direct jump to index
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const firstChild = scrollRef.current.firstElementChild as HTMLElement | null
    const cardWidth = firstChild?.clientWidth || 320
    const gap = 16
    scrollRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    })
  }

  // Auto-scroll loop: keeps running continuously without stopping on cursor hover
  useEffect(() => {
    if (!autoScroll || totalItems <= 1) return

    const interval = setInterval(() => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const isEnd = scrollLeft >= scrollWidth - clientWidth - 20

      if (isEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scroll('right')
      }
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [autoScroll, autoScrollInterval, totalItems])

  // Carousel slider body
  const carouselSlider = (
    <div className={`w-full relative ${className}`}>
      {/* Scrollable Track - smooth snap */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-1 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {items.map((item, idx) => (
          <div key={idx} className={itemClassName}>
            {item}
          </div>
        ))}
      </div>

      {/* Controls Bar (Dots & Arrows) */}
      {(showDots || showArrows) && totalItems > 1 && (
        <div className="flex items-center justify-between mt-5 px-1">
          {/* Pagination Dots */}
          {showDots && (
            <div className="flex items-center gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-7 bg-blue-600 border border-black'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {showArrows && (
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous slide"
                className={`w-9 h-9 rounded-xl border border-black bg-white flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'hover:bg-gray-50 cursor-pointer text-gray-900'
                    : 'opacity-30 cursor-not-allowed text-gray-400'
                }`}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next slide"
                className={`w-9 h-9 rounded-xl border border-black bg-white flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'hover:bg-gray-50 cursor-pointer text-gray-900'
                    : 'opacity-30 cursor-not-allowed text-gray-400'
                }`}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )

  // If onlyMobile is requested:
  // Desktop: displays native desktop layout
  // Mobile: displays the auto-sliding carousel
  if (onlyMobile) {
    return (
      <>
        {/* Desktop Layout */}
        <div className={desktopClassName}>
          {items.map((item, idx) => (
            <React.Fragment key={idx}>{item}</React.Fragment>
          ))}
        </div>

        {/* Mobile / Tablet Carousel Layout */}
        <div className="block md:hidden">
          {carouselSlider}
        </div>
      </>
    )
  }

  return carouselSlider
}

export default Carousel
