'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  isHero?: boolean
  animation?: 'fade-up' | 'slide-up' | 'scale' | 'stagger'
  scrub?: boolean | number
  duration?: number
  delay?: number
  toggleActions?: string
}

/**
 * GsapSection
 * A high-performance, lightweight GSAP-powered section wrapper with entrance,
 * exit, and refresh animations using ScrollTrigger & gsap.context().
 */
export function GsapSection({
  children,
  className = '',
  id,
  isHero = false,
  animation = 'fade-up',
  duration = 0.75,
  delay = 0,
  toggleActions = 'play reverse play reverse'
}: GsapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    // Use gsap.context for full React lifecycle safety & zero memory leaks
    const ctx = gsap.context(() => {
      if (isHero) {
        // Hero Entrance Timeline - triggers immediately on page load / refresh
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' }
        })

        // 1. Staggered reveal of hero text items (.gsap-hero-title, .gsap-hero-desc, .gsap-hero-btn, .gsap-hero-check)
        tl.fromTo(
          '.gsap-hero-title',
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, delay: 0.1 }
        )
        .fromTo(
          '.gsap-hero-desc',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.55'
        )
        .fromTo(
          '.gsap-hero-action',
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6 },
          '-=0.45'
        )
        .fromTo(
          '.gsap-hero-check',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.5 },
          '-=0.35'
        )

        // 2. Right Column Terminal Window & Mascot
        tl.fromTo(
          '.gsap-hero-terminal',
          { x: 40, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo(
          '.gsap-hero-mascot',
          { scale: 0.75, y: 50, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'back.out(1.4)' },
          '-=0.6'
        )

        // 3. Bottom Stats Cards
        tl.fromTo(
          '.gsap-hero-stat',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.75, ease: 'power2.out' },
          '-=0.5'
        )

        // 4. Subtle Parallax Exit on Scroll Down (returns smoothly when scrolling back up)
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress
            gsap.to(el.querySelector('.gsap-hero-content'), {
              y: progress * 60,
              opacity: 1 - progress * 0.45,
              ease: 'none',
              overwrite: 'auto'
            })
          }
        })
      } else {
        // Standard Section ScrollTrigger: Entrance on scroll down, smooth exit on scroll away
        const targets = el.querySelectorAll('.gsap-reveal')

        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            {
              y: animation === 'slide-up' ? 50 : animation === 'scale' ? 0 : 35,
              scale: animation === 'scale' ? 0.94 : 1,
              opacity: 0
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: duration,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'bottom 12%',
                toggleActions: toggleActions
              }
            }
          )
        } else {
          // Whole section or content container default fade-up
          const contentTarget = el.querySelector('.gsap-section-content') || el
          gsap.fromTo(
            contentTarget,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: duration,
              delay: delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'bottom 12%',
                toggleActions: toggleActions
              }
            }
          )
        }
      }

      // Refresh ScrollTrigger positions immediately and after layout settles
      ScrollTrigger.refresh()
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)

      return () => clearTimeout(timer)
    }, sectionRef)

    return () => ctx.revert()
  }, [isHero, animation, duration, delay, toggleActions])

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  )
}

export interface GsapRevealProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'fade'
  delay?: number
  duration?: number
}

/**
 * GsapReveal
 * Individual element reveal helper that reacts to scroll triggers.
 */
export function GsapReveal({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.8
}: GsapRevealProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = itemRef.current
    if (!el) return

    const getInitialVars = () => {
      switch (animation) {
        case 'fade-up':
          return { y: 35, opacity: 0 }
        case 'slide-left':
          return { x: -40, opacity: 0 }
        case 'slide-right':
          return { x: 40, opacity: 0 }
        case 'scale':
          return { scale: 0.92, opacity: 0 }
        case 'fade':
        default:
          return { opacity: 0 }
      }
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        getInitialVars(),
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
    }, itemRef)

    return () => ctx.revert()
  }, [animation, delay, duration])

  return (
    <div ref={itemRef} className={className}>
      {children}
    </div>
  )
}

export default GsapSection
