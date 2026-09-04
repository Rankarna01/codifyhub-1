'use client'

import React, { useState, useEffect } from 'react'
import { X, Send, Loader2, Check, Sparkles, ShieldCheck } from 'lucide-react'
import { Toast } from '@/lib/swal'
import { Button, Badge } from '@/components/ui'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: 'Joki Tugas / Skripsi IT',
    details: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [waNumber, setWaNumber] = useState('6282275373233')

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(json => {
        if (json.data?.whatsapp_admin) setWaNumber(json.data.whatsapp_admin)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          service_type: formData.service,
          requirements: formData.details,
        }),
      })

      if (!res.ok) {
        Toast.fire({ icon: 'error', title: 'Gagal menyimpan pesanan!' })
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setSubmitted(true)

      setTimeout(() => {
        const text = `Halo Admin CodifyHub! 👋%0A%0ASaya ingin konsultasi / order:%0A• Nama: ${formData.name}%0A• WhatsApp: ${formData.whatsapp}%0A• Email: ${formData.email || '-' }%0A• Layanan: ${formData.service}%0A• Detail: ${formData.details}%0A%0AMohon info dan estimasinya, terima kasih!`
        window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank')
        onClose()
        setSubmitted(false)
        setFormData({ name: '', email: '', whatsapp: '', service: 'Joki Tugas / Skripsi IT', details: '' })
      }, 1200)

    } catch (err) {
      Toast.fire({ icon: 'error', title: 'Gagal terhubung ke server.' })
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      {/* Modal Card */}
      <div className="relative bg-white border border-black rounded-3xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row transform transition-all z-10">
        
        {/* Left Column (Branding & Perks) */}
        <div className="hidden md:flex flex-col justify-between w-5/12 bg-[#0A192F] text-white p-8 lg:p-10 relative overflow-hidden border-r border-black">
          <div className="relative z-10">
            <Badge variant="accent" size="sm" className="mb-6">
              ✦ FAST RESPONSE 24/7
            </Badge>
            <h2 className="text-3xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Konsultasi Project <br />
              & Skripsi IT
            </h2>
            <p className="text-gray-300 text-xs lg:text-sm leading-relaxed font-medium">
              Ceritakan kebutuhan sistem atau tugas Anda. Tim developer ahli kami siap merancang solusi cepat, tepat, dan bergaransi.
            </p>
          </div>

          <div className="relative z-10 space-y-3 pt-6">
            {[
              'Konsultasi 100% Gratis',
              'Garansi Revisi & Bimbingan',
              'Privasi Data Dijamin Aman'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-xs lg:text-sm text-white font-bold">
                <div className="w-5 h-5 rounded-full bg-[#55DE8F] border border-black flex items-center justify-center text-black flex-shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 relative bg-[#FFFDF7]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-black p-2 bg-white hover:bg-gray-100 border border-black rounded-xl transition"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>

          <div className="mb-6">
            <Badge variant="mint" size="sm" className="mb-2">
              FORM PEMESANAN
            </Badge>
            <h3 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Mulai Konsultasi
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">
              Isi data singkat berikut, Anda akan langsung terhubung ke WhatsApp Admin.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="w-16 h-16 bg-[#55DE8F] border border-black rounded-2xl flex items-center justify-center">
                <Check className="text-black" size={32} strokeWidth={3} />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-black text-gray-900 mb-1">Pemesanan Terkirim!</h4>
                <p className="text-gray-600 text-sm">Membuka WhatsApp untuk menghubungkan dengan admin...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black text-sm font-medium focus:bg-[#FFF9E5] outline-none"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black text-sm font-medium focus:bg-[#FFF9E5] outline-none"
                    placeholder="08123456789"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Email (Opsional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black text-sm font-medium focus:bg-[#FFF9E5] outline-none"
                  placeholder="budi@example.com"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Kategori Layanan</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black text-sm font-bold focus:bg-[#FFF9E5] outline-none cursor-pointer"
                >
                  <option>Joki Tugas / Skripsi IT</option>
                  <option>Website & Toko Online UMKM</option>
                  <option>Sistem Profesional / Web Corporate</option>
                  <option>Mentoring Coding Private</option>
                  <option>Konsultasi Lainnya</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Detail Kebutuhan / Deadline</label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black text-sm font-medium focus:bg-[#FFF9E5] outline-none resize-none"
                  placeholder="Ceritakan fitur sistem, judul skripsi, atau deadline..."
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                iconLeft={!isSubmitting ? <Send size={16} /> : undefined}
                className="mt-3 text-sm font-black uppercase tracking-wider"
              >
                Kirim & Hubungkan ke WhatsApp
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
