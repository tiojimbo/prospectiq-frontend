'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function HeavyLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {/* Substitua pelo logo real, se necessário */}
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-3" />
        <span className="text-purple-600 text-2xl font-semibold tracking-wide">Prospect IQ</span>
      </motion.div>
    </div>
  )
}
