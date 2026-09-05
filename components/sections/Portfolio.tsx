'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { Badge, Button, ProjectGridSkeleton, Carousel } from '@/components/ui'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  client_name: string
  link: string
  hasCloudBadge?: boolean
}

// Scalloped / Cloud "See Details" Sticker matching Card 3 in reference image
function ScallopDetailsBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none drop-shadow-sm ${className}`}>
      <svg viewBox="0 0 160 76" className="w-28 sm:w-36 h-14 sm:h-18 fill-white stroke-black stroke-[1.8] overflow-visible">
        <path d="M 28 40 C 24 32 26 21 36 16 C 46 11 58 15 63 14 C 68 10 78 7 90 8 C 102 9 110 15 116 15 C 124 13 134 17 137 26 C 141 34 137 44 133 50 C 137 57 134 66 125 69 C 116 72 106 68 101 69 C 95 73 83 74 74 71 C 65 68 59 63 53 65 C 44 66 35 62 31 54 C 27 46 29 42 28 40 Z" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold text-gray-900">
        See Details <ArrowUpRight size={13} strokeWidth={2.5} />
      </span>
    </div>
  )
}

// Exact 4 projects from the user's reference image
const defaultProjects: Project[] = [
  {
    id: 'smartlearn',
    title: 'SmartLearn – AI Education App',
    description: 'An AI-powered learning app designed to make education interactive and engaging for students.',
    image_url: '/features/assets2.png',
    client_name: 'AI Education',
    link: '#'
  },
  {
    id: 'florynce',
    title: 'Florynce - Skincare E-commerce Website',
    description: 'An elegant Shopify store designed to showcase skincare products and improve online shopping experience.',
    image_url: '/features/assets.png',
    client_name: 'E-Commerce Store',
    link: '#'
  },
  {
    id: 'qortrade',
    title: 'QorTrade – Stock Management CRM',
    description: 'A powerful SaaS dashboard designed to simplify inventory tracking and business operations.',
    image_url: '/features/assets3.png',
    client_name: 'SaaS CRM',
    link: '#',
    hasCloudBadge: true
  },
  {
    id: 'swiftbite',
    title: 'SwiftBite - Food Delivery App',
    description: 'A modern food ordering app designed for seamless browsing, ordering, and checkout.',
    image_url: '/features/assets4.png',
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
  const badgeVariants: ('accent' | 'mint' | 'blue' | 'coral' | 'purple')[] = ['accent', 'mint', 'blue', 'coral', 'purple']
  const badgeVar = badgeVariants[index % badgeVariants.length]
  const bgClass = pastelBgs[index % pastelBgs.length]
  const showCloudBadge = project.hasCloudBadge || index === 2

  return (
    <div className="flex flex-col h-full">
      {/* Top Mockup Frame with thin black border & rounded corners */}
      <div
        className={`w-full aspect-[4/3] sm:aspect-[16/11] ${
          isCompact ? 'rounded-2xl sm:rounded-[28px] md:rounded-[32px]' : 'rounded-[28px] sm:rounded-[32px]'
        } border border-black overflow-hidden relative flex items-center justify-center select-none ${bgClass}`}
      >
        {project.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-xs font-bold">
            [Preview Unavailable]
          </div>
        )}

        {/* Category / Client Pill Tag */}
        {project.client_name && (
          <div className={`absolute ${isCompact ? 'top-2.5 left-2.5 sm:top-4 sm:left-4' : 'top-4 left-4'} z-10`}>
            <Badge
              variant={badgeVar}
              size="sm"
              className={isCompact ? 'text-[10px] sm:text-xs py-0.5 px-2' : ''}
            >
              {project.client_name}
            </Badge>
          </div>
        )}

        {/* Scalloped "See Details ↗" Sticker Badge */}
        {showCloudBadge && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className={isCompact ? 'transform scale-75 sm:scale-90 md:scale-100 origin-center' : ''}>
              <ScallopDetailsBadge />
            </div>
          </div>
        )}
      </div>

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
    <section id="portofolio" className="py-20 sm:py-24 px-4 sm:px-6 bg-white border-t border-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Responsive Style Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Selected Work &amp; Digital Systems
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed mt-3 max-w-xl">
              A showcase of production web applications, cross-platform mobile systems, and intelligent digital tools engineered for real-world impact.
            </p>
          </div>

          {/* Responsive View Switcher: 2 Grid vs Carousel */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
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
          </div>
        </div>

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
    </section>
  )
}
