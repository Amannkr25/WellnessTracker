'use client'

import { useState } from 'react'
import { useWellnessData } from '@/hooks/useWellnessData'
import { WellnessEntry } from '@/types/wellness'
import { format } from 'date-fns'
import { Edit, Trash2, Calendar, Footprints, Moon, Heart, Droplets, Dumbbell, MessageSquare } from 'lucide-react'
import { MOOD_LABELS, MOOD_COLORS } from '@/types/wellness'

export function EntriesList() {
  const { entries, deleteEntry, updateEntry } = useWellnessData()
  const [editingEntry, setEditingEntry] = useState<WellnessEntry | null>(null)
  const [editingData, setEditingData] = useState<Partial<WellnessEntry>>({})

  const handleEdit = (entry: WellnessEntry) => {
    setEditingEntry(entry)
    setEditingData({
      steps: entry.steps,
      sleep: entry.sleep,
      mood: entry.mood,
      water: entry.water,
      exercise: entry.exercise,
      notes: entry.notes,
    })
  }

  const handleSave = () => {
    if (editingEntry) {
      updateEntry(editingEntry.id, editingData)
      setEditingEntry(null)
      setEditingData({})
    }
  }

  const handleCancel = () => {
    setEditingEntry(null)
    setEditingData({})
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id)
    }
  }

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const getMoodDisplay = (mood: WellnessEntry['mood']) => {
    const moodMap = { excellent: 5, good: 4, okay: 3, poor: 2, terrible: 1 }
    const level = moodMap[mood] as keyof typeof MOOD_COLORS
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${MOOD_COLORS[level]} bg-opacity-10`}>
        {MOOD_LABELS[level]}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Wellness Entries
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {entries.length} entries total
        </p>
      </div>

      <div className="space-y-4">
        {sortedEntries.map((entry) => (
          <div key={entry.id} className="card">
            {editingEntry?.id === entry.id ? (
             
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Steps
                    </label>
                    <input
                      type="number"
                      value={editingData.steps || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, steps: parseInt(e.target.value) || 0 }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sleep (hours)
                    </label>
                    <input
                      type="number"
                      value={editingData.sleep || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, sleep: parseFloat(e.target.value) || 0 }))}
                      className="input-field"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mood
                    </label>
                    <select
                      value={editingData.mood || 'good'}
                      onChange={(e) => setEditingData(prev => ({ ...prev, mood: e.target.value as WellnessEntry['mood'] }))}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Water (glasses)
                    </label>
                    <input
                      type="number"
                      value={editingData.water || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, water: parseInt(e.target.value) || 0 }))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Exercise (minutes)
                  </label>
                  <input
                    type="number"
                    value={editingData.exercise || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, exercise: parseInt(e.target.value) || 0 }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={editingData.notes || ''}
                    onChange={(e) => setEditingData(prev => ({ ...prev, notes: e.target.value }))}
                    className="input-field"
                    rows={2}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(entry.date), 'EEEE, MMMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Footprints className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Steps</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{entry.steps.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Moon className="h-4 w-4 text-purple-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sleep</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{entry.sleep}h</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Heart className="h-4 w-4 text-pink-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mood</p>
                    <div className="mt-1">{getMoodDisplay(entry.mood)}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Droplets className="h-4 w-4 text-cyan-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Water</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{entry.water} glasses</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Dumbbell className="h-4 w-4 text-orange-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exercise</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{entry.exercise} min</p>
                  </div>
                </div>

                {/* Notes */}
                {entry.notes && (
                  <div className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{entry.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No entries yet. Add your first wellness entry!</p>
        </div>
      )}
    </div>
  )
} 