"use client"

import React from 'react'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface ProjectData {
  id: number
  name: string
  dataPoints: {
    userFeedback: number
    designIterations: number
    clientApprovals: number
  }
}

interface DataVisualizationProps {
  projectData: ProjectData
}

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']

export function DataVisualization({ projectData }: DataVisualizationProps) {
  const chartData = [
    {
      name: 'User Feedback',
      value: projectData.dataPoints.userFeedback,
      color: COLORS[0]
    },
    {
      name: 'Design Iterations',
      value: projectData.dataPoints.designIterations,
      color: COLORS[1]
    },
    {
      name: 'Client Approvals',
      value: projectData.dataPoints.clientApprovals,
      color: COLORS[2]
    }
  ]

  const timelineData = [
    { week: 'Week 1', iterations: 2, feedback: 15, approvals: 0 },
    { week: 'Week 2', iterations: 3, feedback: 28, approvals: 1 },
    { week: 'Week 3', iterations: 2, feedback: 35, approvals: 1 },
    { week: 'Week 4', iterations: 1, feedback: 45, approvals: 2 },
    { week: 'Week 5', iterations: 0, feedback: 19, approvals: 1 }
  ]

  return (
    <div className="space-y-8">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Project Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Progress Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(255 255 255)', 
                  border: '1px solid rgb(229 231 235)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Project Timeline</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="week" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgb(255 255 255)', 
                border: '1px solid rgb(229 231 235)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="iterations" 
              stroke="#06b6d4" 
              strokeWidth={2}
              name="Design Iterations"
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="feedback" 
              stroke="#10b981" 
              strokeWidth={2}
              name="User Feedback"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="approvals" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Client Approvals"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Panel */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">AI-Generated Insights</h3>
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-primary">High user engagement:</strong> The project shows {projectData.dataPoints.userFeedback} feedback responses, indicating strong user interest and engagement with the design direction.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-green-600">Efficient iteration process:</strong> With {projectData.dataPoints.designIterations} design iterations and {projectData.dataPoints.clientApprovals} approvals, the team is maintaining a good approval-to-iteration ratio.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}