import { create } from 'zustand'

interface LoaderStore {
  isLoading: boolean
  showLoader: () => void
  hideLoader: () => void
}

export const useGlobalLoader = create<LoaderStore>((set) => ({
  isLoading: false,
  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
}))
