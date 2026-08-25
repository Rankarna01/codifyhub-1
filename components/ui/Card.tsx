'use client'

import React from 'react'

export type CardVariant = 'default' | 'white' | 'yellow' | 'accent' | 'blue' | 'mint' | 'dark' | 'navy' | 'coral' | 'purple' | 'slate'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  interactive?: boolean
  shadowSize?: 'sm' | 'md' | 'lg' | 'none'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const cardVariantStyles: Record<CardVariant, string> = {
  default: 'bg-white text-gray-900',
  white: 'bg-white text-gray-900',
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

const shadowStyles = {
  none: '',
  sm: 'shadow-[2px_2px_0px_#000000]',
  md: 'shadow-[4px_4px_0px_#000000]',
  lg: 'shadow-[6px_6px_0px_#000000]'
}

const roundedStyles = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-[20px]',
  '2xl': 'rounded-3xl',
  '3xl': 'rounded-[32px]'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  shadowSize = 'md',
  rounded = '2xl',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`border-2 border-black relative overflow-hidden ${cardVariantStyles[variant]} ${shadowStyles[shadowSize]} ${roundedStyles[rounded]} ${
        interactive ? 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] active:translate-y-0 active:shadow-[2px_2px_0px_#000000] transition-all duration-200 cursor-pointer' : ''
      } ${className}`}
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
    <div ref={ref} className={`p-6 pb-3 ${className}`} {...props}>
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
    <h3 ref={ref} className={`text-xl font-bold tracking-tight ${className}`} {...props}>
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
    <p ref={ref} className={`text-sm text-gray-600 mt-1.5 leading-relaxed ${className}`} {...props}>
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

