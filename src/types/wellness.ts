export interface WellnessEntry {
  id: string
  date: string
  steps: number
  sleep: number
  mood: 'excellent' | 'good' | 'okay' | 'poor' | 'terrible'
  water: number
  exercise: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface WellnessStats {
  totalSteps: number
  averageSleep: number
  averageMood: number
  totalWater: number
  totalExercise: number
  streakDays: number
}

export interface ChartData {
  date: string
  steps: number
  sleep: number
  mood: number
  water: number
  exercise: number
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5

export const MOOD_LABELS: Record<MoodLevel, string> = {
  1: 'Terrible',
  2: 'Poor',
  3: 'Okay',
  4: 'Good',
  5: 'Excellent',
}

export const MOOD_COLORS: Record<MoodLevel, string> = {
  1: 'text-red-500',
  2: 'text-orange-500',
  3: 'text-yellow-500',
  4: 'text-green-500',
  5: 'text-emerald-500',
} 