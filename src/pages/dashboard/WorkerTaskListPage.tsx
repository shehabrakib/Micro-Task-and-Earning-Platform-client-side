import { Link } from 'react-router-dom'
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

function WorkerTaskListPage() {
  const { tasks } = useMockData()

  const availableTasks = tasks.filter((task) => task.required_workers > 0)

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">Available Tasks</h2>
        <p className="mt-1 text-sm text-slate-600">
          Choose a task and submit your work details from the task details page.
        </p>
      </div>

      {availableTasks.length === 0 ? (
        <div className="rounded-xl border border-black/10 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
          No available tasks right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {availableTasks.map((task) => (
            <article
              key={task._id}
              className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm"
            >
              <img
                src={task.task_image_url}
                alt={task.task_title}
                className="h-32 w-full object-cover"
              />

              <div className="space-y-4 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {task.task_title}
                  </h3>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    {task.required_workers} slots
                  </span>
                </div>

                <p className="text-xs leading-5 text-slate-500">{task.task_detail}</p>

                <div className="text-xs text-slate-500">
                  <p>Buyer: {task.buyer_name}</p>
                  <p>Completion Date: {formatDate(task.completion_date)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-amber-700">
                    {task.payable_amount} coins
                  </p>

                  <Link
                    to={`/dashboard/task-list/${task._id}`}
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default WorkerTaskListPage
