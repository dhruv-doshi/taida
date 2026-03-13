import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import Navbar from '@/components/Navbar'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect(ROUTES.LOGIN)
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
