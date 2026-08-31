'use client'

import React, { useState } from 'react'
import { ArrowRight, Sparkles, Layers, Smartphone, Bot, Palette, CheckCircle2 } from 'lucide-react'
import { Card, Badge, Button } from '@/components/ui'
import OrderModal from '@/components/ui/OrderModal'

interface ServiceItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  badgeText: string
  icon: React.ElementType
  tags: string[]
}

const servicesList: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Applications & SaaS',
    subtitle: 'High-Performance Fullstack',
    description: 'Custom responsive websites, enterprise SaaS dashboards, and fast web portals built with Next.js, React, and Laravel.',
    image: '/what-build/web-dev.png',
    badgeText: 'Web & SaaS',
    icon: Layers,
    tags: ['Next.js', 'React', 'Laravel', 'TypeScript']
  },
  {
    id: 'dev-apps',
    title: 'Mobile App Development',
    subtitle: 'Cross-Platform iOS & Android',
    description: 'Seamless mobile applications engineered with React Native and Flutter, featuring intuitive UX and robust backend synchronization.',
    image: '/what-build/dev-apps.png',
    badgeText: 'Mobile Apps',
    icon: Smartphone,
    tags: ['React Native', 'Flutter', 'iOS & Android', 'APIs']
  },
  {
    id: 'ai-integrated',
    title: 'AI Agents & Live Chatbots',
    subtitle: 'Intelligent Automations',
    description: 'Empower your business with OpenAI/LLM integration, RAG knowledge bases, 24/7 intelligent live chatbots, and automated workflows.',
    image: '/what-build/ai-integrated.png',
    badgeText: 'AI & Automation',
    icon: Bot,
    tags: ['OpenAI', 'LangChain', 'RAG Agents', 'Chatbot']
  },
  {
    id: 'branding-design',
    title: 'UI/UX & Branding Systems',
    subtitle: 'Conversion-Focused Design',
    description: 'High-fidelity wireframes, complete brand identity kits, and responsive design systems that captivate users and maximize conversion.',
    image: '/what-build/branding-design.png',
    badgeText: 'Design Systems',
    icon: Palette,
    tags: ['Figma', 'UI/UX', 'Design System', 'Branding']
  }
]

export default function WhatWeBuild() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section id="what-we-build" className="py-20 lg:py-24 px-4 sm:px-6 bg-[#F8FAFC] border-t-2 border-black relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            <Badge variant="accent" size="md" className="mb-4">
              ✦ WHAT WE BUILD
            </Badge>

            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tailored Solutions For Modern Businesses
            </h2>

            <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed">
              From enterprise SaaS applications to autonomous AI workflows, we deliver production-ready software engineered for scale and speed.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {servicesList.map((service) => {
              const IconComponent = service.icon

              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col h-full bg-white border-2 border-black rounded-2xl shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#3B82F6] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 overflow-hidden"
                >
                  {/* Visual Header with Image Mockup */}
                  <div className="bg-[#EFF6FF] border-b-2 border-black p-4 flex items-center justify-center relative overflow-hidden h-52 sm:h-56">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    />
                    
                    {/* Top Right Mini Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                        <IconComponent size={16} className="text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      {/* Pill Badge */}
                      <Badge variant="accent" size="sm" className="mb-3">
                        {service.badgeText}
                      </Badge>

                      {/* Service Title */}
                      <h3
                        className="text-xl font-black text-gray-900 mb-1 leading-snug group-hover:text-blue-600 transition-colors"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {service.title}
                      </h3>

                      <p className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">
                        {service.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed mb-5 font-medium">
                        {service.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills & CTA */}
                    <div className="pt-4 border-t-2 border-black/10 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-gray-100 border border-black/20 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="white"
                        size="sm"
                        fullWidth
                        shape="default"
                        onClick={() => setIsModalOpen(true)}
                        iconRight={<ArrowRight size={14} />}
                        className="text-xs group-hover:bg-[#3B82F6] group-hover:text-white group-hover:border-black transition-colors"
                      >
                        Consult This Service
                      </Button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
