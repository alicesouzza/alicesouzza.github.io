'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/help-desk', label: 'Help Desk', icon: '🎫' },
  { href: '/dashboard/quiz', label: 'Quiz', icon: '❓' },
  { href: '/dashboard/simulador', label: 'Simulador', icon: '💻' },
  { href: '/dashboard/gerador-senhas', label: 'Gerador de Senhas', icon: '🔑' },
  { href: '/dashboard/financeiro', label: 'Financeiro', icon: '💰' },
  { href: '/dashboard/pricing', label: 'Planos', icon: '💳' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary'
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
