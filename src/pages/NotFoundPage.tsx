import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="rounded-full bg-red-50 px-4 py-1 text-sm font-medium text-red-700">
        Error 404
      </span>

      <h1 className="mt-6 text-4xl font-semibold text-slate-900">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
        The page you requested does not exist or the route has not been created
        yet. Use the button below to return to the homepage.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Back to homepage
      </Link>
    </section>
  )
}

export default NotFoundPage
