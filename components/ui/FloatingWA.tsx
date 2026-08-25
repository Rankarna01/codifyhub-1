'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { MessageCircle } from 'lucide-react'

export default function FloatingWA() {
  const pathname = usePathname()
  const [waNumber, setWaNumber] = useState('6282275373233')
  const [showText, setShowText] = useState(false)

  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await supabase.from('settings').select('wa_number').limit(1).single()
        if (data && data.wa_number) {
          setWaNumber(data.wa_number)
        }
      } catch (e) {
        console.error('Error fetching WA number', e)
      }
    }
    fetchSettings()
  }, [])

  const url = `https://api.whatsapp.com/send?phone=${waNumber}&text=Halo%20CodifyHub,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Anda.`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 group"
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
      >
        <div 
          className={`bg-[#55DE8F] text-black border-2 border-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] transition-all duration-200 origin-right ${
            showText ? 'scale-100 opacity-100' : 'scale-90 opacity-0 hidden md:block pointer-events-none'
          }`}
        >
          Konsultasi Gratis
        </div>
        <div className="bg-[#55DE8F] text-black w-14 h-14 rounded-2xl border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all relative">
          <MessageCircle size={28} className="fill-black/10 text-black" />
        </div>
      </a>
    </div>
  )
}
