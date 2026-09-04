'use client'

import React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

/**
 * Base lightweight Skeleton component
 * Uses native Tailwind CSS pulse animation with zero external dependencies
 */
export function Skeleton({
  className = '',
  rounded = 'md',
  ...props
}: SkeletonProps) {
  const roundedMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-gray-200/80 dark:bg-gray-700/50 ${roundedMap[rounded]} ${className}`}
      {...props}
    />
  )
}

/**
 * ProjectCardSkeleton: Lightweight skeleton matching project cards
 * Supports 'landing' (neobrutalist style) and 'admin' (clean dashboard card)
 */
export function ProjectCardSkeleton({
  mode = 'landing'
}: {
  mode?: 'landing' | 'admin'
}) {
  if (mode === 'admin') {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm pointer-events-none select-none">
        {/* Image thumbnail skeleton */}
        <div className="h-44 bg-gray-100 animate-pulse relative" />
        
        {/* Card info skeleton */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-4 w-3/5" rounded="md" />
            <Skeleton className="h-4 w-1/4" rounded="full" />
          </div>

          <div className="space-y-1.5">
            <Skeleton className="h-3 w-full" rounded="sm" />
            <Skeleton className="h-3 w-4/5" rounded="sm" />
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <Skeleton className="h-3 w-20" rounded="sm" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-7 w-7" rounded="lg" />
              <Skeleton className="h-7 w-7" rounded="lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Landing page modern skeleton matching Card
  return (
    <div className="bg-white border border-black rounded-[28px] overflow-hidden flex flex-col pointer-events-none select-none">
      {/* Preview Image skeleton */}
      <div className="h-48 bg-gray-100 border-b border-black relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        {/* Floating badge skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-24 bg-gray-300 border border-black/30" rounded="full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 bg-gray-200" rounded="md" />

        {/* Description lines */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3.5 w-full bg-gray-200" rounded="sm" />
          <Skeleton className="h-3.5 w-5/6 bg-gray-200" rounded="sm" />
          <Skeleton className="h-3.5 w-2/3 bg-gray-200" rounded="sm" />
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <Skeleton className="h-4 w-28 bg-gray-200" rounded="md" />
          <Skeleton className="h-9 w-9 bg-gray-300 border border-black" rounded="xl" />
        </div>
      </div>
    </div>
  )
}

/**
 * ProjectGridSkeleton: Renders multiple card skeletons in a responsive grid
 */
export function ProjectGridSkeleton({
  count = 6,
  mode = 'landing'
}: {
  count?: number
  mode?: 'landing' | 'admin'
}) {
  const gridClasses = mode === 'admin'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'

  return (
    <div className={gridClasses}>
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} mode={mode} />
      ))}
    </div>
  )
}

export default Skeleton
