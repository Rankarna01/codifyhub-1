'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { Button, ProjectGridSkeleton, Carousel, SectionHeader, ImageScrollCard, GsapSection } from '@/components/ui'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  second_image_url?: string
  client_name: string
  link: string
  hasCloudBadge?: boolean
}


// Exact 4 projects with tall full-page website previews that scroll on hover
const defaultProjects: Project[] = [
  {
    id: 'smartlearn',
    title: 'SmartLearn – AI Education App',
    description: 'An AI-powered learning app designed to make education interactive and engaging for students.',
    image_url: '/features/smartlearn-full.webp',
    client_name: 'AI Education',
    link: '#'
  },
  {
    id: 'florynce',
    title: 'Florynce - Skincare E-commerce Website',
    description: 'An elegant Shopify store designed to showcase skincare products and improve online shopping experience.',
    image_url: '/features/florynce-full.webp',
    client_name: 'E-Commerce Store',
    link: '#'
  },
  {
    id: 'qortrade',
    title: 'QorTrade – Stock Management CRM',
    description: 'A powerful SaaS dashboard designed to simplify inventory tracking and business operations.',
    image_url: '/features/qortrade-full.webp',
    client_name: 'SaaS CRM',
    link: '#',
    hasCloudBadge: true
  },
  {
    id: 'swiftbite',
    title: 'SwiftBite - Food Delivery App',
    description: 'A modern food ordering app designed for seamless browsing, ordering, and checkout.',
    image_url: '/features/swiftbite-full.webp',
    client_name: 'Food & Delivery',
    link: '#'
  }
]

// Pastel background palette directly matching the 4 reference cards
const pastelBgs = [
  'bg-[#DFEDFA]', // Card 1: Soft Pastel Sky Blue
  'bg-[#FCF8D5]', // Card 2: Soft Pastel Light Yellow
  'bg-[#DEE2E8]', // Card 3: Soft Muted Slate Gray
  'bg-[#DBFA50]'  // Card 4: Vibrant Pastel Lime
]

interface ProjectCardProps {
  project: Project
  index: number
  isCompact?: boolean
}

function ProjectCard({ project, index, isCompact = false }: ProjectCardProps) {
  const bgClass = pastelBgs[index % pastelBgs.length]

  return (
    <div className="flex flex-col h-full group/card">
      {/* Top Mockup Frame with ImageScrollCard (smooth full-page scroll to bottom on hover) */}
      <ImageScrollCard
        src={project.image_url}
        alt={project.title}
        bgClass={bgClass}
        speed={220}
        className={`aspect-[4/3] sm:aspect-[16/11] ${
          isCompact ? 'rounded-2xl sm:rounded-[28px] md:rounded-[32px]' : 'rounded-[28px] sm:rounded-[32px]'
        } border border-black`}
      />

      {/* Bottom Text Details directly under the frame without hover / shadow */}
      <div className={`${isCompact ? 'pt-2.5 sm:pt-4 md:pt-5' : 'pt-4 sm:pt-5'} flex-1 flex flex-col`}>
        <h3
          className={`${
            isCompact
              ? 'text-sm sm:text-lg md:text-2xl line-clamp-2'
              : 'text-xl sm:text-2xl'
          } font-bold text-gray-900 tracking-tight leading-snug`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {project.title}
        </h3>

        <p
          className={`${
            isCompact
              ? 'text-xs sm:text-sm md:text-[15px] line-clamp-2 sm:line-clamp-3 mt-1 sm:mt-2'
              : 'text-sm sm:text-[15px] mt-2'
          } text-gray-600 leading-relaxed font-normal`}
        >
          {project.description}
        </p>

        {project.link && project.link !== '#' && (
          <div className={`${isCompact ? 'pt-2 sm:pt-3' : 'pt-3'} mt-auto`}>
            <Button
              variant="white"
              size="sm"
              shape="pill"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              iconRight={<ArrowUpRight size={13} />}
              className={isCompact ? 'text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4' : ''}
            >
              View Live Project
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6)

        if (data && data.length > 0) {
          // Merge with default projects fallback if fewer than 4 exist
          const merged = data.length >= 4 
            ? data 
            : [...data, ...defaultProjects.slice(data.length)]
          setProjects(merged)
        } else {
          setProjects(defaultProjects)
        }
      } catch (err) {
        console.error('Error fetching portfolio projects:', err)
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const displayProjects = projects.length > 0 ? projects : defaultProjects

  return (
    <GsapSection id="portofolio" className="py-20 sm:py-24 px-4 sm:px-6 bg-white border-t border-black">
      <div className="max-w-7xl mx-auto gsap-section-content">
        {/* Section Header - Centered & Compact with Responsive View Switcher */}
        <div className="gsap-reveal">
          <SectionHeader
            title="Selected Work & Digital Systems"
            description="A showcase of production web applications, cross-platform mobile systems, and intelligent digital tools engineered for real-world impact."
          >
            {/* Responsive View Switcher: 2 Grid vs Carousel */}
            <div className="inline-flex items-center p-1 bg-gray-100 border border-black rounded-full select-none shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
                aria-label="Tampilan 2 Grid"
              >
                <LayoutGrid size={14} />
                <span>2 Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-white/60'
                }`}
                aria-label="Tampilan Carousel"
              >
                <SlidersHorizontal size={14} />
                <span>Carousel</span>
              </button>
            </div>
          </SectionHeader>
        </div>

        <div className="gsap-reveal">
          {loading ? (
            <ProjectGridSkeleton count={4} mode="landing" />
          ) : viewMode === 'grid' ? (
            /* 2 GRID STYLE (Responsive 2-column layout on mobile, tablet & desktop) */
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:gap-8 lg:gap-12 animate-in fade-in duration-300">
              {displayProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} isCompact={true} />
              ))}
            </div>
          ) : (
            /* CAROUSEL STYLE (Continuous auto-scroll, smooth snap swipe, never stops on cursor) */
            <div className="animate-in fade-in duration-300">
              <Carousel
                onlyMobile={false}
                autoScroll={true}
                autoScrollInterval={3500}
                pauseOnHover={false}
                itemClassName="w-[85vw] sm:w-[calc(50%-12px)] md:w-[480px] lg:w-[580px] shrink-0 snap-center px-1"
                className="w-full"
                showDots={true}
                showArrows={true}
              >
                {displayProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} isCompact={false} />
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </GsapSection>
  )
}
