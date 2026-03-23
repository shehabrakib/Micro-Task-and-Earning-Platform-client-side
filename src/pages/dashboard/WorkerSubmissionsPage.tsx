import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

const ITEMS_PER_PAGE = 10

function getStatusClass(status: string): string {
  if (status === 'approved') {
    return 'bg-emerald-50 text-emerald-700'
  }

  if (status === 'rejected') {
    return 'bg-red-50 text-red-700'
  }

  return 'bg-amber-50 text-amber-700'
}

function toTitleCase(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function WorkerSubmissionsPage() {
  const { currentUser } = useAuth()
  const { submissions } = useMockData()
  const [currentPage, setCurrentPage] = useState(1)

  if (currentUser === null) {
    return null
  }

  const workerSubmissions = submissions
    .filter(
      (submission) =>
        submission.worker_email.toLowerCase() === currentUser.email.toLowerCase(),
    )
    .slice()
    .sort((firstItem, secondItem) => {
      const firstTime = new Date(firstItem.current_date).getTime()
      const secondTime = new Date(secondItem.current_date).getTime()
      return secondTime - firstTime
    })

  const totalPages = Math.max(
    1,
    Math.ceil(workerSubmissions.length / ITEMS_PER_PAGE),
  )

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedSubmissions = workerSubmissions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  )

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return
    }

    setCurrentPage(nextPage)
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">My Submissions</h2>
        <p className="mt-1 text-sm text-slate-600">
          Track your submissions and check current review status.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        {workerSubmissions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">
            No submissions found for your account yet.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Task Title</th>
                    <th className="px-5 py-3 font-medium">Payable</th>
                    <th className="px-5 py-3 font-medium">Buyer</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {paginatedSubmissions.map((submission) => (
                    <tr key={submission._id} className="border-t border-slate-100">
                      <td className="px-5 py-3">{submission.task_title}</td>
                      <td className="px-5 py-3">
                        {submission.payable_amount} coins
                      </td>
                      <td className="px-5 py-3">{submission.buyer_name}</td>
                      <td className="px-5 py-3">
                        {formatDate(submission.current_date)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={[
                            'rounded-full px-2.5 py-1 text-xs font-semibold',
                            getStatusClass(submission.status),
                          ].join(' ')}
                        >
                          {toTitleCase(submission.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
              <p className="text-xs text-slate-500">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default WorkerSubmissionsPage
