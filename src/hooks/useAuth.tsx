'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface User {
  id: string
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  signup: (email: string, password: string, name: string) => Promise<User>
  logout: () => void
  checkUserExists: (email: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const savedUser = localStorage.getItem('wellness-user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [loading] = useState(false)

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'wellness-user') {
        const next = event.newValue ? JSON.parse(event.newValue) : null
        setUser(next)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const login = async (email: string, password: string) => {
    const signupData = localStorage.getItem('wellness-signup-data')
    let loggedInUser: User | null = null

    // Allow demo account without prior signup
    const isDemo = email.toLowerCase() === 'demo@wellness.com'

    if (signupData) {
      const parsedData = JSON.parse(signupData)
      if (parsedData.email === email && parsedData.password === password) {
        loggedInUser = {
          id: parsedData.id,
          email: parsedData.email,
          name: parsedData.name,
        }
      }
    }

    if (!loggedInUser) {
      if (!isDemo) {
        throw new Error('ACCOUNT_NOT_FOUND')
      }
      loggedInUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      }
    }

    setUser(loggedInUser)
    localStorage.setItem('wellness-user', JSON.stringify(loggedInUser))
    return loggedInUser
  }

  const signup = async (email: string, password: string, name: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
    }
    localStorage.setItem('wellness-signup-data', JSON.stringify({
      email,
      password,
      name,
      id: mockUser.id,
    }))
    return mockUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('wellness-user')
  }

  const checkUserExists = (email: string) => {
    const signupData = localStorage.getItem('wellness-signup-data')
    if (signupData) {
      const parsedData = JSON.parse(signupData)
      return parsedData.email === email
    }
    return false
  }

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    login,
    signup,
    logout,
    checkUserExists,
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


