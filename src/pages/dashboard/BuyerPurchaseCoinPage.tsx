import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

type CoinPackage = {
  amount_usd: number
  coins: number
}

const coinPackages: CoinPackage[] = [
  { amount_usd: 1, coins: 10 },
  { amount_usd: 10, coins: 150 },
  { amount_usd: 20, coins: 500 },
  { amount_usd: 35, coins: 1000 },
]

function BuyerPurchaseCoinPage() {
  const { currentUser, updateCurrentUserCoin } = useAuth()
  const { purchaseCoinPackage } = useMockData()
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null)
  const [cardNumber, setCardNumber] = useState('')

  if (currentUser === null) {
    return null
  }

  const handlePay = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (selectedPackage === null) {
      window.alert('Please select a package first.')
      return
    }

    if (cardNumber.trim().length === 0) {
      window.alert('Card number is required.')
      return
    }

    const result = purchaseCoinPackage({
      buyer_email: currentUser.email,
      amount_usd: selectedPackage.amount_usd,
      coins: selectedPackage.coins,
    })

    if (!result.success) {
      window.alert(result.message)
      return
    }

    if (result.nextBuyerCoin !== undefined) {
      updateCurrentUserCoin(result.nextBuyerCoin)
    }

    window.alert('Payment successful. Coins added to your account.')
    setCardNumber('')
    setSelectedPackage(null)
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-900">Purchase Coin</h2>
        <p className="mt-1 text-sm text-slate-600">
          Choose a package, enter any card number, and complete dummy payment.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {coinPackages.map((item) => (
            <article
              key={`${item.amount_usd}-${item.coins}`}
              className={[
                'rounded-xl border bg-white px-4 py-5 shadow-sm',
                selectedPackage?.amount_usd === item.amount_usd
                  ? 'border-indigo-500'
                  : 'border-black/10',
                item.amount_usd === 20 ? 'border-2 border-indigo-500' : '',
              ].join(' ')}
            >
              {item.amount_usd === 20 ? (
                <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                  Best value
                </span>
              ) : null}
              <p className="mt-3 text-3xl font-semibold text-amber-600">
                {item.coins}
              </p>
              <p className="text-xs text-slate-500">coins</p>
              <hr className="my-4 border-slate-100" />
              <p className="text-2xl font-semibold text-slate-900">
                ${item.amount_usd}
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                onClick={() => setSelectedPackage(item)}
              >
                Buy now
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-black/10 bg-white px-5 py-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Dummy Payment Form</h3>

        {selectedPackage === null ? (
          <p className="mt-2 text-sm text-slate-600">
            Select a package card above to continue.
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-slate-600">
              Selected: {selectedPackage.coins} coins for $
              {selectedPackage.amount_usd}
            </p>

            <form className="mt-4 space-y-4" onSubmit={handlePay} noValidate>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">
                  Card Number (dummy)
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter any card number"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Pay
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}

export default BuyerPurchaseCoinPage
