import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-6',
    md: 'w-6 h-8', 
    lg: 'w-8 h-10'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center gap-0.5 sm:gap-1 ${className}`}>
      {/* Logo Image */}
      <img 
        src="https://dm7ldj21i44fm.cloudfront.net/img/logo/wsl-1.png" 
        alt="Wild Sri Lanka Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      
      {/* Brand Text */}
      {showText && (
        <span className={`font-bold text-white ${textSizes[size]}`}>
          ILD SRILANKA
        </span>
      )}
    </div>
  )
}
