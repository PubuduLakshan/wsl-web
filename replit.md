# DataSync Studio - Designer Data Collaboration Platform

## Overview
DataSync Studio is a Next.js-based static website that serves as a designer-focused data collaboration platform with AI chatbot integration for team and client communication. The platform provides comprehensive tools for design project management, data visualization, team collaboration, and client communication.

## Project Architecture

### Frontend Structure
- **Framework**: Next.js 15 with TypeScript and static export configuration
- **Styling**: Tailwind CSS with custom design system and dark mode support
- **UI Components**: Radix UI primitives with custom styled components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography

### Core Features

#### 1. Project Dashboard
- Real-time project overview with completion tracking
- Key metrics display (user feedback, design iterations, client approvals)
- Project selection and management interface

#### 2. Data Visualization
- Interactive charts showing project analytics
- Timeline visualization of project progress  
- AI-generated insights based on project data
- Multiple chart types: bar charts, line charts, pie charts

#### 3. Team Communication
- Real-time team chat functionality
- Team member management and status tracking
- Quick action buttons for common tasks
- Message threading and timestamps

#### 4. Client Communication Portal
- Client update sharing and milestone tracking
- Feedback collection and approval workflow
- Status tracking (pending, approved, needs revision)
- Client feedback timeline and history

#### 5. AI Data Chatbot
- Intelligent data analysis and insights
- Natural language queries about project data
- Quick action buttons for common analysis tasks
- Contextual responses based on project metrics

### Component Structure
```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── header.tsx           # Main navigation header
│   ├── sidebar.tsx          # Project navigation sidebar
│   ├── data-visualization.tsx    # Charts and analytics
│   ├── team-chat.tsx        # Team communication interface
│   ├── client-communication.tsx  # Client portal interface
│   ├── data-chatbot.tsx     # AI assistant chatbot
│   └── theme-provider.tsx   # Dark/light theme management
└── lib/
    └── utils.ts             # Utility functions
```

## Key Features Implemented

### ✓ Core Functionality
- Multi-project dashboard with project switching
- Real-time data visualization with interactive charts
- Team collaboration chat interface
- Client communication portal with update tracking
- AI-powered data analysis chatbot
- Responsive design with mobile support

### ✓ UI/UX Features  
- Modern, clean design with professional color scheme
- Dark mode support throughout the application
- Smooth animations and transitions
- Intuitive navigation with sidebar and tabs
- Accessible components using Radix UI

### ✓ Data Features
- Sample project data with realistic metrics
- Interactive charts showing project progress
- AI-generated insights and recommendations
- Timeline tracking for project milestones
- Client feedback and approval tracking

## Sample Data Structure
The application uses mock data representing:
- **Projects**: Design projects with completion rates, team members, and client information
- **Metrics**: User feedback counts, design iterations, client approvals
- **Communications**: Team messages, client updates, and AI chatbot responses
- **Analytics**: Progress timelines, performance indicators, and trend analysis

## Recent Changes
- **2024-01-20**: Initial project setup with Next.js static export configuration
- **2024-01-20**: Implemented core dashboard with project overview cards
- **2024-01-20**: Created data visualization component with multiple chart types
- **2024-01-20**: Built team communication interface with real-time messaging
- **2024-01-20**: Developed client communication portal with update tracking
- **2024-01-20**: Integrated AI chatbot for data analysis and insights

## User Preferences
- Clean, professional design aesthetic suitable for designers
- Emphasis on data visualization and analytics
- Real-time collaboration features
- Mobile-responsive interface
- Comprehensive AI assistant integration

## Technical Notes
- Next.js configured for static export (output: 'export')
- TypeScript used throughout for type safety
- Tailwind CSS with custom color scheme and dark mode
- Radix UI components for accessibility and consistency
- Recharts for interactive data visualization

## Next Steps
- Add real-time WebSocket support for live team chat
- Implement file upload and sharing capabilities
- Add user authentication and project permissions
- Integrate with design tools APIs (Figma, Sketch, etc.)
- Enhance AI chatbot with more advanced analytics