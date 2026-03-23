import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

type WithdrawalFormErrors = {
  coinToWithdraw: string
  paymentSystem: string
  accountNumber: string
}

function WorkerWithdrawalsPage() {
  const { currentUser } = useAuth()
  const { withdrawals, addWithdrawalRequest } = useMockData()
  const [coinToWithdraw, setCoinToWithdraw] = useState('')
  const [paymentSystem, setPaymentSystem] = useState('bkash')
  const [accountNumber, setAccountNumber] = useState('')
  const [errors, setErrors] = useState<WithdrawalFormErrors>({
    coinToWithdraw: '',
    paymentSystem: '',
    accountNumber: '',
  })

  if (currentUser === null) {
    return null
  }

  const currentBalance = currentUser.coin
  const canWithdraw = currentBalance >= 200

  const parsedCoinToWithdraw = Number(coinToWithdraw)
  const hasValidCoinValue = Number.isFinite(parsedCoinToWithdraw)
  const withdrawalAmount =
    hasValidCoinValue && parsedCoinToWithdraw > 0 ? parsedCoinToWithdraw / 20 : 0

  const myWithdrawals = withdrawals.filter(
    (withdrawal) =>
      withdrawal.worker_email.toLowerCase() === currentUser.email.toLowerCase(),
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: WithdrawalFormErrors = {
      coinToWithdraw: '',
      paymentSystem: '',
      accountNumber: '',
    }

    if (!hasValidCoinValue || parsedCoinToWithdraw <= 0) {
      nextErrors.coinToWithdraw = 'Enter a valid coin amount.'
    } else if (parsedCoinToWithdraw > currentBalance) {
      nextErrors.coinToWithdraw = 'Coin amount cannot exceed your current balance.'
    }

    if (paymentSystem.trim().length === 0) {
      nextErrors.paymentSystem = 'Please select a payment method.'
    }

    if (accountNumber.trim().length === 0) {
      nextErrors.accountNumber = 'Account Number is required.'
    }

    setErrors(nextErrors)

    if (
      nextErrors.coinToWithdraw !== '' ||
      nextErrors.paymentSystem !== '' ||
      nextErrors.accountNumber !== ''
    ) {
      return
    }

    addWithdrawalRequest({
      worker_email: currentUser.email,
      worker_name: currentUser.name,
      withdrawal_coin: parsedCoinToWithdraw,
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: accountNumber.trim(),
    })

    window.alert('Withdrawal request submitted.')
    setCoinToWithdraw('')
    setPaymentSystem('bkash')
    setAccountNumber('')
    setErrors({
      coinToWithdraw: '',
      paymentSystem: '',
      accountNumber: '',
    })
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Current Coin Balance</p>
          <p className="mt-2 text-2xl font-semibold text-amber-700">
            {currentBalance} coins
          </p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">Equivalent USD</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">
            ${(currentBalance / 20).toFixed(2)}
          </p>
        </article>
      </section>

      <section className="rounded-xl border border-black/10 bg-white px-5 py-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Withdrawal Form</h2>
        <p className="mt-1 text-sm text-slate-600">
          Minimum balance required for withdrawal is 200 coins.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="coin-to-withdraw"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Coin to Withdraw
            </label>
            <input
              id="coin-to-withdraw"
              type="number"
              min={1}
              value={coinToWithdraw}
              onChange={(event) => setCoinToWithdraw(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter coin amount"
            />
            {errors.coinToWithdraw !== '' ? (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.coinToWithdraw}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="withdrawal-amount"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Withdrawal Amount (USD)
            </label>
            <input
              id="withdrawal-amount"
              type="text"
              value={`$${withdrawalAmount.toFixed(2)}`}
              readOnly
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700"
            />
          </div>

          <div>
            <label
              htmlFor="payment-method"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Payment Method
            </label>
            <select
              id="payment-method"
              value={paymentSystem}
              onChange={(event) => setPaymentSystem(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
            {errors.paymentSystem !== '' ? (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.paymentSystem}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="account-number"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Account Number
            </label>
            <input
              id="account-number"
              type="text"
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter payment account number"
            />
            {errors.accountNumber !== '' ? (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.accountNumber}
              </p>
            ) : null}
          </div>

          {canWithdraw ? (
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Withdraw
            </button>
          ) : (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
              Insufficient Coins. Minimum 200 coins required.
            </p>
          )}
        </form>
      </section>

      <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-900">
            My Withdrawal Requests
          </h3>
        </div>

        {myWithdrawals.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">
            No withdrawal requests submitted yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Coins</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Method</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {myWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id} className="border-t border-slate-100">
                    <td className="px-5 py-3">{withdrawal.withdrawal_coin}</td>
                    <td className="px-5 py-3">
                      ${withdrawal.withdrawal_amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3">{withdrawal.payment_system}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                        {withdrawal.status}
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

export default WorkerWithdrawalsPage
