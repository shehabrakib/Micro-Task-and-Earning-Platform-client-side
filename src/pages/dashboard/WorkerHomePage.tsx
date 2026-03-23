import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

function WorkerHomePage() {
  const { currentUser } = useAuth()
  const { submissions } = useMockData()

  if (currentUser === null) {
    return null
  }

  const workerSubmissions = submissions.filter(
    (submission) =>
      submission.worker_email.toLowerCase() === currentUser.email.toLowerCase(),
  )

  const totalSubmissions = workerSubmissions.length
  const pendingSubmissions = workerSubmissions.filter(
    (submission) => submission.status === 'pending',
  ).length
  const approvedSubmissions = workerSubmissions.filter(
    (submission) => submission.status === 'approved',
  )
  const totalEarnings = approvedSubmissions.reduce(
    (sum, submission) => sum + submission.payable_amount,
    0,
  )

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Submissions</p>
          <p className="mt-2 text-2xl font-semibold text-indigo-700">
            {totalSubmissions}
          </p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Pending Submissions</p>
          <p className="mt-2 text-2xl font-semibold text-amber-700">
            {pendingSubmissions}
          </p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Earnings</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">
            {totalEarnings} coins
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Approved Submissions
          </h2>
        </div>

        {approvedSubmissions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">
            No approved submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Task Title</th>
                  <th className="px-5 py-3 font-medium">Payable Amount</th>
                  <th className="px-5 py-3 font-medium">Buyer Name</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {approvedSubmissions.map((submission) => (
                  <tr key={submission._id} className="border-t border-slate-100">
                    <td className="px-5 py-3">{submission.task_title}</td>
                    <td className="px-5 py-3">{submission.payable_amount} coins</td>
                    <td className="px-5 py-3">{submission.buyer_name}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default WorkerHomePage
