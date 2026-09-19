'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { Button, ProjectGridSkeleton, ImageScrollCard, SectionHeader } from '@/components/ui'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  second_image_url?: string
  client_name: string
  link: string
}

const pastelBgs = [
  'bg-[#DFEDFA]',
  'bg-[#FCF8D5]',
  'bg-[#DEE2E8]',
  'bg-[#DBFA50]',
  'bg-[#FDE2E4]',
  'bg-[#E2F0CB]',
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (err) {
        console.error('Error fetching all projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full flex-1">
        <SectionHeader
          title="All Projects"
          description="Explore our complete portfolio of digital products, web applications, and digital systems."
          align="center"
        />

        {loading ? (
          <div className="mt-12">
            <ProjectGridSkeleton count={6} mode="landing" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 mt-12 border border-dashed border-gray-300 rounded-3xl">
            <h3 className="text-xl font-bold text-gray-500">Belum ada project</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12 animate-in fade-in duration-500">
            {projects.map((project, index) => {
              const bgClass = pastelBgs[index % pastelBgs.length]
              
              return (
                <div key={project.id} className="flex flex-col h-full group/card">
                  <ImageScrollCard
                    src={project.image_url}
                    alt={project.title}
                    bgClass={bgClass}
                    speed={220}
                    className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-black"
                  />
                  <div className="pt-2.5 sm:pt-4 md:pt-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-sm sm:text-lg md:text-2xl line-clamp-2 font-bold text-gray-900 tracking-tight leading-snug"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {project.title}
                      </h3>
                      {project.client_name && (
                        <span className="text-[10px] sm:text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                          {project.client_name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm md:text-[15px] line-clamp-2 sm:line-clamp-3 mt-1 sm:mt-2 text-gray-600 leading-relaxed font-normal">
                      {project.description}
                    </p>
                    {project.link && project.link !== '#' && (
                      <div className="pt-2 sm:pt-3 mt-auto">
                        <Button
                          variant="white"
                          size="sm"
                          shape="pill"
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          iconRight={<ArrowUpRight size={13} />}
                          className="text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4"
                        >
                          View Live Project
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
