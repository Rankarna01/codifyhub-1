'use client'

import React from 'react'

export interface TerminalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  code?: string
  language?: string
  showTrafficDots?: boolean
}

export const TerminalCard: React.FC<TerminalCardProps> = ({
  title = 'codifyhub_api.ts',
  code,
  showTrafficDots = true,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`border-2 border-black rounded-2xl bg-[#1E2235] text-white shadow-[6px_6px_0px_#000000] overflow-hidden flex flex-col font-mono text-xs ${className}`}
      {...props}
    >
      {/* Top Bar with traffic dots */}
      <div className="bg-[#151824] px-4 py-2.5 border-b-2 border-black flex items-center justify-between">
        {showTrafficDots ? (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block" />
          </div>
        ) : (
          <div className="w-3" />
        )}
        <div className="text-[11px] font-medium text-gray-400 font-sans tracking-wide">
          {title}
        </div>
        <div className="w-10" />
      </div>

      {/* Code Area */}
      <div className="p-5 overflow-x-auto leading-relaxed text-gray-200">
        {code ? (
          <pre className="text-left font-mono">
            <code>{code}</code>
          </pre>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default TerminalCard
