'use client'

import React from 'react'
import { Star, Quote } from 'lucide-react'
import { Card, Badge, SectionHeader, GsapSection } from '@/components/ui'

const testimonials = [
  {
    name: 'Reza Pratama',
    role: 'Mahasiswa Teknik Informatika, UNAIR',
    text: 'Sempurna banget! Skripsi sistem informasiku selesai jauh sebelum deadline dan coding-nya rapi banget. Dosen pembimbing juga puas. Highly recommended!',
    rating: 5,
    avatar: 'R',
    badgeVariant: 'yellow' as const,
    cardVariant: 'white' as const
  },
  {
    name: 'Siti Rahayu',
    role: 'Owner Butik Batik Nusantara',
    text: 'Website tokonya keren banget, order online langsung naik 3x lipat dalam sebulan pertama. Pelayanan tim CodifyHub juga cepat dan responsif.',
    rating: 5,
    avatar: 'S',
    badgeVariant: 'mint' as const,
    cardVariant: 'white' as const
  },
  {
    name: 'Budi Santoso',
    role: 'IT Manager, PT. Maju Bersama',
    text: 'Sistem inventory yang mereka buat sudah sangat membantu operasional gudang kami. Fitur barcode scan-nya akurat dan dashboard-nya mudah dipakai semua staff.',
    rating: 5,
    avatar: 'B',
    badgeVariant: 'blue' as const,
    cardVariant: 'white' as const
  },
  {
    name: 'Anisa Wulandari',
    role: 'Mahasiswi S1 Sistem Informasi, ITS',
    text: 'Awalnya ragu, tapi hasilnya melampaui ekspektasi. Project TA-ku tentang e-learning dikerjain dengan detail dan bisa saya presentasikan dengan percaya diri.',
    rating: 5,
    avatar: 'A',
    badgeVariant: 'purple' as const,
    cardVariant: 'white' as const
  },
]

export default function Testimonials() {
  return (
    <GsapSection id="testimonial" className="py-24 px-4 sm:px-6 bg-white border-t border-black">
      <div className="max-w-7xl mx-auto gsap-section-content">
        
        {/* Section Header - Centered & Compact */}
        <div className="gsap-reveal">
          <SectionHeader
            badge={<Badge variant="accent" size="sm">KATA MEREKA</Badge>}
            title="Testimoni &amp; Pengalaman Klien"
            description="Kepercayaan dan kepuasan mahasiswa &amp; pebisnis adalah prioritas utama kami."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 gsap-reveal">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              variant="white"
              rounded="3xl"
              className="p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-black fill-[#3B82F6]" />
                    ))}
                  </div>
                  <Quote size={24} className="text-gray-300" />
                </div>
                
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  &quot;{t.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-black/10 mt-auto">
                <div className="w-11 h-11 rounded-full border border-black bg-[#3B82F6] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">{t.name}</p>
                  <p className="text-gray-500 text-xs font-semibold">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </GsapSection>
  )
}
