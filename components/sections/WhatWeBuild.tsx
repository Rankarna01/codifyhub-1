'use client'

import React from 'react'

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
    <section id="what-we-build" className="py-16 lg:py-20 px-4 sm:px-6 bg-white border-t-2 border-black relative">
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

        {/* 4 Compact Cards with Enlarged Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="group bg-white border-2 border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#3B82F6] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Enlarged Visual Asset Container with tight height and zoomed image */}
              <div className="w-full h-40 sm:h-44 bg-white rounded-xl mb-3 flex items-center justify-center overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain scale-120 sm:scale-125 group-hover:scale-130 transition-transform duration-300 pointer-events-none select-none"
                />
              </div>

              {/* Title & Short Description */}
              <div className="pt-1">
                <h3
                  className="text-base sm:text-lg font-black text-gray-900 mb-1.5 leading-snug group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {service.title}
                </h3>

                <p className="text-gray-600 text-xs sm:text-[13px] font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
