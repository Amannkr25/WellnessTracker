'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Heart, Activity, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { login, signup, checkUserExists } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    console.log('Form submitted:', { isLogin, email, password, name })
    
    try {
      if (isLogin) {
        console.log('Attempting login...')
        const result = await login(email, password)
        console.log('Login successful:', result)
        setMessage('Login successful! Redirecting...')
      } else {
        // Check if user already exists
        if (checkUserExists(email)) {
          setMessage('An account with this email already exists. Please login instead.')
          setIsLogin(true)
          return
        }
        
        console.log('Attempting signup...')
        const result = await signup(email, password, name)
        console.log('Signup successful:', result)
        setMessage('Account created successfully! Please login with your credentials.')
        // Keep the email but clear password and name, then switch to login mode
        setPassword('')
        setName('')
        setIsLogin(true)
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Auth error:', error)
      if ((error as Error).message === 'ACCOUNT_NOT_FOUND') {
        setMessage('No account found for this email. Please create an account first.')
        setIsLogin(false)
      } else {
        setMessage('Error during authentication. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-wellness-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Wellness Tracker
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Track your daily wellness journey
          </p>
          {!isLogin && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Create your account to get started
            </p>
          )}
          {isLogin && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Sign in to access your wellness dashboard
            </p>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
          </button>
        </div>

        {/* Auth Form */}
        <div className="card">
          <div className="flex mb-6">
            <button
              onClick={() => {
                setIsLogin(true)
                setMessage('')
                setPassword('')
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                isLogin
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setMessage('')
                setEmail('')
                setPassword('')
                setName('')
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                !isLogin
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>
            
            {/* Message Display */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('successful') || message.includes('created')
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                  : message.includes('already exists') || message.includes('Please login')
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
              }`}>
                {message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Activity className="h-5 w-5 mr-2" />
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
        
            <button
              onClick={() => {
                console.log('Demo login clicked')
                login('demo@wellness.com', 'demo123')
              }}
              className="mt-2 w-full btn-primary text-sm"
            >
              Quick Demo Login
            </button>
          
        </div>
      </div>
    </div>
  )
} 