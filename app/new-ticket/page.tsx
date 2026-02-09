'use client'

import { useState } from 'react'
import { createTicket } from '@/app/actions/tickets'
import { TicketType } from '@/lib/database.types'
import { useRouter } from 'next/navigation'

const DEPARTMENTS = [
  'HEALTH & SAFETY',
  'TRANSMISSION',
  'HR & ADMIN',
  'IT UNIT',
  'ASSETS & INFRASTRUCTURE',
  'TERMINAL',
  'FUEL TRADING',
  'PROCUREMENT & SUPPLY CHAIN MGT',
  'AUDIT',
  'FINANCE',
  'MD SEC',
  'MONITORING AND EVALUATION',
  'CORPERATE PLANNING',
  'LEGAL & COMPLIANCE',
]

const LOCATIONS = [
  'CONTROL ROOM',
  'SERVER ROOM',
  'ADMINISTRATION',
  'HR OFFICE',
  'DISPATCH OFFICE',
  'MAINTENANCE OFFICE',
  'SAFETY OFFICE',
  'COUNTRY MANAGER OFFICE',
  'DEPOT MANAGER OFFICE',
  'OMC OFFICE',
  'GRA OFFICE',
  'FIRE SERVICE OFFICE',
  'MCC ROOM',
  'OLD BAY',
  'NEW BAY',
  'GRANTRY',
  'PUMP HOUSE',
  'EXIT GATE',
  'ENTRY GATE',
  'DISCHARGE CAR PACK',
  'LOADING CAR PARK',
  'DIPPING PLATFORM',
  'NPA OFFICE',
  'SECURITY OFFICE',
  'PANEL ROOM',
]

const TICKET_TYPES: TicketType[] = [
  'PRINTER',
  'LAPTOP',
  'DESKTOP',
  'NETWORK',
  'INTERNET',
  'OFFICE SUITE',
  'EMAIL PASSWORD RESET',
  'PHONE APP INSTALLATIONS',
]

export default function NewTicketPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    const ticketData = {
      date: formData.get('date') as string,
      staff_name: formData.get('staff_name') as string,
      department: formData.get('department') as string,
      position: formData.get('position') as string,
      email: formData.get('email') as string,
      ticket_type: formData.get('ticket_type') as TicketType,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
    }

    const result = await createTicket(ticketData)

    if (result.success) {
      alert('Ticket created successfully!')
      router.push('/')
    } else {
      setError(result.error || 'Failed to create ticket')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">New IT Support Ticket</h1>
              <p className="mt-1 text-sm text-gray-600">Submit a new technical support request</p>
            </div>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 shadow-sm">
          {error && (
            <div className="mx-8 mt-6 bg-red-50 border-l-4 border-red-500 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="staff_name" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Staff Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="staff_name"
                    name="staff_name"
                    required
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Department <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    required
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  >
                    <option value="">Select department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Position <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    required
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Ticket Details Section */}
            <div className="mb-8">
              <h2 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Ticket Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="ticket_type" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Ticket Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="ticket_type"
                    name="ticket_type"
                    required
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  >
                    <option value="">Select ticket type</option>
                    {TICKET_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Location of Issue <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  >
                    <option value="">Select location</option>
                    {LOCATIONS.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-1.5">
                    Description of Issue <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    placeholder="Please provide detailed information about the issue..."
                    className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
