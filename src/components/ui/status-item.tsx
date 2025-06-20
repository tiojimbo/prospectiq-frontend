import React from 'react'

interface StatusItemProps {
  label: string
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'gray'
}

const colorMap: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  gray: 'bg-gray-400',
}

export const StatusItem: React.FC<StatusItemProps> = ({ label, color = 'gray' }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className={`w-2 h-2 rounded-full ${colorMap[color]}`} />
      <span>{label}</span>
    </div>
  )
}
