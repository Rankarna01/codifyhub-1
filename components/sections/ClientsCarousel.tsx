'use client'

import { useRef } from 'react'
import Image from 'next/image'

const clientLogos = [
  { name: 'Bank Indonesia', src: '/logo-pt/bi.webp' },
  { name: 'Pertamina', src: '/logo-pt/pertamina.webp' },
  { name: 'PLN', src: '/logo-pt/pln.webp' },
  { name: 'PTPN 4', src: '/logo-pt/ptpn.webp' },
  { name: 'Sinuraya', src: '/logo-pt/sinuraya.webp' },
  { name: 'Sugimura', src: '/logo-pt/sugimura.webp' },
  { name: 'Client Logo 1', src: '/logo-pt/logo1.webp' },
  { name: 'Client Logo 2', src: '/logo-pt/logo2.webp' },
  { name: 'Client Partner', src: '/logo-pt/logo.webp' },
]

export default function ClientsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  // duplicate for seamless loop
  const items = [...clientLogos, ...clientLogos]

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      {/* Edge fade - updated to white */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />

      <div ref={trackRef} className="marquee-track flex items-center">
        {items.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center mx-8 min-w-max"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={160}
              height={80}
              className="h-14 md:h-18 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

