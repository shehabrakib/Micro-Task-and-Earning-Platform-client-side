import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-2">
        <div className="hidden bg-indigo-950 p-10 text-white lg:block">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-indigo-100">
            Login UI will become fully functional in FE-04 when AuthContext and
            mock JWT handling are added.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-indigo-100">
            <li>Track your work submissions</li>
            <li>Manage tasks or withdrawals</li>
            <li>Open your dashboard from one place</li>
          </ul>
        </div>

        <div className="p-6 sm:p-10">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Login Placeholder
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            FE-02 only needs the page route and a clean placeholder. The real
            form validation and authentication logic will come in FE-04.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Email
              </label>
              <div className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-400">
                Email input will be added in FE-04
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Password
              </label>
              <div className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-400">
                Password input will be added in FE-04
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Create account
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

export default LoginPage
