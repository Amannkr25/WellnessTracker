'use client'

import { ChartData } from '@/types/wellness'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface WellnessChartProps {
  title: string
  data: ChartData[]
  type: 'steps-sleep' | 'mood-exercise'
}

export function WellnessChart({ title, data, type }: WellnessChartProps) {
  const isStepsSleep = type === 'steps-sleep'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
              {entry.name === 'Steps' ? '' : entry.name === 'Sleep' ? 'h' : entry.name === 'Exercise' ? 'min' : ''}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (isStepsSleep) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              yAxisId="left"
              stroke="#3b82f6"
              fontSize={12}
              label={{ value: 'Steps', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#8b5cf6"
              fontSize={12}
              label={{ value: 'Sleep (hours)', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="steps"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name="Steps"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sleep"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              name="Sleep"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis
            yAxisId="left"
            stroke="#ec4899"
            fontSize={12}
            label={{ value: 'Mood (1-5)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#f97316"
            fontSize={12}
            label={{ value: 'Exercise (min)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            yAxisId="left"
            dataKey="mood"
            fill="#ec4899"
            radius={[4, 4, 0, 0]}
            name="Mood"
          />
          <Bar
            yAxisId="right"
            dataKey="exercise"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
            name="Exercise"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 