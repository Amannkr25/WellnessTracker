'use client'

import { useAuth } from '@/hooks/useAuth'
import { useTheme } from './ThemeProvider'
import { Heart, Moon, Sun, LogOut, User } from 'lucide-react'

interface HeaderProps {
  user: any
}

export function Header({ user }: HeaderProps) {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-wellness-500 mr-3" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Wellness Tracker
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 text-gray-600" />
              ) : (
                <Sun className="h-4 w-4 text-yellow-500" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <User className="h-4 w-4" />
                {user?.name || 'User'}
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      console.log('Logout button clicked')
                      logout()
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 