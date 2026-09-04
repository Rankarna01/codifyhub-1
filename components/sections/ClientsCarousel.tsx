'use client'

import React from 'react'
import Image from 'next/image'

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
    <section className="py-20 lg:py-28 px-4 sm:px-6 bg-[#FAF8F5] border-y border-black/10 relative overflow-hidden">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200/80 shadow-xs text-[#0A192F] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#55DE8F]" />
            <span>Ekosistem Kemitraan</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ekosistem Klien &amp; <br className="hidden sm:inline" />
            Mitra Terpercaya
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto">
            Solusi sistem web, aplikasi kustom, dan otomasi digital yang telah terbukti menggerakkan efisiensi bisnis — dari instansi BUMN hingga korporasi swasta.
          </p>
        </div>

        {/* Dual Cluster Grid (Reference Image Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto items-start">
          
          {/* Cluster 1: BUMN & Lembaga Nasional */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-white/70 border border-dashed border-gray-300 rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-gray-400">
              <div className="grid grid-cols-3 gap-3.5 sm:gap-4 justify-items-center">
                {bumnClients.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative w-full aspect-square max-w-[96px] bg-white rounded-2xl sm:rounded-[22px] border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-500/60 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center p-3.5 sm:p-4 cursor-pointer"
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-200 select-none"
                    />

                    {/* Floating Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-20 shadow-md">
                      {item.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cluster Label Below */}
            <div className="text-center mt-4 sm:mt-5">
              <h4
                className="text-base sm:text-lg font-black text-gray-900 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                BUMN &amp; Lembaga Nasional
              </h4>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Sektor Perbankan, Energi, Utilitas &amp; Perkebunan
              </p>
            </div>
          </div>

          {/* Cluster 2: Korporasi Swasta & Industri */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-white/70 border border-dashed border-gray-300 rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-gray-400">
              <div className="grid grid-cols-3 gap-3.5 sm:gap-4 justify-items-center">
                {privateClients.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative w-full aspect-square max-w-[96px] bg-white rounded-2xl sm:rounded-[22px] border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-500/60 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center p-3.5 sm:p-4 cursor-pointer"
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-200 select-none"
                    />

                    {/* Floating Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-20 shadow-md">
                      {item.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cluster Label Below */}
            <div className="text-center mt-4 sm:mt-5">
              <h4
                className="text-base sm:text-lg font-black text-gray-900 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Perusahaan Swasta &amp; UMKM
              </h4>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Sektor Manufaktur, Retail, Bisnis &amp; UMKM
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200/60 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-bold text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#55DE8F]" />
            <span>Sistem Produksi Siap Pakai</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span>Standar Keamanan Enterprise</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
            <span>Dukungan Teknis &amp; Maintenance</span>
          </div>
        </div>

      </div>
    </section>
  )
}
