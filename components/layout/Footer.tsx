'use client'

import React from 'react'
import { Badge } from '@/components/ui'

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black py-12 px-4 sm:px-6 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        {/* Brand */}
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <div className="w-8 h-8 flex-shrink-0 bg-[#3B82F6] border-2 border-black rounded-lg p-1 shadow-[2px_2px_0px_#000]">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-black text-xl text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
            Codify<span className="text-blue-600">Hub.id</span>
          </span>
        </div>

        <p className="text-gray-700 text-sm max-w-md mx-auto mb-6 font-medium">
          Platform Solusi Digital & Joki IT Terpercaya untuk Mahasiswa, UMKM, dan Perusahaan di Seluruh Indonesia.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-gray-800 mb-8">
          <a href="#layanan" className="hover:text-blue-600 underline">Layanan</a>
          <a href="#portofolio" className="hover:text-blue-600 underline">Portofolio</a>
          <a href="#testimonial" className="hover:text-blue-600 underline">Testimoni Klien</a>
          <a href="#pesan" className="hover:text-blue-600 underline">Konsultasi Gratis</a>
        </div>

        <div className="pt-6 border-t-2 border-black/10 w-full max-w-md">
          <p className="text-gray-500 text-xs font-medium">
            © {new Date().getFullYear()} CodifyHub.id. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
