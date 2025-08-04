"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Share2, MessageCircle, CheckCircle, Clock } from 'lucide-react'

interface ClientCommunicationProps {
  projectId: number
  clientName: string
}

interface ClientUpdate {
  id: number
  type: 'milestone' | 'feedback' | 'approval'
  title: string
  description: string
  status: 'pending' | 'approved' | 'needs_revision'
  date: string
}

export function ClientCommunication({ projectId, clientName }: ClientCommunicationProps) {
  const [updates, setUpdates] = useState<ClientUpdate[]>([
    {
      id: 1,
      type: 'milestone',
      title: 'Initial Wireframes Complete',
      description: 'Core page layouts and user flow diagrams ready for review',
      status: 'approved',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'milestone',
      title: 'High-Fidelity Mockups',
      description: 'Detailed visual designs with brand colors and typography',
      status: 'pending',
      date: '2024-01-20'
    },
    {
      id: 3,
      type: 'feedback',
      title: 'User Testing Results',
      description: 'Comprehensive analysis of user interaction patterns and preferences',
      status: 'approved',
      date: '2024-01-18'
    }
  ])

  const [newUpdate, setNewUpdate] = useState({
    title: '',
    description: ''
  })

  const handleShareUpdate = () => {
    if (newUpdate.title && newUpdate.description) {
      const update: ClientUpdate = {
        id: Date.now(),
        type: 'milestone',
        title: newUpdate.title,
        description: newUpdate.description,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      }
      setUpdates(prev => [update, ...prev])
      setNewUpdate({ title: '', description: '' })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'needs_revision':
        return <MessageCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'needs_revision':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Client Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Client Portal - {clientName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Share project updates, gather feedback, and maintain transparent communication with your client.
          </p>
        </CardContent>
      </Card>

      {/* Share New Update */}
      <Card>
        <CardHeader>
          <CardTitle>Share Project Update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={newUpdate.title}
            onChange={(e) => setNewUpdate(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Update title (e.g., 'Design System Complete')"
          />
          <Textarea
            value={newUpdate.description}
            onChange={(e) => setNewUpdate(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the update, what's been completed, and any feedback needed..."
            rows={3}
          />
          <Button onClick={handleShareUpdate} disabled={!newUpdate.title || !newUpdate.description}>
            <Share2 className="h-4 w-4 mr-2" />
            Share with Client
          </Button>
        </CardContent>
      </Card>

      {/* Project Updates Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="border-l-4 border-primary pl-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(update.status)}
                      <h4 className="font-medium text-black dark:text-white">{update.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(update.status)}`}>
                        {update.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{update.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">{update.date}</span>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {update.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Client Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Client:</strong> "Love the direction! The color palette really captures our brand identity. Can we explore some variations for the mobile layout?"
              </p>
              <span className="text-xs text-blue-600 dark:text-blue-400">2 hours ago</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300">
                <strong>Client:</strong> "The user testing data is very insightful. Let's proceed with the recommended changes for the checkout flow."
              </p>
              <span className="text-xs text-green-600 dark:text-green-400">Yesterday</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}