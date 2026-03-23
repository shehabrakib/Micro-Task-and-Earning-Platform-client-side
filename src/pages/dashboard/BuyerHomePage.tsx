import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

type SubmissionPreview = {
  workerName: string
  taskTitle: string
  details: string
}

function BuyerHomePage() {
  const { currentUser } = useAuth()
  const { tasks, submissions, payments, approveSubmission, rejectSubmission } =
    useMockData()
  const [preview, setPreview] = useState<SubmissionPreview | null>(null)

  if (currentUser === null) {
    return null
  }

  const buyerTasks = tasks.filter(
    (task) => task.buyer_email.toLowerCase() === currentUser.email.toLowerCase(),
  )

  const pendingSubmissions = submissions.filter(
    (submission) =>
      submission.buyer_email.toLowerCase() === currentUser.email.toLowerCase() &&
      submission.status === 'pending',
  )

  const buyerPayments = payments.filter(
    (payment) =>
      payment.buyer_email.toLowerCase() === currentUser.email.toLowerCase(),
  )

  const totalTasksAdded = buyerTasks.length
  const totalPendingWorkers = buyerTasks.reduce(
    (sum, task) => sum + task.required_workers,
    0,
  )
  const totalPaymentPaid = buyerPayments.reduce(
    (sum, payment) => sum + payment.amount_usd,
    0,
  )

  const handleApprove = (submissionId: string) => {
    const result = approveSubmission(submissionId)
    if (!result.success) {
      window.alert(result.message)
      return
    }

    window.alert('Submission approved successfully.')
  }

  const handleReject = (submissionId: string) => {
    const result = rejectSubmission(submissionId)
    if (!result.success) {
      window.alert(result.message)
      return
    }

    window.alert('Submission rejected successfully.')
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Tasks Added</p>
          <p className="mt-2 text-2xl font-semibold text-indigo-700">
            {totalTasksAdded}
          </p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Pending Workers</p>
          <p className="mt-2 text-2xl font-semibold text-amber-700">
            {totalPendingWorkers}
          </p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Payment Paid</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">
            ${totalPaymentPaid.toFixed(2)}
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Tasks to Review</h2>
        </div>

        {pendingSubmissions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">
            No pending submissions to review.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Worker Name</th>
                  <th className="px-5 py-3 font-medium">Task Title</th>
                  <th className="px-5 py-3 font-medium">Payable Amount</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSubmissions.map((submission) => (
                  <tr key={submission._id} className="border-t border-slate-100">
                    <td className="px-5 py-3">{submission.worker_name}</td>
                    <td className="px-5 py-3">{submission.task_title}</td>
                    <td className="px-5 py-3">{submission.payable_amount} coins</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
                          onClick={() =>
                            setPreview({
                              workerName: submission.worker_name,
                              taskTitle: submission.task_title,
                              details: submission.submission_details,
                            })
                          }
                        >
                          View Submission
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                          onClick={() => handleApprove(submission._id)}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700"
                          onClick={() => handleReject(submission._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {preview !== null ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-lg rounded-xl border border-black/10 bg-white shadow-xl">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Submission Details
              </h3>
            </div>
            <div className="space-y-2 px-5 py-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Worker:</span>{' '}
                {preview.workerName}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Task:</span>{' '}
                {preview.taskTitle}
              </p>
              <p className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
                {preview.details}
              </p>
            </div>
            <div className="border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                onClick={() => setPreview(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default BuyerHomePage
