'use client'

import { useEffect } from 'react'
import { AuthScreen } from '@/components/AuthScreen'
import { Dashboard } from '@/components/Dashboard'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user, loading } = useAuth()

  useEffect(() => {
    // Minimal debug
    console.log('User state changed:', user)
  }, [user])

  // Render immediately; auth initializes synchronously from localStorage

  console.log('Rendering main content. User:', user ? 'YES' : 'NO')
  
  return (
    <main className="min-h-screen">
      {user ? (
        <Dashboard key={`dashboard-${user.id}`} />
      ) : (
        <AuthScreen key="auth-screen" />
      )}
    </main>
  )
} 