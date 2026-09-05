'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Home, ArrowLeft, MessageCircle } from 'lucide-react'
import { Card, Badge, Button } from '@/components/ui'
import animationData from '@/public/404/404.json'

// Dynamic import with ssr: false to prevent hydration issues with canvas/SVG
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center bg-gray-50 rounded-2xl border border-black/10 animate-pulse">
      <span className="text-4xl font-black text-gray-400">404</span>
    </div>
  )
})

export interface NotFoundContentProps {
  title?: string
  description?: string
  showHomeButton?: boolean
  showSupportButton?: boolean
  className?: string
}

export function NotFoundContent({
  title = 'Page Not Found',
  description = "Oops! The page you are looking for might have been moved, renamed, or doesn't exist anymore.",
  showHomeButton = true,
  showSupportButton = true,
  className = ''
}: NotFoundContentProps) {
  return (
    <div className={`w-full max-w-2xl mx-auto flex flex-col items-center text-center ${className}`}>
      <Card
        variant="white"
        rounded="3xl"
        className="w-full p-6 sm:p-10 border border-black relative overflow-hidden flex flex-col items-center"
      >
        {/* Error Badge */}
        <Badge variant="coral" size="md" className="mb-4">
          ✦ 404 ERROR
        </Badge>

        {/* Lottie Animation from public/404/404.json */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 relative flex items-center justify-center pointer-events-none select-none my-2">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        {/* Heading & Copy */}
        <h1
          className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-md mx-auto mb-8">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {showHomeButton && (
            <Button
              variant="navy"
              size="lg"
              shape="default"
              href="/"
              iconLeft={<Home size={18} />}
              className="w-full sm:w-auto text-sm font-bold"
            >
              Back to Home
            </Button>
          )}

          {showSupportButton && (
            <Button
              variant="white"
              size="lg"
              shape="default"
              href="https://wa.me/6281234567890?text=Halo%20CodifyHub,%20saya%20mengalami%20kendala%20halaman%20tidak%20ditemukan"
              target="_blank"
              rel="noreferrer"
              iconLeft={<MessageCircle size={18} />}
              className="w-full sm:w-auto text-sm font-bold"
            >
              Contact Support
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default NotFoundContent
