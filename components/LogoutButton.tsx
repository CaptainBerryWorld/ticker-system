'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    const result = await logout()
    
    if (result.success) {
      router.push('/admin/login')
      router.refresh()
    }
    
    setIsLoggingOut(false)
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  )
}
