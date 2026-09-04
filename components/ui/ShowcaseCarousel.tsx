'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import ShowcaseCard, { ShowcaseReviewCardData } from './ShowcaseCard'

export interface ShowcaseCarouselProps {
  items: ShowcaseReviewCardData[]
  autoScroll?: boolean
  autoScrollSpeed?: number // ms between steps or px/interval
  className?: string
}

export function ShowcaseCarousel({
  items,
  autoScroll = true,
  autoScrollSpeed = 4000,
  className = ''
}: ShowcaseCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Check scroll boundary
  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate approximate active card index
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 320
    const gap = 20
    const index = Math.round(scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(Math.max(0, index), items.length - 1))
  }, [items.length])

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

  // Scroll function
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 340
    const gap = 20
    const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap

    scrollRef.current.scrollBy({
      left: offset,
      behavior: 'smooth'
    })
  }

  // Scroll directly to index
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 340
    const gap = 20
    scrollRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    })
  }

  // Ticker Auto-scroll timer
  useEffect(() => {
    if (!autoScroll || isPaused) return

    const interval = setInterval(() => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const isEnd = scrollLeft >= scrollWidth - clientWidth - 20

      if (isEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scroll('right')
      }
    }, autoScrollSpeed)

    return () => clearInterval(interval)
  }, [autoScroll, isPaused, autoScrollSpeed])

  return (
    <div
      className={`w-full relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-4 sm:px-0 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="w-[84vw] sm:w-[350px] lg:w-[380px] shrink-0 snap-center sm:snap-start"
          >
            <ShowcaseCard card={item} />
          </div>
        ))}
      </div>

      {/* Bottom Controls Bar (Mobile & Desktop Friendly) */}
      <div className="flex items-center justify-between mt-6 px-4 sm:px-0">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-8 bg-blue-600 border border-black'
                  : 'w-2.5 bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Action Controls: Play/Pause Ticker & Prev/Next Arrows */}
        <div className="flex items-center gap-2">
          {/* Auto-scroll toggle badge */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-black bg-white text-xs font-bold text-gray-800 hover:bg-gray-50 transition-all cursor-pointer"
            title={isPaused ? 'Aktifkan Auto Ticker' : 'Jeda Auto Ticker'}
          >
            {isPaused ? (
              <>
                <Play size={12} className="text-emerald-600 fill-emerald-600" />
                <span>Auto-Scroll</span>
              </>
            ) : (
              <>
                <Pause size={12} className="text-blue-600 fill-blue-600" />
                <span>Pause</span>
              </>
            )}
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous card"
            className={`w-10 h-10 rounded-xl border border-black bg-white flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'hover:bg-gray-50 cursor-pointer text-gray-900'
                : 'opacity-40 cursor-not-allowed text-gray-400'
            }`}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next card"
            className={`w-10 h-10 rounded-xl border border-black bg-white flex items-center justify-center transition-all ${
              canScrollRight
                ? 'hover:bg-gray-50 cursor-pointer text-gray-900'
                : 'opacity-40 cursor-not-allowed text-gray-400'
            }`}
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowcaseCarousel
