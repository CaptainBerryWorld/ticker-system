'use client'

import { useState } from 'react'
import { Ticket } from '@/lib/database.types'
import { updateTicket, deleteTicket } from '@/app/actions/tickets'
import { useRouter } from 'next/navigation'

interface TicketCardProps {
  ticket: Ticket
}

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

const TICKET_TYPES = [
  'PRINTER',
  'LAPTOP',
  'DESKTOP',
  'NETWORK',
  'INTERNET',
  'OFFICE SUITE',
  'EMAIL PASSWORD RESET',
  'PHONE APP INSTALLATIONS',
]

export default function TicketCard({ ticket }: TicketCardProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    const ticketType = formData.get('ticket_type') as string
    const updateData = {
      staff_name: formData.get('staff_name') as string,
      date: formData.get('date') as string,
      department: formData.get('department') as string,
      email: formData.get('email') as string,
      ticket_type: ticketType as typeof ticket.ticket_type,
      description: formData.get('description') as string,
      is_resolved: formData.get('is_resolved') === 'YES',
      needs_escalation: formData.get('needs_escalation') === 'YES',
      location: formData.get('location') as string,
      solution: formData.get('solution') as string,
    }

    const result = await updateTicket(ticket.id, updateData)

    if (result.success) {
      setIsEditing(false)
      router.refresh()
    } else {
      setError(result.error || 'Failed to update ticket')
    }

    setIsSubmitting(false)
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this ticket?')) return

    setIsSubmitting(true)
    const result = await deleteTicket(ticket.id)

    if (result.success) {
      router.refresh()
    } else {
      setError(result.error || 'Failed to delete ticket')
    }

    setIsSubmitting(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-base font-semibold text-gray-900">Edit Ticket</h2>
        </div>
        
        {error && (
          <div className="mx-6 mt-4 bg-red-50 border-l-4 border-red-500 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Staff Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="staff_name"
                  defaultValue={ticket.staff_name}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={ticket.date}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Department <span className="text-red-600">*</span>
                </label>
                <select
                  name="department"
                  defaultValue={ticket.department}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={ticket.email}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Ticket Type <span className="text-red-600">*</span>
                </label>
                <select
                  name="ticket_type"
                  defaultValue={ticket.ticket_type}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                >
                  {TICKET_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Location <span className="text-red-600">*</span>
                </label>
                <select
                  name="location"
                  defaultValue={ticket.location}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                >
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Issue Details */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Issue Details</h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                name="description"
                defaultValue={ticket.description}
                required
                rows={3}
                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Resolved? <span className="text-red-600">*</span>
                </label>
                <select
                  name="is_resolved"
                  defaultValue={ticket.is_resolved ? 'YES' : 'NO'}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Needs Escalation? <span className="text-red-600">*</span>
                </label>
                <select
                  name="needs_escalation"
                  defaultValue={ticket.needs_escalation ? 'YES' : 'NO'}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Solution <span className="text-red-600">*</span>
            </label>
            <textarea
              name="solution"
              defaultValue={ticket.solution || ''}
              required
              rows={3}
              placeholder="Describe the solution or actions taken..."
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-gray-900">#{ticket.id.slice(0, 8).toUpperCase()}</h3>
            <span className={`px-2.5 py-0.5 text-xs font-medium ${
              ticket.is_resolved 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {ticket.is_resolved ? 'Resolved' : 'Open'}
            </span>
            {ticket.needs_escalation && (
              <span className="px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                Escalated
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Created: {new Date(ticket.created_at).toLocaleDateString()} at {new Date(ticket.created_at).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-medium text-red-700 bg-white border border-red-300 hover:bg-red-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Staff Name</p>
            <p className="mt-1 text-sm text-gray-900">{ticket.staff_name}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Department</p>
            <p className="mt-1 text-sm text-gray-900">{ticket.department}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Position</p>
            <p className="mt-1 text-sm text-gray-900">{ticket.position}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
            <p className="mt-1 text-sm text-gray-900">{ticket.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ticket Type</p>
            <p className="mt-1 text-sm text-gray-900">{ticket.ticket_type}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
            <p className="mt-1 text-sm text-gray-900">{ticket.location}</p>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Description</p>
          <p className="text-sm text-gray-900 leading-relaxed">{ticket.description}</p>
        </div>

        {ticket.solution && (
          <div className="mt-5 pt-5 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Solution</p>
            <div className="bg-green-50 border border-green-200 px-4 py-3">
              <p className="text-sm text-gray-900 leading-relaxed">{ticket.solution}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
