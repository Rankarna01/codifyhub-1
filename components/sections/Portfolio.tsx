'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { Card, Badge, Button, ProjectGridSkeleton } from '@/components/ui'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  client_name: string
  link: string
}

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
        
        if (data) setProjects(data)
      } catch (err) {
        console.error('Error fetching portfolio projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="portofolio" className="py-24 px-4 sm:px-6 bg-white">
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
          <ProjectGridSkeleton count={6} mode="landing" />
        ) : projects.length === 0 ? (
          <Card variant="slate" shadowSize="md" rounded="2xl" className="text-center py-16 px-6">
            <div className="w-14 h-14 bg-white rounded-xl border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_#000]">
              <FolderGit2 size={24} className="text-black" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Portofolio Segera Ditampilkan</h3>
            <p className="text-gray-600 font-medium text-sm max-w-md mx-auto">
              Hubungi tim kami untuk melihat sample live demo pengerjaan website, sistem skripsi, atau aplikasi bisnis sebelumnya.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => {
              const badgeVariants: ('accent' | 'mint' | 'blue' | 'coral' | 'purple')[] = ['accent', 'mint', 'blue', 'coral', 'purple']
              const badgeVar = badgeVariants[i % badgeVariants.length]

              return (
                <Card
                  key={project.id}
                  variant="white"
                  interactive
                  shadowSize="md"
                  rounded="2xl"
                  className="flex flex-col group overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 border-b-2 border-black flex-shrink-0">
                    {project.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#FFF9E5] text-gray-400 font-mono text-xs font-bold">
                        [Preview Tidak Tersedia]
                      </div>
                    )}
                    {project.client_name && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge variant={badgeVar} size="sm">
                          {project.client_name}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-medium">
                      {project.description}
                    </p>

                    {project.link && (
                      <Button
                        variant="white"
                        size="sm"
                        shape="default"
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        iconRight={<ArrowUpRight size={14} />}
                        className="mt-auto w-full"
                      >
                        Lihat Live Project
                      </Button>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
