'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'

export interface ImageScrollCardProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  bgClass?: string
  children?: React.ReactNode
  speed?: number // pixels per second for calculating smooth scroll duration
}

export function ImageScrollCard({
  src,
  alt,
  className = '',
  imageClassName = '',
  bgClass = 'bg-gray-100',
  children,
  speed = 200,
}: ImageScrollCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [duration, setDuration] = useState(3)

  const updateDimensions = useCallback(() => {
    if (containerRef.current && imageRef.current) {
      const containerH = containerRef.current.clientHeight
      const imageH = imageRef.current.clientHeight
      const diff = imageH - containerH

      if (diff > 8) {
        setMaxScroll(diff)
        // Scaled duration: smooth, deliberate showcase scroll
        const calculatedDuration = Math.max(2.2, Math.min(8, diff / speed))
        setDuration(calculatedDuration)
      } else {
        setMaxScroll(0)
      }
    }
  }, [speed])

  useEffect(() => {
    updateDimensions()
    const handleResize = () => updateDimensions()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [src, updateDimensions])

  const handleMouseEnter = () => {
    updateDimensions()
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden select-none group/scrollcard ${bgClass} ${className}`}
    >
      {/* Scrollable Website Image */}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onLoad={updateDimensions}
          className={`w-full h-auto min-h-full object-cover object-top select-none pointer-events-none ${imageClassName}`}
          style={{
            transform: isHovered && maxScroll > 0 ? `translateY(-${maxScroll}px)` : 'translateY(0px)',
            transition: isHovered
              ? `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
              : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
          draggable={false}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-xs font-bold">
          [Preview Unavailable]
        </div>
      )}

      {/* Subtle indicator badge when full-page image is scrollable */}
      {maxScroll > 15 && (
        <div
          className={`absolute bottom-2.5 right-2.5 z-20 pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-85'
          }`}
        >
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold bg-black/75 text-white backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20 shadow-xs">
            <span>Scroll Preview</span>
            <span className="text-[11px]">↕</span>
          </span>
        </div>
      )}

      {/* Gradient Vignette Overlays for realistic webpage frame feel */}
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10 opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-10 opacity-60" />

      {/* Overlays / Children (Tags, Badges, Stickers) */}
      {children}
    </div>
  )
}

export default ImageScrollCard
