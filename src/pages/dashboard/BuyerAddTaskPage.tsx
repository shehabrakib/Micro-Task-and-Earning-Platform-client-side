import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

type AddTaskErrors = {
  task_title: string
  task_detail: string
  required_workers: string
  payable_amount: string
  completion_date: string
  submission_info: string
  task_image_url: string
}

function BuyerAddTaskPage() {
  const { currentUser, updateCurrentUserCoin } = useAuth()
  const { createTask } = useMockData()
  const navigate = useNavigate()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDetail, setTaskDetail] = useState('')
  const [requiredWorkers, setRequiredWorkers] = useState('')
  const [payableAmount, setPayableAmount] = useState('')
  const [completionDate, setCompletionDate] = useState('')
  const [submissionInfo, setSubmissionInfo] = useState('')
  const [taskImageUrl, setTaskImageUrl] = useState('')
  const [errors, setErrors] = useState<AddTaskErrors>({
    task_title: '',
    task_detail: '',
    required_workers: '',
    payable_amount: '',
    completion_date: '',
    submission_info: '',
    task_image_url: '',
  })

  if (currentUser === null) {
    return null
  }

  const validateForm = (): boolean => {
    const nextErrors: AddTaskErrors = {
      task_title: '',
      task_detail: '',
      required_workers: '',
      payable_amount: '',
      completion_date: '',
      submission_info: '',
      task_image_url: '',
    }

    const requiredWorkersNumber = Number(requiredWorkers)
    const payableAmountNumber = Number(payableAmount)

    if (taskTitle.trim().length === 0) {
      nextErrors.task_title = 'Task Title is required.'
    }
    if (taskDetail.trim().length === 0) {
      nextErrors.task_detail = 'Task Detail is required.'
    }
    if (!Number.isFinite(requiredWorkersNumber) || requiredWorkersNumber <= 0) {
      nextErrors.required_workers = 'Required Workers must be greater than 0.'
    }
    if (!Number.isFinite(payableAmountNumber) || payableAmountNumber <= 0) {
      nextErrors.payable_amount = 'Payable Amount must be greater than 0.'
    }
    if (completionDate.trim().length === 0) {
      nextErrors.completion_date = 'Completion Date is required.'
    }
    if (submissionInfo.trim().length === 0) {
      nextErrors.submission_info = 'Submission Info is required.'
    }
    if (taskImageUrl.trim().length === 0) {
      nextErrors.task_image_url = 'Task Image URL is required.'
    }

    setErrors(nextErrors)

    return (
      nextErrors.task_title === '' &&
      nextErrors.task_detail === '' &&
      nextErrors.required_workers === '' &&
      nextErrors.payable_amount === '' &&
      nextErrors.completion_date === '' &&
      nextErrors.submission_info === '' &&
      nextErrors.task_image_url === ''
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const result = createTask({
      task_title: taskTitle.trim(),
      task_detail: taskDetail.trim(),
      required_workers: Number(requiredWorkers),
      payable_amount: Number(payableAmount),
      completion_date: new Date(completionDate).toISOString(),
      submission_info: submissionInfo.trim(),
      task_image_url: taskImageUrl.trim(),
      buyer_email: currentUser.email,
      buyer_name: currentUser.name,
    })

    if (!result.success) {
      window.alert('Insufficient coins. Please purchase coins first.')
      navigate('/dashboard/purchase-coin')
      return
    }

    if (result.nextBuyerCoin !== undefined) {
      updateCurrentUserCoin(result.nextBuyerCoin)
    }

    window.alert('Task created successfully.')
    setTaskTitle('')
    setTaskDetail('')
    setRequiredWorkers('')
    setPayableAmount('')
    setCompletionDate('')
    setSubmissionInfo('')
    setTaskImageUrl('')
    setErrors({
      task_title: '',
      task_detail: '',
      required_workers: '',
      payable_amount: '',
      completion_date: '',
      submission_info: '',
      task_image_url: '',
    })
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white px-5 py-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Add New Task</h2>
      <p className="mt-1 text-sm text-slate-600">
        Total task cost = Required Workers × Payable Amount per worker.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Task Title
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.task_title !== '' ? (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.task_title}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Task Detail
          </label>
          <textarea
            value={taskDetail}
            onChange={(event) => setTaskDetail(event.target.value)}
            className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.task_detail !== '' ? (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.task_detail}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Required Workers
            </label>
            <input
              type="number"
              min={1}
              value={requiredWorkers}
              onChange={(event) => setRequiredWorkers(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
            {errors.required_workers !== '' ? (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.required_workers}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Payable Amount per Worker
            </label>
            <input
              type="number"
              min={1}
              value={payableAmount}
              onChange={(event) => setPayableAmount(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
            {errors.payable_amount !== '' ? (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.payable_amount}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Completion Date
          </label>
          <input
            type="date"
            value={completionDate}
            onChange={(event) => setCompletionDate(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.completion_date !== '' ? (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.completion_date}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Submission Info
          </label>
          <textarea
            value={submissionInfo}
            onChange={(event) => setSubmissionInfo(event.target.value)}
            className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.submission_info !== '' ? (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.submission_info}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Task Image URL
          </label>
          <input
            type="url"
            value={taskImageUrl}
            onChange={(event) => setTaskImageUrl(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.task_image_url !== '' ? (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.task_image_url}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Add Task
        </button>
      </form>
    </section>
  )
}

export default BuyerAddTaskPage
