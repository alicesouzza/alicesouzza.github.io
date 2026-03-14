'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'
import { Button } from '@/components/ui/Button'

export function Header() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="font-bold text-xl text-primary">
            SaaS Platform
          </Link>
          <Button
            variant="outline"
            onClick={handleLogout}
            isLoading={isLoading}
            className="text-sm"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
