import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <main className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            IT Support Ticketing System
          </h1>
          <p className="text-gray-600">
            Submit and manage technical support requests
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Create New Ticket */}
          <Link href="/new-ticket">
            <div className="bg-white border-2 border-gray-200 p-8 hover:border-blue-600 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Create New Ticket</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Submit a new IT support request for hardware, software, network, or other technical issues
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Admin Dashboard */}
          <Link href="/admin">
            <div className="bg-white border-2 border-gray-200 p-8 hover:border-blue-600 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Dashboard</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    View, manage, and resolve all submitted tickets. Update status and add solutions
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Information Grid */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Supported Ticket Categories
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Printer',
                'Laptop',
                'Desktop',
                'Network',
                'Internet',
                'Office Suite',
                'Email Reset',
                'Phone Apps'
              ].map((type) => (
                <div key={type} className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

