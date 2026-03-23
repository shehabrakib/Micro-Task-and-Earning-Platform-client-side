import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
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

function WorkerTaskDetailsPage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { tasks, addSubmission } = useMockData()
  const [submissionDetails, setSubmissionDetails] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const task = tasks.find((item) => item._id === taskId)

  if (currentUser === null) {
    return null
  }

  if (task === undefined) {
    return (
      <section className="rounded-xl border border-black/10 bg-white px-5 py-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Task not found</h2>
        <p className="mt-2 text-sm text-slate-600">
          The task may have been removed or the link is incorrect.
        </p>
        <Link
          to="/dashboard/task-list"
          className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to Task List
        </Link>
      </section>
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submissionDetails.trim().length === 0) {
      setErrorMessage('Submission details are required.')
      return
    }

    addSubmission({
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: currentUser.email,
      worker_name: currentUser.name,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      submission_details: submissionDetails.trim(),
    })

    window.alert('Submission added successfully.')
    navigate('/dashboard/my-submissions')
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <img
          src={task.task_image_url}
          alt={task.task_title}
          className="h-48 w-full object-cover"
        />

        <div className="space-y-3 px-5 py-5">
          <h2 className="text-xl font-semibold text-slate-900">{task.task_title}</h2>
          <p className="text-sm leading-6 text-slate-600">{task.task_detail}</p>

          <div className="grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <p>
              <span className="font-semibold text-slate-800">Buyer:</span>{' '}
              {task.buyer_name}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Payable:</span>{' '}
              {task.payable_amount} coins
            </p>
            <p>
              <span className="font-semibold text-slate-800">Required Workers:</span>{' '}
              {task.required_workers}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Completion Date:</span>{' '}
              {formatDate(task.completion_date)}
            </p>
          </div>

          <p className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-700">
            Submission requirement: {task.submission_info}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-black/10 bg-white px-5 py-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Submit Your Work</h3>
        <p className="mt-1 text-sm text-slate-600">
          Share your proof, links, or completion details in the field below.
        </p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="submission-details"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Submission Details
            </label>
            <textarea
              id="submission-details"
              value={submissionDetails}
              onChange={(event) => {
                setSubmissionDetails(event.target.value)
                if (errorMessage !== '') {
                  setErrorMessage('')
                }
              }}
              className="min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              placeholder="Paste drive link, screenshot notes, or detailed work summary"
            />
            {errorMessage !== '' ? (
              <p className="mt-1 text-xs font-medium text-red-600">{errorMessage}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Submit Work
            </button>
            <Link
              to="/dashboard/task-list"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}

export default WorkerTaskDetailsPage
