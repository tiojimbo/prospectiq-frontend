'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface AnimatedPageProps {
  children: React.ReactNode
}

export default function AnimatedPage({ children }: AnimatedPageProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
