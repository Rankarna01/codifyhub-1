'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { Badge, Button, ProjectGridSkeleton } from '@/components/ui'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  client_name: string
  link: string
}

const defaultProjects: Project[] = [
  {
    id: 'smartlearn',
    title: 'SmartLearn – AI Education App',
    description: 'An AI-powered learning app designed to make education interactive and engaging for students.',
    image_url: '/features/assets2.png',
    client_name: 'Mobile App',
    link: '#'
  },
  {
    id: 'florynce',
    title: 'Florynce - Skincare E-commerce Website',
    description: 'An elegant Shopify store designed to showcase skincare products and improve online shopping experience.',
    image_url: '/features/assets.png',
    client_name: 'E-Commerce',
    link: '#'
  },
  {
    id: 'healthsync',
    title: 'HealthSync – Clinic Management System',
    description: 'Cloud-based medical records and online appointment scheduling system for multi-branch clinics.',
    image_url: '/features/assets3.png',
    client_name: 'Web Application',
    link: '#'
  },
  {
    id: 'poskasir',
    title: 'POS Kasir Pintar – Retail & Multi-outlet',
    description: 'Integrated cashier POS with real-time barcode scanning, inventory tracking, and sales analytics.',
    image_url: '/features/assets4.png',
    client_name: 'Business System',
    link: '#'
  }
]

const pastelBgs = ['bg-[#E8F1FD]', 'bg-[#FEF8D8]', 'bg-[#EAFBF1]', 'bg-[#F3E8FF]']

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6)

        if (data && data.length > 0) {
          setProjects(data)
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
    <section id="portofolio" className="py-24 px-4 sm:px-6 bg-white border-t border-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
          <div>
            <Badge variant="mint" size="md" className="mb-3">
              HASIL KERJA KAMI
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Portofolio Project
            </h2>
          </div>
          <p className="text-gray-600 max-w-sm text-sm sm:text-base font-medium">
            Sebagian dari ratusan sistem dan website yang telah kami kerjakan dengan standar industri.
          </p>
        </div>

        {loading ? (
          <ProjectGridSkeleton count={4} mode="landing" />
        ) : (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {displayProjects.map((project, i) => {
              const badgeVariants: ('accent' | 'mint' | 'blue' | 'coral' | 'purple')[] = ['accent', 'mint', 'blue', 'coral', 'purple']
              const badgeVar = badgeVariants[i % badgeVariants.length]
              const bgClass = pastelBgs[i % pastelBgs.length]

              return (
                <div key={project.id} className="flex flex-col">
                  {/* Top Image Mockup Frame with thin black border & rounded-3xl (matching reference image) */}
                  <div
                    className={`w-full aspect-[16/11] sm:aspect-[4/3] rounded-[28px] border border-black overflow-hidden relative flex items-center justify-center select-none ${bgClass}`}
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
                        [Preview Tidak Tersedia]
                      </div>
                    )}
                    {project.client_name && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant={badgeVar} size="sm">
                          {project.client_name}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Bottom Text Details directly under the frame without hover / shadow */}
                  <div className="pt-4 sm:pt-5 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-gray-600 mt-2 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {project.link && (
                      <div className="pt-3 mt-auto">
                        <Button
                          variant="white"
                          size="sm"
                          shape="pill"
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          iconRight={<ArrowUpRight size={14} />}
                        >
                          Lihat Live Project
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
    </section>
  )
}
