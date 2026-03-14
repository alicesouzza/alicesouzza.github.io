import { create } from 'zustand'

interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'user' | 'support'
  organization_id: string
  avatar_url?: string
}

interface UserStore {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}))
