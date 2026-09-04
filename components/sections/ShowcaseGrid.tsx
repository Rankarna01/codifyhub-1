'use client'

import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export interface ShowcaseImage {
  id: string
  title: string
  image: string
  link?: string
}

// 4 Grid Images awal
export const showcaseImages: ShowcaseImage[] = [
  {
    id: '1',
    title: 'CodifyHub Platform Showcase',
    image: '/features/assets.png',
    link: '#'
  },
  {
    id: '2',
    title: 'Mobile Application System',
    image: '/features/assets2.png',
    link: '#'
  },
  {
    id: '3',
    title: 'AI Smart Integration Platform',
    image: '/features/assets3.png',
    link: '#'
  },
  {
    id: '4',
    title: 'High-Performance Web App',
    image: '/features/assets4.png',
    link: '#'
  }
]

export default function ShowcaseGrid() {
  return (
    <section
      id="showcase-grid"
      className="py-12 lg:py-16 px-4 sm:px-6 bg-[var(--dark-bg)] text-white border-t border-black relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-6 right-6 w-[350px] h-[200px] bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - Rapi & Sejajar Responsif */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Projects that{' '}
              <span className="text-[#3B82F6]">
                speak for themselves
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-gray-400 text-xs sm:text-sm font-normal leading-relaxed max-w-xs">
              Selected work that shows what we do, how we think, and what it leads to.
            </p>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200 active:scale-95"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="w-9 h-9 rounded-xl bg-white hover:bg-white/90 text-black flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 1. Desktop Mode: 2x2 Grid (Statis, clean border, no hover) */}
        <div className="hidden md:grid md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
          {showcaseImages.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl sm:rounded-3xl bg-[var(--dark-card)] border border-[var(--dark-card-border)] overflow-hidden aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center select-none"
            >
              {/* Full Image Container */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* 2. Responsive / Mobile Mode: Marquee Bergerak Otomatis */}
        <div className="block md:hidden overflow-hidden w-full -mx-4 px-4 py-2">
          <div className="flex gap-3.5 w-max marquee-track">
            {/* Duplikasi list gambar untuk continuous infinite loop */}
            {[...showcaseImages, ...showcaseImages].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[82vw] max-w-[340px] aspect-[4/3] shrink-0 rounded-2xl bg-[var(--dark-card)] border border-[var(--dark-card-border)] overflow-hidden relative flex items-center justify-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
