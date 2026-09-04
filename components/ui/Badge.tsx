'use client'

import React from 'react'

export type BadgeVariant = 'default' | 'yellow' | 'accent' | 'mint' | 'navy' | 'blue' | 'coral' | 'purple' | 'emerald' | 'white'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  hasShadow?: boolean
  icon?: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white text-gray-900 border-black',
  white: 'bg-white text-gray-900 border-black',
  yellow: 'bg-[#3B82F6] text-white border-black',
  accent: 'bg-[#3B82F6] text-white border-black',
  mint: 'bg-[#55DE8F] text-gray-950 border-black',
  navy: 'bg-[#0A192F] text-white border-black',
  blue: 'bg-[#3B82F6] text-white border-black',
  coral: 'bg-[#FF5A36] text-white border-black',
  purple: 'bg-[#EDE9FE] text-purple-950 border-black',
  emerald: 'bg-[#D1FAE5] text-emerald-950 border-black'
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-[11px] gap-1',
  md: 'px-3.5 py-1 text-xs gap-1.5',
  lg: 'px-4 py-1.5 text-sm gap-2'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  hasShadow = false,
  icon,
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${
        hasShadow ? 'shadow-[2px_2px_0px_#000000]' : ''
      } ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}

export default Badge
