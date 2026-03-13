import type { Metadata } from 'next'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'
import QueryProvider from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'TAIDA — AI Competitive Intelligence',
  description: 'AI-powered competitor analysis and legal/regulatory intelligence for your business.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
