'use client'

import React, { forwardRef } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export type ButtonVariant = 'primary' | 'mint' | 'navy' | 'dark' | 'yellow' | 'accent' | 'blue' | 'white' | 'outline' | 'ghost' | 'coral'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon'
export type ButtonShape = 'default' | 'pill' | 'square'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  href?: string
  target?: string
  rel?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#55DE8F] text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  mint: 'bg-[#55DE8F] text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  navy: 'bg-[#0A192F] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  dark: 'bg-[#1E2235] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  yellow: 'bg-[#3B82F6] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  accent: 'bg-[#3B82F6] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  blue: 'bg-[#3B82F6] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  white: 'bg-white text-gray-900 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-gray-50 hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  outline: 'bg-white text-gray-900 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-gray-50 hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  coral: 'bg-[#FF5A36] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]',
  ghost: 'bg-transparent text-gray-900 border-2 border-transparent hover:bg-black/5 hover:border-black/20 active:translate-y-0.5'
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs font-bold gap-1.5',
  md: 'px-6 py-3 text-sm font-bold gap-2',
  lg: 'px-8 py-3.5 text-base font-bold gap-2.5',
  xl: 'px-9 py-4 text-lg font-bold gap-3',
  icon: 'w-11 h-11 p-0 justify-center items-center text-sm font-bold'
}

const shapeStyles: Record<ButtonShape, string> = {
  default: 'rounded-xl',
  pill: 'rounded-full',
  square: 'rounded-none'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  shape = 'default',
  href,
  target,
  rel,
  iconLeft,
  iconRight,
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}, ref) => {
  const baseClasses = `inline-flex items-center justify-center font-bold transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
    variantStyles[variant]
  } ${sizeStyles[size]} ${shapeStyles[shape]} ${fullWidth ? 'w-full' : ''} ${className}`

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 20 : 16} />
      ) : (
        iconLeft && <span className="flex-shrink-0">{iconLeft}</span>
      )}
      <span>{children}</span>
      {!isLoading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  )

  if (href) {
    const isAnchor = href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
    if (isAnchor) {
      return (
        <a href={href} target={target} rel={rel} className={baseClasses}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} target={target} rel={rel} className={baseClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
