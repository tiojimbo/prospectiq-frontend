'use client'

import { useGlobalLoader } from '@/store/useGlobalLoader'
import HeavyLoader from '@/components/HeavyLoader'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGlobalLoader()

  return (
    <>
      {isLoading && <HeavyLoader />}
      {children}
    </>
  )
}
