'use client'

import React from 'react'

export interface SectionHeaderProps {
  badge?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  theme?: 'light' | 'dark'
  align?: 'center' | 'left'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: React.ReactNode
  maxWidth?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  theme = 'light',
  align = 'center',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  children,
  maxWidth = 'max-w-3xl'
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  const isDark = theme === 'dark'

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${maxWidth} mx-auto mb-8 sm:mb-10 lg:mb-12 ${className}`}
    >
      {/* Optional Badge / Category Tag */}
      {badge && (
        <div className="mb-2 sm:mb-2.5">
          {typeof badge === 'string' ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gray-100 text-gray-800 border border-black">
              {badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )}

      {/* Heading / Title */}
      <h2
        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug sm:leading-tight ${
          isDark ? 'text-white' : 'text-gray-900'
        } ${titleClassName}`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`mt-1.5 sm:mt-2.5 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-xl ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          } ${descriptionClassName}`}
        >
          {description}
        </p>
      )}

      {/* Extra actions (e.g. view switchers, tabs, filters) */}
      {children && (
        <div className={`mt-3.5 sm:mt-4 ${isCenter ? 'flex justify-center' : ''}`}>
          {children}
        </div>
      )}
    </div>
  )
}

export default SectionHeader
