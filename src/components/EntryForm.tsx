'use client'

import { useState } from 'react'
import { useWellnessData } from '@/hooks/useWellnessData'
import { WellnessEntry } from '@/types/wellness'
import { format } from 'date-fns'
import { Calendar, Save, Plus } from 'lucide-react'

export function EntryForm() {
  const { addEntry, getEntryByDate } = useWellnessData()
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    steps: '',
    sleep: '',
    mood: 'good' as WellnessEntry['mood'],
    water: '',
    exercise: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      
      const existingEntry = getEntryByDate(formData.date)
      if (existingEntry) {
        setMessage('An entry already exists for this date. Please edit the existing entry instead.')
        setLoading(false)
        return
      }

      const entry = {
        date: formData.date,
        steps: parseInt(formData.steps) || 0,
        sleep: parseFloat(formData.sleep) || 0,
        mood: formData.mood,
        water: parseInt(formData.water) || 0,
        exercise: parseInt(formData.exercise) || 0,
        notes: formData.notes.trim() || undefined,
      }

      await addEntry(entry)
      setMessage('Entry added successfully!')
      
     
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        steps: '',
        sleep: '',
        mood: 'good',
        water: '',
        exercise: '',
        notes: '',
      })
    } catch (error) {
      setMessage('Error adding entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Plus className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New Entry
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Steps
              </label>
              <input
                type="number"
                value={formData.steps}
                onChange={(e) => handleInputChange('steps', e.target.value)}
                className="input-field"
                placeholder="e.g., 8000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sleep (hours)
              </label>
              <input
                type="number"
                value={formData.sleep}
                onChange={(e) => handleInputChange('sleep', e.target.value)}
                className="input-field"
                placeholder="e.g., 7.5"
                min="0"
                max="24"
                step="0.5"
              />
            </div>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood
              </label>
              <select
                value={formData.mood}
                onChange={(e) => handleInputChange('mood', e.target.value)}
                className="input-field"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="okay">Okay</option>
                <option value="poor">Poor</option>
                <option value="terrible">Terrible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Water (glasses)
              </label>
              <input
                type="number"
                value={formData.water}
                onChange={(e) => handleInputChange('water', e.target.value)}
                className="input-field"
                placeholder="e.g., 8"
                min="0"
                max="20"
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Exercise (minutes)
            </label>
            <input
              type="number"
              value={formData.exercise}
              onChange={(e) => handleInputChange('exercise', e.target.value)}
              className="input-field"
              placeholder="e.g., 30"
              min="0"
              max="300"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="How was your day? Any special notes?"
            />
          </div>

      
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('successfully') 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
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
                <Save className="h-5 w-5 mr-2" />
                Save Entry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
} 