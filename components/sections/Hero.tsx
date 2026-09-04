'use client'

import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, Monitor, Store, Sparkles, Check, Bot } from 'lucide-react'
import { Button, Card, Badge, HeroVector } from '@/components/ui'
import OrderModal from '@/components/ui/OrderModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:pt-36 lg:pb-20 overflow-hidden relative bg-white">
        {/* Subtle Neo Grid Pattern Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Hero Row */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6 text-left">
              {/* Main Heading (SEO & Punchy Display Font) */}
              <h1
                className="text-4xl sm:text-6xl lg:text-[62px] font-black tracking-tight text-gray-900 mb-6 leading-[1.05]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Custom Web, <br />
                Mobile Apps & <br />
                <span className="bg-[#3B82F6] text-white px-2.5 py-0.5 border-2 border-black inline-block shadow-[3px_3px_0px_#000] rotate-[-1deg] my-1">
                  AI Systems
                </span>
              </h1>

              {/* Body Text in Montserrat - SEO optimized keywords */}
              <p className="text-base sm:text-lg text-gray-700 max-w-lg mb-8 leading-relaxed font-medium">
                CodifyHub engineers high-performance <strong>custom web applications</strong>, <strong>mobile apps</strong>, <strong>enterprise business systems</strong>, and <strong>AI agent & live chat integrations</strong> tailored to scale your digital presence.
              </p>

              {/* Neo Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  shape="default"
                  onClick={() => setIsModalOpen(true)}
                  iconRight={<ArrowRight size={18} />}
                  className="text-base"
                >
                  Start Your Project
                </Button>

                <Button
                  variant="white"
                  size="lg"
                  shape="default"
                  href="#portofolio"
                  className="text-base"
                >
                  View Portfolio
                </Button>
              </div>

              {/* Trust checklist */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm font-bold text-gray-800">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-black fill-[#55DE8F]" />
                  <span>Production-Ready Clean Code</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-black fill-[#55DE8F]" />
                  <span>Custom AI & Chatbot Integration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-black fill-[#55DE8F]" />
                  <span>100% Guaranteed On-Time Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: TerminalCard with Pop-out Vector Mascot */}
            <div className="lg:col-span-6 relative pt-4 pb-6 sm:py-0">
              
              {/* Outer Wrapper with overflow-visible to let character peek out nicely */}
              <div className="relative overflow-visible max-w-xl mx-auto lg:max-w-none">
                
                {/* Main Dark Terminal Window */}
                <div className="border border-black rounded-3xl bg-[#1E2235] text-white overflow-hidden min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] flex flex-col justify-between">
                  
                  {/* macOS Style Traffic Dots Header Bar */}
                  <div className="bg-[#151824] px-5 py-3.5 border-b border-black flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-sm" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-sm" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-sm" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-[#55DE8F] animate-pulse" />
                      <span className="text-gray-300 font-bold">codifyhub_core.ts</span>
                    </div>

                    <div className="bg-[#1E2235] border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-gray-400">
                      v2.4.0
                    </div>
                  </div>

                  {/* Main Code Area */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative">
                    
                    {/* Code lines */}
                    <div className="font-mono text-xs sm:text-[13px] leading-relaxed max-w-[62%] sm:max-w-[64%]">
                      <p className="text-gray-400 mb-2">// Initialize full-stack software & AI solution</p>
                      <p>
                        <span className="text-[#F47067]">const</span> <span className="text-[#6CB6FF]">solution</span> = <span className="text-[#F47067]">await</span> codifyhub.<span className="text-[#DCBDFB]">deploy</span>({'{'}
                      </p>
                      <p className="pl-4">
                        <span className="text-[#79C0FF]">&quot;services&quot;</span>: [<span className="text-[#55DE8F]">&quot;Web Apps&quot;</span>, <span className="text-[#55DE8F]">&quot;Mobile&quot;</span>, <span className="text-[#55DE8F]">&quot;Custom ERP&quot;</span>],
                      </p>
                      <p className="pl-4">
                        <span className="text-[#79C0FF]">&quot;aiIntegration&quot;</span>: [<span className="text-[#93C5FD]">&quot;Live Chatbot&quot;</span>, <span className="text-[#93C5FD]">&quot;LLM & RAG&quot;</span>],
                      </p>
                      <p className="pl-4">
                        <span className="text-[#79C0FF]">&quot;techStack&quot;</span>: [<span className="text-[#96D0FF]">&quot;Next.js&quot;</span>, <span className="text-[#96D0FF]">&quot;FastAPI&quot;</span>, <span className="text-[#96D0FF]">&quot;OpenAI&quot;</span>],
                      </p>
                      <p className="pl-4">
                        <span className="text-[#79C0FF]">&quot;delivery&quot;</span>: <span className="text-[#55DE8F]">&quot;PRODUCTION_READY&quot;</span>
                      </p>
                      <p>{'});'}</p>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-[#55DE8F]">
                        <Check size={14} className="text-[#55DE8F]" strokeWidth={3} />
                        <span className="font-mono font-bold">Build success • Live & automated</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Character Mascot Big Size Pinned to Bottom-Right Corner */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 lg:-bottom-24 lg:-right-48 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[720px] lg:h-[420px] pointer-events-none z-20 flex items-end justify-end overflow-visible">
                  <HeroVector className="w-full h-full" />
                </div>

              </div>

            </div>

          </div>

          {/* Stats Bar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="white" rounded="2xl" className="p-6 text-center">
              <div className="w-12 h-12 bg-[#E8FBF0] border border-black rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Monitor size={22} className="text-black" />
              </div>
              <h4 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                2,500+
              </h4>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Web & Software Projects Delivered
              </p>
            </Card>

            <Card variant="accent" rounded="2xl" className="p-6 text-center">
              <div className="w-12 h-12 bg-white border border-black rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Sparkles size={22} className="text-black" />
              </div>
              <h4 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                4.9 / 5.0
              </h4>
              <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                Client Rating & Enterprise Trust
              </p>
            </Card>

            <Card variant="white" rounded="2xl" className="p-6 text-center">
              <div className="w-12 h-12 bg-[#EDE9FE] border border-black rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Store size={22} className="text-black" />
              </div>
              <h4 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                100% Free
              </h4>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Technical Scope & Architecture Plan
              </p>
            </Card>
          </div>

        </div>
      </section>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
