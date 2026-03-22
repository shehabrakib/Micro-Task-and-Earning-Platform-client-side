import { Link } from 'react-router-dom'

function DashboardPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          Dashboard Placeholder
        </span>

        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Dashboard route is ready
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          FE-02 only needs a safe placeholder route so navigation works without
          errors. In FE-04 and FE-05, this page will become a protected
          dashboard with role-based content.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Go to login
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
