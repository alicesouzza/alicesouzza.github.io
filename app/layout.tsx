import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Platform',
  description: 'Plataforma SaaS escalável com múltiplos módulos',
  viewport: 'width=device-width, initial-scale=1',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
