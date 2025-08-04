"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Folder, Plus, Palette } from 'lucide-react'

interface Project {
  id: number
  name: string
  client: string
  status: string
  completionRate: number
}

interface SidebarProps {
  projects: Project[]
  onProjectSelect: (project: Project) => void
}

export function Sidebar({ projects, onProjectSelect }: SidebarProps) {
  return (
    <aside className="w-80 border-r bg-white dark:bg-black p-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold text-black dark:text-white">Projects</span>
      </div>
      
      <Button className="w-full mb-6" variant="default">
        <Plus className="h-4 w-4 mr-2" />
        New Project
      </Button>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <Card 
            key={project.id}
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => onProjectSelect(project)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium text-black dark:text-white">
                  {project.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {project.client}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {project.status}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {project.completionRate}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </aside>
  )
}