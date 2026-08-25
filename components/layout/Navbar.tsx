'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Rocket, Sparkles, MessageCircle } from 'lucide-react'
import OrderModal from '@/components/ui/OrderModal'

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Top Notch Dynamic Island Header */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
        
        {/* Notch Container */}
        <div className="relative pointer-events-auto flex items-center">
          
          {/* Left Inverted Concave Corner (Melengkung ke atas kiri) */}
          <svg 
            className="absolute top-0 -left-[20px] w-[20px] h-[20px] text-black fill-current pointer-events-none select-none" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0C11.0457 0 20 8.9543 20 20V0H0Z" fill="currentColor" />
          </svg>

          {/* Main Notch Body */}
          <nav
            className="bg-black text-white px-5 py-2.5 md:px-7 md:py-2.5 rounded-b-[22px] flex items-center justify-between gap-6 md:gap-8 lg:gap-10 shadow-[0_12px_32px_rgba(0,0,0,0.4)] select-none"
          >
            {/* Brand Logo & Name (Left) */}
            <a href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-1 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="CodifyHub Logo" className="w-full h-full object-contain filter brightness-110" />
              </div>
              <span className="font-bold text-sm md:text-base tracking-tight text-white font-sans">
                CodifyHub
              </span>
            </a>

            {/* Desktop Navigation Links (Center) */}
            <div className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-medium text-gray-300">
              <a
                href="#layanan"
                className="hover:text-white transition-colors duration-200 py-1"
              >
                Layanan
              </a>
              <a
                href="#portofolio"
                className="hover:text-white transition-colors duration-200 py-1"
              >
                Portofolio
              </a>
              <a
                href="#testimonial"
                className="hover:text-white transition-colors duration-200 py-1"
              >
                Testimoni
              </a>
              <a
                href="#layanan"
                className="hover:text-white transition-colors duration-200 py-1"
              >
                FAQ
              </a>
            </div>

            {/* Action CTA Button (Right - White Pill as in screenshot) */}
            <div className="hidden sm:flex items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-gray-100 active:scale-95 text-black font-bold text-xs px-4 py-1.5 rounded-full transition-all duration-150 shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Rocket size={13} className="text-black" />
                <span>Mulai Project</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer"
              >
                <Rocket size={11} />
                <span>Mulai</span>
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </nav>

          {/* Right Inverted Concave Corner (Melengkung ke atas kanan) */}
          <svg 
            className="absolute top-0 -right-[20px] w-[20px] h-[20px] text-black fill-current pointer-events-none select-none" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 0C8.9543 0 0 8.9543 0 20V0H20Z" fill="currentColor" />
          </svg>

          {/* Mobile Dropdown Panel directly under the Notch */}
          {isMobileOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-black border border-white/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl md:hidden text-center flex flex-col gap-2.5">
              <a
                href="#layanan"
                onClick={() => setIsMobileOpen(false)}
                className="text-xs font-semibold text-gray-200 hover:text-white py-1.5 border-b border-white/10"
              >
                Layanan & Harga
              </a>
              <a
                href="#portofolio"
                onClick={() => setIsMobileOpen(false)}
                className="text-xs font-semibold text-gray-200 hover:text-white py-1.5 border-b border-white/10"
              >
                Portofolio
              </a>
              <a
                href="#testimonial"
                onClick={() => setIsMobileOpen(false)}
                className="text-xs font-semibold text-gray-200 hover:text-white py-1.5 border-b border-white/10"
              >
                Testimoni
              </a>
              <button
                onClick={() => {
                  setIsModalOpen(true)
                  setIsMobileOpen(false)
                }}
                className="w-full bg-white text-black font-bold text-xs py-2 rounded-full flex items-center justify-center gap-1.5 cursor-pointer mt-1 shadow-md hover:bg-gray-100 active:scale-98 transition"
              >
                <Rocket size={13} />
                <span>Konsultasi Gratis</span>
              </button>
            </div>
          )}

        </div>
      </header>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
