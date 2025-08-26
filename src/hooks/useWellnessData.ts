'use client'

import { useState, useEffect } from 'react'
import { WellnessEntry, WellnessStats, ChartData } from '@/types/wellness'
import { format, subDays, startOfDay } from 'date-fns'

// Mock data generator
const generateMockData = (): WellnessEntry[] => {
  const entries: WellnessEntry[] = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i)
    const dateStr = format(date, 'yyyy-MM-dd')
    
    entries.push({
      id: `entry-${i}`,
      date: dateStr,
      steps: Math.floor(Math.random() * 5000) + 3000,
      sleep: Math.floor(Math.random() * 3) + 6,
      mood: ['excellent', 'good', 'okay', 'poor', 'terrible'][Math.floor(Math.random() * 5)] as any,
      water: Math.floor(Math.random() * 4) + 4,
      exercise: Math.floor(Math.random() * 60) + 20,
      notes: Math.random() > 0.7 ? 'Had a great day!' : undefined,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    })
  }
  
  return entries
}

export function useWellnessData() {
  const [entries, setEntries] = useState<WellnessEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage or generate mock data
    const savedEntries = localStorage.getItem('wellness-entries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    } else {
      const mockData = generateMockData()
      setEntries(mockData)
      localStorage.setItem('wellness-entries', JSON.stringify(mockData))
    }
    setLoading(false)
  }, [])

  const saveEntries = (newEntries: WellnessEntry[]) => {
    setEntries(newEntries)
    localStorage.setItem('wellness-entries', JSON.stringify(newEntries))
  }

  const addEntry = (entry: Omit<WellnessEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: WellnessEntry = {
      ...entry,
      id: `entry-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const newEntries = [...entries, newEntry]
    saveEntries(newEntries)
    return newEntry
  }

  const updateEntry = (id: string, updates: Partial<WellnessEntry>) => {
    const newEntries = entries.map(entry =>
      entry.id === id
        ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
        : entry
    )
    saveEntries(newEntries)
  }

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id)
    saveEntries(newEntries)
  }

  const getEntryByDate = (date: string) => {
    return entries.find(entry => entry.date === date)
  }

  const getStats = (): WellnessStats => {
    if (entries.length === 0) {
      return {
        totalSteps: 0,
        averageSleep: 0,
        averageMood: 0,
        totalWater: 0,
        totalExercise: 0,
        streakDays: 0,
      }
    }

    const totalSteps = entries.reduce((sum, entry) => sum + entry.steps, 0)
    const averageSleep = entries.reduce((sum, entry) => sum + entry.sleep, 0) / entries.length
    const moodValues = entries.map(entry => {
      const moodMap = { excellent: 5, good: 4, okay: 3, poor: 2, terrible: 1 }
      return moodMap[entry.mood]
    })
    const averageMood = moodValues.reduce((sum, mood) => sum + mood, 0) / moodValues.length
    const totalWater = entries.reduce((sum, entry) => sum + entry.water, 0)
    const totalExercise = entries.reduce((sum, entry) => sum + entry.exercise, 0)

    // Calculate streak
    let streakDays = 0
    const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    for (const entry of sortedEntries) {
      if (entry.steps >= 5000) {
        streakDays++
      } else {
        break
      }
    }

    return {
      totalSteps,
      averageSleep: Math.round(averageSleep * 10) / 10,
      averageMood: Math.round(averageMood * 10) / 10,
      totalWater,
      totalExercise,
      streakDays,
    }
  }

  const getChartData = (days: number = 7): ChartData[] => {
    const recentEntries = entries
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, days)
      .reverse()

    return recentEntries.map(entry => ({
      date: format(new Date(entry.date), 'MMM dd'),
      steps: entry.steps,
      sleep: entry.sleep,
      mood: { excellent: 5, good: 4, okay: 3, poor: 2, terrible: 1 }[entry.mood],
      water: entry.water,
      exercise: entry.exercise,
    }))
  }

  return {
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryByDate,
    getStats,
    getChartData,
  }
} 