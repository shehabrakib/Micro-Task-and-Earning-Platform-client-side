type DashboardSectionPageProps = {
  badge: string
  title: string
  description: string
}

function DashboardSectionPage({
  badge,
  title,
  description,
}: DashboardSectionPageProps) {
  return (
    <section className="rounded-xl border border-black/10 bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
      <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
        {badge}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        {description}
      </p>
    </section>
  )
}

export default DashboardSectionPage
