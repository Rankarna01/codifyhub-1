'use client'

import React from 'react'
import { Star, ArrowUpRight } from 'lucide-react'

// Cartoon White Glove Thumbs Up Sticker (matching the user's reference image)
export function ThumbsUpSticker({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`select-none pointer-events-none drop-shadow-md ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wrist Cuff */}
      <rect x="6" y="32" width="14" height="22" rx="7" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
      <path d="M11 38H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      
      {/* Hand Body & Thumb */}
      <path
        d="M20 34C20 28 23 18 29 12C32 9 36 9 37 13C38 18 36 24 33 28H48C52 28 55 31 54 35C53 38 51 40 53 43C55 45 54 48 51 50C53 52 52 55 49 57C45 59 33 59 20 54V34Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* Finger Crease Lines */}
      <path d="M34 35H49" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 42H48" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 49H46" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 28C27 24 28 20 28 16" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Cartoon Lime Star Sparkle Sticker (matching the user's reference image)
export function LimeStarSticker({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`select-none pointer-events-none drop-shadow-md ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 4C34 18 46 30 60 32C46 34 34 46 32 60C30 46 18 34 4 32C18 30 30 18 32 4Z"
        fill="#D4F843"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Soft Quote Marks Icon
export function QuoteIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`select-none ${className}`}
      width="38"
      height="30"
      viewBox="0 0 38 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 18.5714C0 8.31885 6.42857 2.37895 15.7143 0L17.1429 4.28571C11.4286 6.17143 8.57143 9.42857 8.57143 14.2857H17.1429V30H0V18.5714ZM20.8571 18.5714C20.8571 8.31885 27.2857 2.37895 36.5714 0L38 4.28571C32.2857 6.17143 29.4286 9.42857 29.4286 14.2857H38V30H20.8571V18.5714Z"
        fill="#E5E7EB"
      />
    </svg>
  )
}

export type ShowcaseCardType = 'rating' | 'review'

export interface ShowcaseReviewCardData {
  id: string
  type: ShowcaseCardType
  // For 'rating' type
  ratingValue?: string
  reviewCount?: string
  detailsLink?: string
  hasThumbsUp?: boolean
  // For 'review' type
  tag?: string
  quote?: string
  highlightedQuote?: string
  quoteSuffix?: string
  authorName?: string
  authorRole?: string
  authorAvatar?: string
  avatarBg?: string
  stars?: number
  hasLimeStar?: boolean
}

export function ShowcaseCard({ card }: { card: ShowcaseReviewCardData }) {
  // 1. Rating Card (Dark Black Card with Thumbs-up sticker)
  if (card.type === 'rating') {
    return (
      <div className="w-full h-full bg-[#0D1117] text-white rounded-[28px] p-6 sm:p-7 border border-white/20 relative flex flex-col justify-between select-none">
        {/* Cartoon Thumbs-up sticker popping on top right */}
        {card.hasThumbsUp && (
          <div className="absolute -top-7 -right-2 sm:-right-4 z-20">
            <ThumbsUpSticker className="w-16 h-16 sm:w-18 sm:h-18" />
          </div>
        )}

        {/* Top & Middle Rating content */}
        <div>
          <div className="text-6xl sm:text-7xl font-bold tracking-tight text-white mb-2 leading-none">
            {card.ratingValue || '4.6'}
          </div>

          {/* 5 Stars */}
          <div className="flex items-center gap-1 my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className="fill-[#FBBF24] text-[#FBBF24]"
              />
            ))}
          </div>

          <div className="text-sm font-medium text-gray-400 mt-1">
            {card.reviewCount || '12k reviews'}
          </div>
        </div>

        {/* Bottom Details Button */}
        <div className="pt-8">
          <a
            href={card.detailsLink || '#'}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1F2430] border border-white/10 text-white text-xs font-semibold"
          >
            <span>View details</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    )
  }

  // 2. Testimonial Card (Clean Cream/White Card with thin black border)
  return (
    <div className="w-full h-full bg-[#FDFDFC] text-gray-900 rounded-[28px] p-6 sm:p-7 border border-black relative flex flex-col justify-between select-none">
      {/* Cartoon Lime Star Sticker popping on top right */}
      {card.hasLimeStar && (
        <div className="absolute -top-6 -right-3 z-20">
          <LimeStarSticker className="w-14 h-14 sm:w-16 sm:h-16" />
        </div>
      )}

      {/* Top Header: Quote mark & App tag pill */}
      <div className="flex items-start justify-between">
        <QuoteIcon className="text-gray-200" />
        {card.tag && (
          <div className="border border-black rounded-full px-3.5 py-1 text-xs font-semibold text-gray-900 bg-white">
            {card.tag}
          </div>
        )}
      </div>

      {/* Middle Review Text with Bold highlights */}
      <p className="text-sm sm:text-[15px] text-gray-800 leading-relaxed my-5 font-normal">
        {card.quote}{' '}
        {card.highlightedQuote && (
          <strong className="font-bold text-black">
            {card.highlightedQuote}
          </strong>
        )}{' '}
        {card.quoteSuffix}
      </p>

      {/* Bottom Footer: Author Avatar, Name, Role & 5 Stars */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3">
          {/* Avatar Circle */}
          <div
            className={`w-9 h-9 rounded-full border border-black flex items-center justify-center text-xs font-bold overflow-hidden ${
              card.avatarBg || 'bg-amber-100 text-amber-900'
            }`}
          >
            {card.authorAvatar ? (
              <img
                src={card.authorAvatar}
                alt={card.authorName || 'Avatar'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{card.authorName?.charAt(0) || 'U'}</span>
            )}
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
              {card.authorName}
            </h4>
            <p className="text-[11px] font-medium text-gray-500 leading-tight mt-0.5">
              {card.authorRole}
            </p>
          </div>
        </div>

        {/* 5 Yellow Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: card.stars || 5 }).map((_, i) => (
            <Star
              key={i}
              size={15}
              className="fill-[#FBBF24] text-[#FBBF24]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowcaseCard
