import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 text-white shadow-xl">
        <div className="grid gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:px-14">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-indigo-100">
              FE-02 Public Landing Route
            </span>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              TaskEarn helps buyers post tasks and workers earn coins with
              simple digital work.
            </h1>

            <p className="max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
              This is the starter public page for FE-02. The full homepage with
              slider, testimonials, best workers, and extra sections will be
              built in FE-03.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm text-indigo-100">Workers</p>
              <p className="mt-3 text-3xl font-semibold">Complete tasks</p>
              <p className="mt-2 text-sm leading-6 text-indigo-100">
                Submit proof, get approved, and grow your coin balance.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm text-indigo-100">Buyers</p>
              <p className="mt-3 text-3xl font-semibold">Post work</p>
              <p className="mt-2 text-sm leading-6 text-indigo-100">
                Create tasks, review submissions, and manage spending with
                coins.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:col-span-2">
              <p className="text-sm text-indigo-100">Admins</p>
              <p className="mt-3 text-3xl font-semibold">Keep the platform in control</p>
              <p className="mt-2 text-sm leading-6 text-indigo-100">
                Manage users, tasks, withdrawals, and platform health from one
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage
