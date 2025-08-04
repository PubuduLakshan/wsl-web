"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Bot, Send, X, BarChart3, TrendingUp, Users } from 'lucide-react'

interface ProjectData {
  id: number
  name: string
  client: string
  dataPoints: {
    userFeedback: number
    designIterations: number
    clientApprovals: number
  }
}

interface DataChatbotProps {
  projectData: ProjectData
  onClose: () => void
}

interface ChatMessage {
  id: number
  type: 'user' | 'bot'
  message: string
  timestamp: string
}

export function DataChatbot({ projectData, onClose }: DataChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      message: `Hello! I'm your AI data assistant for the ${projectData.name} project. I can help you analyze project data, generate insights, and answer questions about your design metrics. What would you like to know?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')

  const quickActions = [
    {
      icon: <BarChart3 className="h-4 w-4" />,
      text: "Analyze user feedback trends",
      query: "What trends can you identify in our user feedback data?"
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      text: "Project performance summary",
      query: "Give me a summary of our project performance metrics"
    },
    {
      icon: <Users className="h-4 w-4" />,
      text: "Client satisfaction analysis",
      query: "How satisfied is our client based on approval data?"
    }
  ]

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage
    if (!messageToSend.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      message: messageToSend,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageToSend)
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('feedback') || message.includes('user')) {
      return `Based on your project data, you've received ${projectData.dataPoints.userFeedback} user feedback responses. This indicates high engagement! The feedback trend shows users are actively participating in the design review process. I recommend analyzing the sentiment of recent feedback to identify areas for improvement.`
    }
    
    if (message.includes('performance') || message.includes('summary')) {
      return `Here's your project performance summary:
      
• User Feedback: ${projectData.dataPoints.userFeedback} responses (excellent engagement)
• Design Iterations: ${projectData.dataPoints.designIterations} versions (efficient iteration cycle)
• Client Approvals: ${projectData.dataPoints.clientApprovals} approvals (strong client satisfaction)

Your project is performing well with a healthy approval-to-iteration ratio of ${(projectData.dataPoints.clientApprovals / projectData.dataPoints.designIterations * 100).toFixed(0)}%.`
    }
    
    if (message.includes('client') || message.includes('satisfaction')) {
      const approvalRate = (projectData.dataPoints.clientApprovals / projectData.dataPoints.designIterations * 100).toFixed(0)
      return `Client satisfaction analysis for ${projectData.client}:

Based on the approval data, your client has approved ${projectData.dataPoints.clientApprovals} out of ${projectData.dataPoints.designIterations} design iterations (${approvalRate}% approval rate). This suggests ${approvalRate > '60' ? 'high' : 'moderate'} client satisfaction. The feedback loop is working effectively, and the client is engaged in the design process.`
    }
    
    if (message.includes('recommendation') || message.includes('suggest')) {
      return `Based on your data, here are my recommendations:

1. **Maintain momentum**: With ${projectData.dataPoints.userFeedback} feedback responses, user engagement is strong. Keep this communication channel active.

2. **Optimize iterations**: You've completed ${projectData.dataPoints.designIterations} iterations. Consider consolidating feedback before the next iteration to improve efficiency.

3. **Client communication**: ${projectData.dataPoints.clientApprovals} approvals show good progress. Schedule a milestone review to discuss upcoming deliverables.`
    }
    
    return `I can help you analyze various aspects of your ${projectData.name} project. You can ask me about user feedback trends, client satisfaction, design iteration efficiency, or request specific insights about your project data. What would you like to explore?`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-black dark:text-white">AI Data Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b">
        <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left"
              onClick={() => handleSendMessage(action.query)}
            >
              {action.icon}
              <span className="ml-2 text-xs">{action.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg ${
              msg.type === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white border'
            }`}>
              {msg.type === 'bot' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-3 w-3" />
                  <span className="text-xs font-medium">AI Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{msg.message}</p>
              <span className="text-xs opacity-70 mt-2 block">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your project data..."
            className="flex-1"
          />
          <Button onClick={() => handleSendMessage()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}