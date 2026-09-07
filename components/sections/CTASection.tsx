'use client'

import React, { useState } from 'react'
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button, Card, Badge, SectionHeader, GsapSection } from '@/components/ui'
import OrderModal from '@/components/ui/OrderModal'

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <GsapSection id="pesan" className="py-24 px-4 sm:px-6 bg-[#0A192F] relative overflow-hidden border-t border-black">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10 gsap-section-content">
          <Card
            variant="accent"
            rounded="3xl"
            className="p-8 sm:p-14 text-center relative overflow-hidden"
          >
            {/* Background geometric accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#55DE8F]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              {/* Header - Centered, Dark Theme & Compact */}
              <div className="gsap-reveal">
                <SectionHeader
                  theme="dark"
                  badge={<Badge variant="navy" size="md">✦ SIAP MEMULAI PROJECT ANDA?</Badge>}
                  title={<>Wujudkan Skripsi &amp; Sistem Impian Sekarang</>}
                  description="Konsultasikan ide Anda secara gratis tanpa komitmen. Tim kami siap membantu pengerjaan dari nol hingga selesai tuntas bergaransi."
                  descriptionClassName="text-blue-100"
                  className="mb-8"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 gsap-reveal">
                <Button
                  variant="primary"
                  size="xl"
                  shape="default"
                  onClick={() => setIsModalOpen(true)}
                  iconLeft={<MessageCircle size={20} />}
                  className="text-base sm:text-lg w-full sm:w-auto"
                >
                  Konsultasi via WhatsApp
                </Button>

                <Button
                  variant="white"
                  size="xl"
                  shape="default"
                  href="#portofolio"
                  iconRight={<ArrowRight size={20} />}
                  className="text-base sm:text-lg w-full sm:w-auto"
                >
                  Lihat Portofolio
                </Button>
              </div>

              {/* Stats Footer in CTA */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/20 gsap-reveal">
                {[
                  { value: '2.500+', label: 'Project Selesai' },
                  { value: '99.4%', label: 'Tingkat ACC & Lulus' },
                  { value: '24/7', label: 'Fast Support' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl sm:text-4xl font-black text-white mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </p>
                    <p className="text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </GsapSection>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
