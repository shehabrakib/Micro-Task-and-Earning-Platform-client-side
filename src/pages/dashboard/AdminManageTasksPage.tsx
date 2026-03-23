import { useMockData } from '../../hooks/useMockData'

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }
  return date.toLocaleDateString()
}

function AdminManageTasksPage() {
  const { tasks, deleteTaskByAdmin } = useMockData()

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    const confirmed = window.confirm(`Delete task "${taskTitle}"?`)
    if (!confirmed) {
      return
    }

    const result = deleteTaskByAdmin(taskId)
    if (!result.success) {
      window.alert(result.message)
      return
    }

    window.alert('Task deleted successfully.')
  }

  return (
    <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Manage Tasks</h2>
      </div>

      {tasks.length === 0 ? (
        <p className="px-5 py-6 text-sm text-slate-500">No tasks available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Buyer</th>
                <th className="px-5 py-3 font-medium">Workers Needed</th>
                <th className="px-5 py-3 font-medium">Payable</th>
                <th className="px-5 py-3 font-medium">Deadline</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-t border-slate-100">
                  <td className="px-5 py-3">{task.task_title}</td>
                  <td className="px-5 py-3">{task.buyer_name}</td>
                  <td className="px-5 py-3">{task.required_workers}</td>
                  <td className="px-5 py-3">{task.payable_amount} coins</td>
                  <td className="px-5 py-3">{formatDate(task.completion_date)}</td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                      onClick={() => handleDeleteTask(task._id, task.task_title)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AdminManageTasksPage
