'use client'

import React from 'react'
import { Card } from '@/components/ui'

interface ServiceItem {
  id: string
  title: string
  description: string
  image: string
}

const servicesList: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Applications',
    description: 'Custom high-speed web apps, client portals, and scalable SaaS platforms built with modern full-stack technologies.',
    image: '/what-build/web-dev.png'
  },
  {
    id: 'dev-apps',
    title: 'Mobile Applications',
    description: 'Cross-platform iOS and Android apps engineered with seamless performance, intuitive UX, and robust backend APIs.',
    image: '/what-build/dev-apps.png'
  },
  {
    id: 'ai-integrated',
    title: 'AI & Smart Automations',
    description: 'Custom AI agent integrations, RAG knowledge bases, intelligent workflow automations, and 24/7 live chatbots.',
    image: '/what-build/ai-integrated.png'
  },
  {
    id: 'branding-design',
    title: 'UI/UX & System Design',
    description: 'Modern, conversion-driven digital interfaces, wireframes, and scalable design systems that captivate your users.',
    image: '/what-build/branding-design.png'
  }
]

export default function WhatWeBuild() {
  return (
    <section id="what-we-build" className="py-16 lg:py-20 px-4 sm:px-6 bg-white border-t border-black relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header - Clean & Direct */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What We Build
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
            High-performance digital products engineered for modern scaling businesses.
          </p>
        </div>

        {/* 4 Compact Cards with clean modern aesthetic (no hover / no shadows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesList.map((service) => (
            <Card
              key={service.id}
              variant="white"
              rounded="2xl"
              className="p-4 sm:p-5 flex flex-col justify-between"
            >
              {/* Asset Container with border and soft rounded */}
              <div className="w-full h-40 sm:h-44 bg-gray-50 border border-black/15 rounded-2xl mb-3.5 flex items-center justify-center overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain scale-110 pointer-events-none select-none"
                />
              </div>

              {/* Title & Short Description */}
              <div className="pt-1">
                <h3
                  className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {service.title}
                </h3>

                <p className="text-gray-600 text-xs sm:text-[13px] font-normal leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
