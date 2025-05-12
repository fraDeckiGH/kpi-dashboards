import React from 'react'

interface Props {
  children: React.ReactNode
  description: string
  title: string
}

export default function AssetGrid({ 
  children,
  title, 
  description,
}: Props) {
  return (
    <div className="@container">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <div className="grid grid-cols-1 gap-4
        @2xl:grid-cols-2 
        @5xl:grid-cols-3 
        @7xl:grid-cols-4 
      ">
        {children}
      </div>
    </div>
  );
}