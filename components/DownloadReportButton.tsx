'use client'

import { useState } from 'react'

interface Ticket {
  id: string
  created_at: string
  date: string
  staff_name: string
  department: string
  position: string
  email: string
  ticket_type: string
  description: string
  location: string
  is_resolved: boolean
  needs_escalation: boolean
  solution: string | null
  updated_at: string
}

interface DownloadReportButtonProps {
  tickets: Ticket[]
}

export default function DownloadReportButton({ tickets }: DownloadReportButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadCSV = () => {
    setIsDownloading(true)
    
    try {
      // Define CSV headers
      const headers = [
        'Ticket ID',
        'Created Date',
        'Issue Date',
        'Staff Name',
        'Department',
        'Position',
        'Email',
        'Ticket Type',
        'Description',
        'Location',
        'Status',
        'Escalated',
        'Solution',
        'Last Updated'
      ]

      // Convert tickets to CSV rows
      const rows = tickets.map(ticket => {
        const createdDate = new Date(ticket.created_at)
        const updatedDate = new Date(ticket.updated_at)
        
        return [
          ticket.id,
          `"${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}"`,
          ticket.date,
          ticket.staff_name,
          ticket.department,
          ticket.position,
          ticket.email,
          ticket.ticket_type,
          `"${ticket.description.replace(/"/g, '""')}"`, // Escape quotes
          ticket.location,
          ticket.is_resolved ? 'Resolved' : 'Open',
          ticket.needs_escalation ? 'Yes' : 'No',
          ticket.solution ? `"${ticket.solution.replace(/"/g, '""')}"` : 'N/A',
          `"${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString()}"`
        ]
      })

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `tickets_report_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={downloadCSV}
      disabled={isDownloading || tickets.length === 0}
      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {isDownloading ? 'Generating...' : 'Download Report'}
    </button>
  )
}
