"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Send, User } from 'lucide-react'

interface TeamChatProps {
  projectId: number
  teamMembers: string[]
}

interface ChatMessage {
  id: number
  sender: string
  message: string
  timestamp: string
}

export function TeamChat({ projectId, teamMembers }: TeamChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Alice",
      message: "Just uploaded the latest wireframes to the shared folder. What do you think about the navigation structure?",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      sender: "Bob",
      message: "Looks great! The user flow is much clearer now. Should we present this version to the client?",
      timestamp: "10:45 AM"
    },
    {
      id: 3,
      sender: "Carol",
      message: "I've analyzed the user feedback data - 85% positive response to the new layout direction. Let's move forward!",
      timestamp: "11:15 AM"
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now(),
        sender: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Team Members */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-black dark:text-white">Team Members ({teamMembers.length})</h3>
        <div className="flex flex-wrap gap-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <User className="h-3 w-3" />
              {member}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-64 overflow-y-auto mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'You' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{msg.sender}</span>
                    <span className="text-xs opacity-70">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="text-left justify-start">
          📋 Share Design Assets
        </Button>
        <Button variant="outline" className="text-left justify-start">
          📊 Review Data Insights
        </Button>
      </div>
    </div>
  )
}