import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-2">
        <div className="hidden bg-indigo-950 p-10 text-white lg:block">
          <h1 className="text-3xl font-semibold">Start earning today</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-indigo-100">
            This page is prepared for FE-04, where registration will connect to
            mock data and route users into the dashboard.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-indigo-100">
            <li>Join as a worker or buyer</li>
            <li>Get default coins after registration</li>
            <li>Access role-based dashboard features</li>
          </ul>
        </div>

        <div className="p-6 sm:p-10">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Register Placeholder
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Create a new account
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            FE-02 only requires the page route to exist. The full registration
            form and validation rules will be added in FE-04.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-400">
              Full Name field
            </div>
            <div className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-400">
              Email field
            </div>
            <div className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-400">
              Photo URL field
            </div>
            <div className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-400">
              Password field
            </div>
            <div className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-400 sm:col-span-2">
              Role dropdown
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Go to login
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
