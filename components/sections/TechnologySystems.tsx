'use client'

import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui'

export default function TechnologySystems() {
  return (
    <section id="technology" className="py-20 lg:py-28 px-4 sm:px-6 bg-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <Badge variant="accent" size="md" className="mb-4">
            TECHNOLOGY & SYSTEMS
          </Badge>
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-[1.12]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            AI-Powered. Developer-Built. Production-Ready.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            The technology behind every CodifyHub solution.
          </p>
        </div>

        {/* System Diagram Architecture */}
        <div className="relative max-w-5xl mx-auto flex items-center justify-center">
          <div className="w-full relative group transition-all duration-300">
            <Image
              src="/sections-tech/design-tech.webp"
              alt="CodifyHub AI-Powered and Developer-Built Technology & Systems Architecture"
              width={1851}
              height={849}
              priority
              className="w-full h-auto object-contain drop-shadow-sm select-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
