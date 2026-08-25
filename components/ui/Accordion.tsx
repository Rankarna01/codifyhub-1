'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  variant?: 'white' | 'yellow' | 'accent' | 'mint' | 'slate'
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  variant = 'white'
}) => {
  const bgColors = {
    white: 'bg-white',
    yellow: 'bg-[#EFF6FF]',
    accent: 'bg-[#EFF6FF]',
    mint: 'bg-[#E8FBF0]',
    slate: 'bg-[#F8FAFC]'
  }

  return (
    <div className={`border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_#000000] mb-4 transition-all duration-200 ${bgColors[variant]}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-gray-900 hover:bg-black/5 transition cursor-pointer select-none"
      >
        <span className="text-base md:text-lg">{title}</span>
        <div className={`w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 ml-4 shadow-[2px_2px_0px_#000000] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#3B82F6] text-white' : ''}`}>
          <ChevronDown size={18} className={isOpen ? 'text-white' : 'text-black'} />
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-5 pt-1 text-sm md:text-base text-gray-700 leading-relaxed border-t-2 border-black/10">
          {children}
        </div>
      )}
    </div>
  )
}

export interface AccordionProps {
  items: { id: string | number; title: string; content: React.ReactNode }[]
  allowMultiple?: boolean
  variant?: 'white' | 'yellow' | 'mint' | 'slate'
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'white',
  className = ''
}) => {
  const [openIds, setOpenIds] = useState<(string | number)[]>([items[0]?.id])

  const toggle = (id: string | number) => {
    if (allowMultiple) {
      setOpenIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    } else {
      setOpenIds(prev => prev.includes(id) ? [] : [id])
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {items.map(item => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
          variant={variant}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
