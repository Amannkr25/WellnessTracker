'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useWellnessData } from '@/hooks/useWellnessData'
import { Header } from './Header'
import { SummaryCards } from './SummaryCards'
import { WellnessChart } from './WellnessChart'
import { EntryForm } from './EntryForm'
import { EntriesList } from './EntriesList'
import { Plus, BarChart3, List } from 'lucide-react'

type ViewMode = 'overview' | 'entries' | 'add-entry'

export function Dashboard() {
  const { user } = useAuth()
  const { getStats, getChartData } = useWellnessData()
  const [viewMode, setViewMode] = useState<ViewMode>('overview')
  

  console.log('Dashboard component rendered with user:', user)

  
  if (!user) {
    console.log('No user in Dashboard, redirecting...')
    return <div>Loading...</div>
  }

  const stats = getStats()
  const chartData = getChartData(7)

  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      active: viewMode === 'overview',
    },
    {
      id: 'entries',
      label: 'Entries',
      icon: List,
      active: viewMode === 'entries',
    },
    {
      id: 'add-entry',
      label: 'Add Entry',
      icon: Plus,
      active: viewMode === 'add-entry',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setViewMode(item.id as ViewMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </div>

       
        <div className="space-y-8">
          {viewMode === 'overview' && (
            <>
              <SummaryCards stats={stats} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <WellnessChart
                  title="Steps & Sleep (Last 7 Days)"
                  data={chartData}
                  type="steps-sleep"
                />
                <WellnessChart
                  title="Mood & Exercise (Last 7 Days)"
                  data={chartData}
                  type="mood-exercise"
                />
              </div>
            </>
          )}

          {viewMode === 'entries' && <EntriesList />}
          
          {viewMode === 'add-entry' && <EntryForm />}
        </div>
      </div>
      
    </div>
  )
} 