'use client'

import React, { useState } from 'react'
import { CheckCircle2, Terminal, Code, Cpu, Database, Globe, Wrench, Sparkles, ArrowRight } from 'lucide-react'
import { servicesData } from '@/data/services'
import { Button, Card, Badge, Accordion, SectionHeader, GsapSection } from '@/components/ui'

const techSolutions = [
  { title: 'Web App', icon: Globe, desc: 'Next.js, React, Tailwind' },
  { title: 'Skripsi & TA', icon: Terminal, desc: 'Sistem Informasi & Demo' },
  { title: 'Backend & API', icon: Database, desc: 'Laravel, Node.js, Python' },
  { title: 'Sistem Kasir', icon: Cpu, desc: 'POS, Inventory & UMKM' },
  { title: 'Fix Bug & Revisi', icon: Wrench, desc: 'Debug & Optimalisasi' },
]

const faqs = [
  {
    id: 1,
    title: 'Bagaimana cara pemesanan project atau joki skripsi di CodifyHub?',
    content: 'Cukup pilih paket yang diinginkan lalu klik tombol "Pilih Paket" atau "Konsultasi Gratis". Anda akan terhubung langsung dengan tim developer kami via WhatsApp untuk diskusi detail, deadline, dan alur pengerjaan.'
  },
  {
    id: 2,
    title: 'Apakah ada garansi revisi jika ada catatan dari dosen/klien?',
    content: 'Ya, tentu! Setiap paket sudah mencakup garansi revisi. Untuk paket Skripsi/Sistem kami berikan revisi dan pendampingan sampai selesai dan di-ACC.'
  },
  {
    id: 3,
    title: 'Berapa lama estimasi pengerjaan project?',
    content: 'Tergantung kompleksitas fitur. Tugas kuliah biasa bisa 1-3 hari, website UMKM 3-7 hari, dan sistem skripsi atau custom app skala menengah berkisar 1-3 minggu.'
  },
  {
    id: 4,
    title: 'Apakah source code dan database diberikan penuh?',
    content: 'Ya! 100% source code, database SQL, dan panduan konfigurasi menjadi milik Anda sepenuhnya tanpa biaya tersembunyi.'
  }
]

export default function Services() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id)
  const currentCategory = servicesData.find(c => c.id === activeTab)

  return (
    <GsapSection id="layanan" className="py-24 px-4 sm:px-6 bg-[#FFFDF7] border-y border-black">
      <div className="max-w-7xl mx-auto gsap-section-content">
        
        {/* Section Header - Centered & Compact */}
        <div className="gsap-reveal">
          <SectionHeader
            badge={<Badge variant="accent" size="sm">PILIHAN PAKET &amp; LAYANAN</Badge>}
            title="Layanan &amp; Harga Spesial"
            description="Pilih paket yang paling sesuai dengan kebutuhan Anda, dari Mahasiswa hingga Perusahaan."
          />
        </div>

        {/* Reference Image 3 Style: "Multiple Ways to Play / Berbagai Pilihan Solusi" */}
        {/* <div className="mb-16">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Berbagai Pilihan Solusi Digital
            </h3>
            <p className="text-gray-600 text-sm font-medium">Pengembangan sistem custom dengan teknologi terkini</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {techSolutions.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card
                  key={idx}
                  variant="white"
                  rounded="2xl"
                  className="p-5 text-center flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-black flex items-center justify-center mb-3">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-[11px] font-medium leading-tight">{item.desc}</p>
                </Card>
              )
            })}
          </div>
        </div> */}

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 gsap-reveal">
          {servicesData.map(category => (
            <Button
              key={category.id}
              variant={activeTab === category.id ? 'navy' : 'white'}
              size="md"
              shape="pill"
              onClick={() => setActiveTab(category.id)}
              className="text-sm font-bold"
            >
              {category.title}
            </Button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 gsap-reveal">
          {currentCategory?.packages.map((pkg) => (
            <Card
              key={pkg.id}
              variant={pkg.isPopular ? 'accent' : 'white'}
              rounded="3xl"
              className={`flex flex-col relative ${pkg.isPopular ? 'ring-1 ring-black' : ''}`}
            >
              {pkg.isPopular && (
                <div className="bg-black text-white text-center text-xs font-black py-2 tracking-wider uppercase border-b border-black flex items-center justify-center gap-1.5">
                  <Sparkles size={14} className="text-[#60A5FA]" />
                  <span>PALING POPULER & DIREKOMENDASIKAN</span>
                </div>
              )}

              <div className="p-7">
                <Badge variant={pkg.isPopular ? 'navy' : 'mint'} size="sm" className="mb-3">
                  {pkg.target}
                </Badge>
                <h3 className={`text-2xl font-black mb-2 ${pkg.isPopular ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-display)' }}>
                  {pkg.name}
                </h3>
                <p className={`text-xs sm:text-sm mb-6 min-h-[42px] leading-relaxed font-medium ${pkg.isPopular ? 'text-blue-100' : 'text-gray-700'}`}>
                  {pkg.description}
                </p>

                <div className="mb-6 bg-white/95 p-4 rounded-2xl border border-black">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-500 line-through text-xs font-bold">{pkg.originalPrice}</span>
                    <Badge variant="coral" size="sm" hasShadow={false} className="text-[10px]">
                      DISKON SPESIAL
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                      {pkg.price}
                    </span>
                    {pkg.period && <span className="text-gray-600 text-xs font-bold">{pkg.period}</span>}
                  </div>
                </div>

                <Button
                  variant={pkg.isPopular ? 'primary' : 'navy'}
                  size="lg"
                  fullWidth
                  shape="default"
                  onClick={() => {
                    const el = document.getElementById('konsultasi') || document.getElementById('pesan')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  iconRight={<ArrowRight size={16} />}
                >
                  Pilih Paket Ini
                </Button>
              </div>

              {/* Feature Checklist */}
              <div className={`p-7 pt-4 flex-1 flex flex-col ${pkg.isPopular ? 'bg-blue-700/40 text-white' : 'bg-white/50 text-gray-800'} border-t border-black mt-auto`}>
                <p className={`text-xs font-black uppercase tracking-wider mb-4 ${pkg.isPopular ? 'text-white' : 'text-gray-900'}`}>
                  Layanan & Fitur yang Didapat:
                </p>
                <ul className="space-y-3">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-[#55DE8F] border border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={12} className="text-black" />
                      </div>
                      <span className={`text-xs sm:text-sm font-semibold leading-tight ${pkg.isPopular ? 'text-blue-50' : 'text-gray-800'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Neo-Brutalist FAQ Accordion */}
        {/* <div className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-8">
            <Badge variant="purple" size="md" className="mb-3">
              FAQ
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-black text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Pertanyaan yang Sering Diajukan
            </h3>
          </div>

          <Accordion items={faqs} variant="white" />
        </div> */}

      </div>
    </GsapSection>
  )
}
