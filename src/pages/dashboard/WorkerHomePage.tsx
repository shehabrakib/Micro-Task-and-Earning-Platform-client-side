function WorkerHomePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          Worker Dashboard
        </span>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Worker home route is protected
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          FE-04 Part B is active: only users with worker role can access this
          page. FE-05 will replace this with the full worker dashboard shell.
        </p>
      </div>
    </section>
  )
}

export default WorkerHomePage
