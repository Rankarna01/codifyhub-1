import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NotFoundContent from '@/components/ui/NotFoundContent'

export const metadata: Metadata = {
  title: '404 - Page Not Found | CodifyHub',
  description: "The page you are looking for doesn't exist or has been moved."
}

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-28 pb-16">
        <NotFoundContent />
      </div>
      <Footer />
    </main>
  )
}
