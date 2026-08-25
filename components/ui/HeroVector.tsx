'use client'

import React, { useRef, useEffect } from 'react'

export interface HeroVectorProps {
  className?: string
  src?: string
}

export const HeroVector: React.FC<HeroVectorProps> = ({
  className = '',
  src = '/visual/hero-vector.mp4'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let animationFrameId: number
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    const processFrame = () => {
      if (video.readyState >= 2 && !video.paused && !video.ended) {
        const width = video.videoWidth || 300
        const height = video.videoHeight || 300

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
        }

        if (ctx) {
          ctx.drawImage(video, 0, 0, width, height)
          const frame = ctx.getImageData(0, 0, width, height)
          const data = frame.data
          const len = data.length

          // Chroma-keying threshold for removing white/light background
          for (let i = 0; i < len; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            // If pixel is near pure white/light gray background
            if (r > 220 && g > 220 && b > 220) {
              data[i + 3] = 0 // full transparency
            } else if (r > 195 && g > 195 && b > 195) {
              // Smooth edge feathering
              const factor = (255 - Math.max(r, g, b)) / 60
              data[i + 3] = Math.floor(data[i + 3] * factor)
            }
          }

          ctx.putImageData(frame, 0, 0)
        }
      }

      animationFrameId = requestAnimationFrame(processFrame)
    }

    const startProcessing = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(processFrame)
    }

    const handleEnded = () => {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    video.addEventListener('play', startProcessing)
    video.addEventListener('canplay', startProcessing)
    video.addEventListener('ended', handleEnded)

    video.play().catch(() => {})
    animationFrameId = requestAnimationFrame(processFrame)

    return () => {
      cancelAnimationFrame(animationFrameId)
      video.removeEventListener('play', startProcessing)
      video.removeEventListener('canplay', startProcessing)
      video.removeEventListener('ended', handleEnded)
    }
  }, [src])

  return (
    <div className={`relative flex items-end justify-end pointer-events-none select-none ${className}`}>
      {/* Hidden source video for frame extraction */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Transparent Canvas output pinned to bottom right */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain object-bottom-right block pointer-events-none drop-shadow-xl"
      />
    </div>
  )
}

export default HeroVector
