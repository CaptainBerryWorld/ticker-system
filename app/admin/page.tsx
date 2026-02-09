import { getTickets } from '@/app/actions/tickets'
import { checkAuth } from '@/app/actions/auth'
import TicketCard from '@/components/TicketCard'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import DownloadReportButton from '@/components/DownloadReportButton'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  // Check authentication
  const { isAuthenticated } = await checkAuth()
  
  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  const result = await getTickets()

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            Error: {result.error}
          </div>
        </div>
      </div>
    )
  }

  const tickets = result.data || []
  const openTickets = tickets.filter(t => !t.is_resolved).length
  const resolvedTickets = tickets.filter(t => t.is_resolved).length
  const escalatedTickets = tickets.filter(t => t.needs_escalation).length

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Ticket Management</h1>
              <p className="mt-1 text-sm text-gray-600">View and manage all IT support tickets</p>
            </div>
            <div className="flex items-center gap-3">
              <DownloadReportButton tickets={tickets} />
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                ← Back to Home
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 px-5 py-4">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Tickets</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{tickets.length}</p>
          </div>
          <div className="bg-white border border-gray-200 px-5 py-4">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Open</p>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">{openTickets}</p>
          </div>
          <div className="bg-white border border-gray-200 px-5 py-4">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Resolved</p>
            <p className="mt-2 text-3xl font-semibold text-green-600">{resolvedTickets}</p>
          </div>
          <div className="bg-white border border-gray-200 px-5 py-4">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Escalated</p>
            <p className="mt-2 text-3xl font-semibold text-red-600">{escalatedTickets}</p>
          </div>
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="bg-white border border-gray-200 px-6 py-12 text-center">
            <p className="text-gray-500">No tickets found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
