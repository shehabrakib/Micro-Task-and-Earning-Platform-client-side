import { useMockData } from '../../hooks/useMockData'

function toPaymentLabel(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function AdminHomePage() {
  const { users, withdrawals, payments, approveWithdrawal } = useMockData()

  const totalWorkers = users.filter((user) => user.role === 'worker').length
  const totalBuyers = users.filter((user) => user.role === 'buyer').length
  const totalAvailableCoins = users.reduce((sum, user) => sum + user.coin, 0)
  const totalPayments = payments.length

  const pendingWithdrawals = withdrawals.filter(
    (withdrawal) => withdrawal.status === 'pending',
  )

  const handleMarkAsPaid = (withdrawalId: string) => {
    const result = approveWithdrawal(withdrawalId)
    if (!result.success) {
      window.alert(result.message)
      return
    }

    window.alert('Withdrawal marked as paid.')
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Workers</p>
          <p className="mt-2 text-2xl font-semibold text-indigo-700">{totalWorkers}</p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Buyers</p>
          <p className="mt-2 text-2xl font-semibold text-indigo-700">{totalBuyers}</p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Available Coins</p>
          <p className="mt-2 text-2xl font-semibold text-amber-700">
            {totalAvailableCoins}
          </p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Payments</p>
          <p className="mt-2 text-2xl font-semibold text-violet-700">{totalPayments}</p>
        </article>
      </section>

      <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Withdrawal Requests</h2>
        </div>

        {pendingWithdrawals.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">
            No pending withdrawal requests.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Worker Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Payment Method</th>
                  <th className="px-5 py-3 font-medium">Account Number</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id} className="border-t border-slate-100">
                    <td className="px-5 py-3">{withdrawal.worker_name}</td>
                    <td className="px-5 py-3">{withdrawal.worker_email}</td>
                    <td className="px-5 py-3">${withdrawal.withdrawal_amount}</td>
                    <td className="px-5 py-3">
                      {toPaymentLabel(withdrawal.payment_system)}
                    </td>
                    <td className="px-5 py-3">{withdrawal.account_number}</td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                        onClick={() => handleMarkAsPaid(withdrawal._id)}
                      >
                        Mark as Paid
                      </button>
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

export default AdminHomePage
