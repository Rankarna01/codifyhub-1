'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import MiniStudioHero from '../mini-studio/MiniStudioHero'

const OrderModal = dynamic(() => import('../ui/OrderModal'), { ssr: false })

export default function MiniStudio() {
  const [consulting, setConsulting] = useState(false)
  return <>
    <MiniStudioHero placement="section" onConsult={() => setConsulting(true)} />
    {consulting && <OrderModal isOpen onClose={() => setConsulting(false)} />}
  </>
}
