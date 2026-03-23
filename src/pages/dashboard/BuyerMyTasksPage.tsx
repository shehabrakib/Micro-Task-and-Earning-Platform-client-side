import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

type EditTaskState = {
  taskId: string
  task_title: string
  task_detail: string
  submission_info: string
}

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

function BuyerMyTasksPage() {
  const { currentUser, updateCurrentUserCoin } = useAuth()
  const { tasks, updateTask, deleteTask } = useMockData()
  const [editState, setEditState] = useState<EditTaskState | null>(null)

  if (currentUser === null) {
    return null
  }

  const buyerTasks = tasks
    .filter(
      (task) => task.buyer_email.toLowerCase() === currentUser.email.toLowerCase(),
    )
    .slice()
    .sort((firstTask, secondTask) => {
      const firstTime = new Date(firstTask.completion_date).getTime()
      const secondTime = new Date(secondTask.completion_date).getTime()
      return secondTime - firstTime
    })

  const handleDelete = (taskId: string) => {
    const result = deleteTask(taskId)
    if (!result.success) {
      window.alert(result.message)
      return
    }

    if (result.nextBuyerCoin !== undefined) {
      updateCurrentUserCoin(result.nextBuyerCoin)
    }

    window.alert('Task deleted and refundable coins returned.')
  }

  const handleSaveEdit = () => {
    if (editState === null) {
      return
    }

    const result = updateTask(editState.taskId, {
      task_title: editState.task_title.trim(),
      task_detail: editState.task_detail.trim(),
      submission_info: editState.submission_info.trim(),
    })

    if (!result.success) {
      window.alert(result.message)
      return
    }

    window.alert('Task updated successfully.')
    setEditState(null)
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-black/10 bg-white px-5 py-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">My Tasks</h2>
        <p className="mt-1 text-sm text-slate-600">
          Tasks are sorted by completion date in descending order.
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        {buyerTasks.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">
            You have not created any tasks yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Task</th>
                  <th className="px-5 py-3 font-medium">Required Workers</th>
                  <th className="px-5 py-3 font-medium">Payable</th>
                  <th className="px-5 py-3 font-medium">Completion Date</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buyerTasks.map((task) => (
                  <tr key={task._id} className="border-t border-slate-100">
                    <td className="px-5 py-3">{task.task_title}</td>
                    <td className="px-5 py-3">{task.required_workers}</td>
                    <td className="px-5 py-3">{task.payable_amount} coins</td>
                    <td className="px-5 py-3">{formatDate(task.completion_date)}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
                          onClick={() =>
                            setEditState({
                              taskId: task._id,
                              task_title: task.task_title,
                              task_detail: task.task_detail,
                              submission_info: task.submission_info,
                            })
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editState !== null ? (
        <section className="rounded-xl border border-black/10 bg-white px-5 py-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Update Task</h3>
          <p className="mt-1 text-sm text-slate-600">
            You can update Task Title, Task Detail, and Submission Info only.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Task Title
              </label>
              <input
                type="text"
                value={editState.task_title}
                onChange={(event) =>
                  setEditState({
                    ...editState,
                    task_title: event.target.value,
                  })
                }
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Task Detail
              </label>
              <textarea
                value={editState.task_detail}
                onChange={(event) =>
                  setEditState({
                    ...editState,
                    task_detail: event.target.value,
                  })
                }
                className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Submission Info
              </label>
              <textarea
                value={editState.submission_info}
                onChange={(event) =>
                  setEditState({
                    ...editState,
                    submission_info: event.target.value,
                  })
                }
                className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setEditState(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default BuyerMyTasksPage
