'use client'

import React from 'react'
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'

export interface ShowcaseImage {
  id: string
  title: string
  image: string
  link?: string
}

// 4 Grid Images - Cukup ganti path image / gambarmu di sini
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
      className="py-12 lg:py-16 px-4 sm:px-6 bg-[var(--dark-bg)] text-white border-t-2 border-black relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-6 right-6 w-[350px] h-[200px] bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - Rapat & Presisi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div className="max-w-2xl">
            {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-wide uppercase text-blue-400 mb-2.5 backdrop-blur-md">
              <Sparkles size={13} className="animate-pulse" />
              <span>Engineered for Impact</span>
            </div> */}

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

            {/* Navigation Arrows like the reference */}
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

        {/* 4-Grid Cards Container (2x2 Layout - Sangat Rapat Sesuai Referensi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
          {showcaseImages.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl sm:rounded-3xl bg-[var(--dark-card)] border border-[var(--dark-card-border)] hover:border-[var(--dark-card-hover)] overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center cursor-pointer"
            >
              {/* Subtle Inner Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

              {/* Full Image Container */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
