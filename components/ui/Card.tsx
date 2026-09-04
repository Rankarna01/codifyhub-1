'use client'

import React from 'react'

export type CardVariant =
  | 'default'
  | 'white'
  | 'pastel-blue'
  | 'pastel-yellow'
  | 'pastel-mint'
  | 'pastel-purple'
  | 'yellow'
  | 'accent'
  | 'blue'
  | 'mint'
  | 'dark'
  | 'navy'
  | 'coral'
  | 'purple'
  | 'slate'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  interactive?: boolean
  shadowSize?: 'sm' | 'md' | 'lg' | 'none'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const cardVariantStyles: Record<CardVariant, string> = {
  default: 'bg-white text-gray-900',
  white: 'bg-white text-gray-900',
  'pastel-blue': 'bg-[#E8F1FD] text-gray-900',
  'pastel-yellow': 'bg-[#FEF8D8] text-gray-900',
  'pastel-mint': 'bg-[#EAFBF1] text-gray-900',
  'pastel-purple': 'bg-[#F3E8FF] text-gray-900',
  yellow: 'bg-[#3B82F6] text-white',
  accent: 'bg-[#3B82F6] text-white',
  blue: 'bg-[#3B82F6] text-white',
  mint: 'bg-[#55DE8F] text-gray-900',
  dark: 'bg-[#1E2235] text-white',
  navy: 'bg-[#0A192F] text-white',
  coral: 'bg-[#FF5A36] text-white',
  purple: 'bg-[#EDE9FE] text-gray-900',
  slate: 'bg-[#F8FAFC] text-gray-900'
}

// Flat modern styling: zero offset shadows
const shadowStyles = {
  none: '',
  sm: '',
  md: '',
  lg: ''
}

const roundedStyles = {
  sm: 'rounded-xl',
  md: 'rounded-2xl',
  lg: 'rounded-[24px]',
  xl: 'rounded-[28px]',
  '2xl': 'rounded-3xl',
  '3xl': 'rounded-[32px]'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  shadowSize = 'none',
  rounded = '2xl',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`border border-black relative overflow-hidden ${cardVariantStyles[variant]} ${shadowStyles[shadowSize]} ${roundedStyles[rounded]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`p-6 pb-2 ${className}`} {...props}>
      {children}
    </div>
  )
})
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <h3 ref={ref} className={`text-xl font-bold tracking-tight text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  )
})
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <p ref={ref} className={`text-sm sm:text-[15px] text-gray-600 mt-1.5 leading-relaxed font-normal ${className}`} {...props}>
      {children}
    </p>
  )
})
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
})
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`p-6 pt-0 mt-auto flex items-center ${className}`} {...props}>
      {children}
    </div>
  )
})
CardFooter.displayName = 'CardFooter'

export { TerminalCard } from './TerminalCard'
export type { TerminalCardProps } from './TerminalCard'

export default Card
