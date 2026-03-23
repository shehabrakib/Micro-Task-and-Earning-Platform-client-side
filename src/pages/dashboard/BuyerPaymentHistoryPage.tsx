import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

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

function BuyerPaymentHistoryPage() {
  const { currentUser } = useAuth()
  const { payments } = useMockData()

  if (currentUser === null) {
    return null
  }

  const myPayments = payments
    .filter(
      (payment) =>
        payment.buyer_email.toLowerCase() === currentUser.email.toLowerCase(),
    )
    .slice()
    .sort((firstPayment, secondPayment) => {
      const firstTime = new Date(firstPayment.payment_date).getTime()
      const secondTime = new Date(secondPayment.payment_date).getTime()
      return secondTime - firstTime
    })

  return (
    <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Payment History</h2>
      </div>

      {myPayments.length === 0 ? (
        <p className="px-5 py-6 text-sm text-slate-500">
          No payment history found yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Amount (USD)</th>
                <th className="px-5 py-3 font-medium">Coins Received</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.map((payment) => (
                <tr key={payment._id} className="border-t border-slate-100">
                  <td className="px-5 py-3">${payment.amount_usd.toFixed(2)}</td>
                  <td className="px-5 py-3">{payment.coins}</td>
                  <td className="px-5 py-3">{formatDate(payment.payment_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default BuyerPaymentHistoryPage
