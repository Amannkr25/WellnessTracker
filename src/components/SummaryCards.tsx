'use client'

import { WellnessStats } from '@/types/wellness'
import { Footprints, Moon, Heart, Droplets, Dumbbell, Flame } from 'lucide-react'

interface SummaryCardsProps {
  stats: WellnessStats
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Steps',
      value: stats.totalSteps.toLocaleString(),
      icon: Footprints,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: 'This month',
    },
    {
      title: 'Average Sleep',
      value: `${stats.averageSleep}h`,
      icon: Moon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      description: 'Per night',
    },
    {
      title: 'Average Mood',
      value: `${stats.averageMood}/5`,
      icon: Heart,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      description: 'Daily average',
    },
    {
      title: 'Water Intake',
      value: `${stats.totalWater}L`,
      icon: Droplets,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      description: 'This month',
    },
    {
      title: 'Exercise Time',
      value: `${Math.round(stats.totalExercise / 60)}h`,
      icon: Dumbbell,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      description: 'This month',
    },
    {
      title: 'Step Streak',
      value: `${stats.streakDays} days`,
      icon: Flame,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      description: 'Current streak',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 