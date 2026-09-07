'use client'

import React from 'react'
import Image from 'next/image'
import { Badge, SectionHeader, GsapSection } from '@/components/ui'

export default function TechnologySystems() {
  return (
    <GsapSection id="technology" className="py-20 lg:py-28 px-4 sm:px-6 bg-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 gsap-section-content">
        {/* Section Header - Centered & Compact */}
        <div className="gsap-reveal">
          <SectionHeader
            badge={<Badge variant="accent" size="sm">TECHNOLOGY &amp; SYSTEMS</Badge>}
            title="AI-Powered. Developer-Built. Production-Ready."
            description="The technology behind every CodifyHub solution."
            maxWidth="max-w-4xl"
          />
        </div>

        {/* System Diagram Architecture */}
        <div className="relative max-w-5xl mx-auto flex items-center justify-center gsap-reveal">
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
    </GsapSection>
  )
}
