'use client'

import React from 'react'
import Image from 'next/image'
import { Card, Carousel } from '@/components/ui'

interface ClientLogoItem {
  name: string
  category: string
  src: string
}

const bumnClients: ClientLogoItem[] = [
  { name: 'Bank Indonesia', category: 'Bank Sentral Republik Indonesia', src: '/logo-pt/bi.webp' },
  { name: 'PT Pertamina (Persero)', category: 'Energi & Migas Nasional', src: '/logo-pt/pertamina.webp' },
  { name: 'PT PLN (Persero)', category: 'Kelistrikan & Utilitas', src: '/logo-pt/pln.webp' },
  { name: 'PTPN IV PalmCo', category: 'Agroindustri & Perkebunan BUMN', src: '/logo-pt/ptpn.webp' },
  { name: 'BI Kantor Perwakilan', category: 'Institusi Keuangan Publik', src: '/logo-pt/bi.webp' },
  { name: 'Pertamina Patra Niaga', category: 'Distribusi Energi Nasional', src: '/logo-pt/pertamina.webp' },
]

const privateClients: ClientLogoItem[] = [
  { name: 'PT Sinuraya Mandiri', category: 'Konstruksi & Teknik Industri', src: '/logo-pt/sinuraya.webp' },
  { name: 'PT Sugimura Chemicals', category: 'Manufaktur & Bahan Industri', src: '/logo-pt/sugimura.webp' },
  { name: 'Khairul Imam', category: 'Sektor Usaha & UMKM Berkembang', src: '/logo-pt/khairulimam.webp' },
  { name: 'Mitra Industri Presisi', category: 'Manufaktur & Pabrikasi', src: '/logo-pt/logo1.webp' },
  { name: 'Mitra Solusi Komersial', category: 'Retail & Logistik Modern', src: '/logo-pt/logo2.webp' },
  { name: 'PT Dinamika Prima', category: 'Layanan Korporasi & Bisnis', src: '/logo-pt/logo.webp' },
]

export default function ClientsCarousel() {
  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 bg-[#FAF8F5] border-t border-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ekosistem Klien &amp; <br className="hidden sm:inline" />
            Mitra Terpercaya
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Solusi sistem web, aplikasi kustom, dan otomasi digital yang telah terbukti menggerakkan<br className="hidden sm:inline" /> efisiensi bisnis dari instansi BUMN hingga korporasi swasta.
          </p>
        </div>

        {/* Responsive Carousel: Desktop 2-column Grid, Mobile Smooth Carousel (never stops on cursor hover) */}
        <Carousel
          onlyMobile={true}
          autoScroll={true}
          autoScrollInterval={3500}
          pauseOnHover={false}
          desktopClassName="hidden md:grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-start"
          itemClassName="w-[86vw] max-w-[390px] shrink-0 snap-center px-1"
          className="max-w-4xl mx-auto"
          showDots={true}
          showArrows={true}
        >
          {/* Cluster 1: BUMN & Lembaga Nasional */}
          <div className="flex flex-col">
            <Card
              variant="white"
              rounded="2xl"
              className="w-full p-5 sm:p-7 border border-black"
            >
              <div className="grid grid-cols-3 gap-3.5 sm:gap-4 justify-items-center">
                {bumnClients.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full aspect-square max-w-[96px] bg-white rounded-2xl border border-black/15 flex items-center justify-center p-3.5 sm:p-4 select-none"
                    title={item.name}
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain pointer-events-none select-none"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Cluster Label Below (Consistent Typography) */}
            <div className="text-center pt-4 sm:pt-5">
              <h3
                className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                BUMN &amp; Lembaga Nasional
              </h3>
              <p className="text-sm sm:text-[15px] text-gray-600 mt-1.5 leading-relaxed font-normal">
                Sektor Perbankan, Energi, Utilitas &amp; Perkebunan
              </p>
            </div>
          </div>

          {/* Cluster 2: Korporasi Swasta & UMKM */}
          <div className="flex flex-col">
            <Card
              variant="white"
              rounded="2xl"
              className="w-full p-5 sm:p-7 border border-black"
            >
              <div className="grid grid-cols-3 gap-3.5 sm:gap-4 justify-items-center">
                {privateClients.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full aspect-square max-w-[96px] bg-white rounded-2xl border border-black/15 flex items-center justify-center p-3.5 sm:p-4 select-none"
                    title={item.name}
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain pointer-events-none select-none"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Cluster Label Below (Consistent Typography) */}
            <div className="text-center pt-4 sm:pt-5">
              <h3
                className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Perusahaan Swasta &amp; UMKM
              </h3>
              <p className="text-sm sm:text-[15px] text-gray-600 mt-1.5 leading-relaxed font-normal">
                Sektor Manufaktur, Retail, Bisnis &amp; UMKM
              </p>
            </div>
          </div>
        </Carousel>

      </div>
    </section>
  )
}
