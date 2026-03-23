import { createContext, useState, type ReactNode } from 'react'
import {
  payments as initialPayments,
  submissions as initialSubmissions,
  tasks as initialTasks,
  users as initialUsers,
  withdrawals as initialWithdrawals,
} from '../mock/mockData'

type TaskItem = (typeof initialTasks)[number]
type SubmissionItem = (typeof initialSubmissions)[number]
type WithdrawalItem = (typeof initialWithdrawals)[number]
type UserItem = (typeof initialUsers)[number]
type PaymentItem = (typeof initialPayments)[number]

type CreateSubmissionInput = {
  task_id: string
  task_title: string
  payable_amount: number
  worker_email: string
  worker_name: string
  buyer_name: string
  buyer_email: string
  submission_details: string
}

type CreateWithdrawalInput = {
  worker_email: string
  worker_name: string
  withdrawal_coin: number
  withdrawal_amount: number
  payment_system: string
  account_number: string
}

type CreateTaskInput = {
  task_title: string
  task_detail: string
  required_workers: number
  payable_amount: number
  completion_date: string
  submission_info: string
  task_image_url: string
  buyer_email: string
  buyer_name: string
}

type UpdateTaskInput = {
  task_title: string
  task_detail: string
  submission_info: string
}

type PurchasePackageInput = {
  buyer_email: string
  amount_usd: number
  coins: number
}

type ActionResult =
  | { success: true; nextBuyerCoin?: number }
  | { success: false; message: string }

type MockDataContextValue = {
  users: UserItem[]
  tasks: TaskItem[]
  submissions: SubmissionItem[]
  withdrawals: WithdrawalItem[]
  payments: PaymentItem[]
  addSubmission: (input: CreateSubmissionInput) => void
  addWithdrawalRequest: (input: CreateWithdrawalInput) => void
  createTask: (input: CreateTaskInput) => ActionResult
  updateTask: (taskId: string, input: UpdateTaskInput) => ActionResult
  deleteTask: (taskId: string) => ActionResult
  approveSubmission: (submissionId: string) => ActionResult
  rejectSubmission: (submissionId: string) => ActionResult
  purchaseCoinPackage: (input: PurchasePackageInput) => ActionResult
  getUserByEmail: (email: string) => UserItem | undefined
}

export const MockDataContext = createContext<MockDataContextValue | null>(null)

type MockDataProviderProps = {
  children: ReactNode
}

function createRandomId(prefix: string): string {
  const randomPart = Math.floor(Math.random() * 100000)
  return `${prefix}-${Date.now()}-${randomPart}`
}

export function MockDataProvider({ children }: MockDataProviderProps) {
  const [users, setUsers] = useState<UserItem[]>(() =>
    initialUsers.map((user) => ({ ...user })),
  )
  const [tasks, setTasks] = useState<TaskItem[]>(() =>
    initialTasks.map((task) => ({ ...task })),
  )
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(() =>
    initialSubmissions.map((submission) => ({ ...submission })),
  )
  const [withdrawals, setWithdrawals] = useState<WithdrawalItem[]>(() =>
    initialWithdrawals.map((withdrawal) => ({ ...withdrawal })),
  )
  const [payments, setPayments] = useState<PaymentItem[]>(() =>
    initialPayments.map((payment) => ({ ...payment })),
  )

  const addSubmission = (input: CreateSubmissionInput) => {
    const nextSubmission: SubmissionItem = {
      _id: createRandomId('s'),
      task_id: input.task_id,
      task_title: input.task_title,
      payable_amount: input.payable_amount,
      worker_email: input.worker_email,
      worker_name: input.worker_name,
      buyer_name: input.buyer_name,
      buyer_email: input.buyer_email,
      submission_details: input.submission_details,
      current_date: new Date().toISOString(),
      status: 'pending',
    }

    setSubmissions((previousSubmissions) => [nextSubmission, ...previousSubmissions])
  }

  const addWithdrawalRequest = (input: CreateWithdrawalInput) => {
    const nextWithdrawal: WithdrawalItem = {
      _id: createRandomId('w'),
      worker_email: input.worker_email,
      worker_name: input.worker_name,
      withdrawal_coin: input.withdrawal_coin,
      withdrawal_amount: input.withdrawal_amount,
      payment_system: input.payment_system,
      account_number: input.account_number,
      withdraw_date: new Date().toISOString(),
      status: 'pending',
    }

    setWithdrawals((previousWithdrawals) => [nextWithdrawal, ...previousWithdrawals])
  }

  const getUserByEmail = (email: string) => {
    return users.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
    )
  }

  const setUserCoinByEmail = (email: string, nextCoin: number) => {
    const normalizedEmail = email.trim().toLowerCase()

    setUsers((previousUsers) =>
      previousUsers.map((user) => {
        if (user.email.toLowerCase() !== normalizedEmail) {
          return user
        }

        return {
          ...user,
          coin: nextCoin,
        }
      }),
    )
  }

  const createTask = (input: CreateTaskInput): ActionResult => {
    const buyer = getUserByEmail(input.buyer_email)
    if (buyer === undefined) {
      return { success: false, message: 'Buyer account not found.' }
    }

    const totalCost = input.required_workers * input.payable_amount
    if (totalCost > buyer.coin) {
      return { success: false, message: 'Insufficient coins for this task.' }
    }

    const nextTask: TaskItem = {
      _id: createRandomId('t'),
      task_title: input.task_title,
      task_detail: input.task_detail,
      required_workers: input.required_workers,
      payable_amount: input.payable_amount,
      completion_date: input.completion_date,
      submission_info: input.submission_info,
      task_image_url: input.task_image_url,
      buyer_email: input.buyer_email,
      buyer_name: input.buyer_name,
    }

    const nextBuyerCoin = buyer.coin - totalCost
    setTasks((previousTasks) => [nextTask, ...previousTasks])
    setUserCoinByEmail(input.buyer_email, nextBuyerCoin)
    return { success: true, nextBuyerCoin }
  }

  const updateTask = (taskId: string, input: UpdateTaskInput): ActionResult => {
    const existingTask = tasks.find((task) => task._id === taskId)
    if (existingTask === undefined) {
      return { success: false, message: 'Task not found.' }
    }

    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task._id !== taskId) {
          return task
        }

        return {
          ...task,
          task_title: input.task_title,
          task_detail: input.task_detail,
          submission_info: input.submission_info,
        }
      }),
    )

    return { success: true }
  }

  const deleteTask = (taskId: string): ActionResult => {
    const existingTask = tasks.find((task) => task._id === taskId)
    if (existingTask === undefined) {
      return { success: false, message: 'Task not found.' }
    }

    const buyer = getUserByEmail(existingTask.buyer_email)
    if (buyer !== undefined) {
      const refundableCoins =
        existingTask.required_workers * existingTask.payable_amount
      const nextBuyerCoin = buyer.coin + refundableCoins
      setUserCoinByEmail(existingTask.buyer_email, nextBuyerCoin)

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task._id !== existingTask._id),
      )

      return { success: true, nextBuyerCoin }
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task._id !== existingTask._id),
    )

    return { success: true }
  }

  const approveSubmission = (submissionId: string): ActionResult => {
    const targetSubmission = submissions.find(
      (submission) => submission._id === submissionId,
    )

    if (targetSubmission === undefined) {
      return { success: false, message: 'Submission not found.' }
    }

    setSubmissions((previousSubmissions) =>
      previousSubmissions.map((submission) => {
        if (submission._id !== submissionId) {
          return submission
        }

        return {
          ...submission,
          status: 'approved',
        }
      }),
    )

    const worker = getUserByEmail(targetSubmission.worker_email)
    if (worker !== undefined) {
      setUserCoinByEmail(
        targetSubmission.worker_email,
        worker.coin + targetSubmission.payable_amount,
      )
    }

    return { success: true }
  }

  const rejectSubmission = (submissionId: string): ActionResult => {
    const targetSubmission = submissions.find(
      (submission) => submission._id === submissionId,
    )

    if (targetSubmission === undefined) {
      return { success: false, message: 'Submission not found.' }
    }

    setSubmissions((previousSubmissions) =>
      previousSubmissions.map((submission) => {
        if (submission._id !== submissionId) {
          return submission
        }

        return {
          ...submission,
          status: 'rejected',
        }
      }),
    )

    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task._id !== targetSubmission.task_id) {
          return task
        }

        return {
          ...task,
          required_workers: task.required_workers + 1,
        }
      }),
    )

    return { success: true }
  }

  const purchaseCoinPackage = (input: PurchasePackageInput): ActionResult => {
    const allowedPackages = new Map<number, number>([
      [1, 10],
      [10, 150],
      [20, 500],
      [35, 1000],
    ])

    const expectedCoins = allowedPackages.get(input.amount_usd)
    if (expectedCoins === undefined || expectedCoins !== input.coins) {
      return { success: false, message: 'Invalid package selected.' }
    }

    const buyer = getUserByEmail(input.buyer_email)
    if (buyer === undefined) {
      return { success: false, message: 'Buyer account not found.' }
    }

    const nextPayment: PaymentItem = {
      _id: createRandomId('p'),
      buyer_email: input.buyer_email,
      amount_usd: input.amount_usd,
      coins: input.coins,
      payment_date: new Date().toISOString(),
    }

    const nextBuyerCoin = buyer.coin + input.coins
    setPayments((previousPayments) => [nextPayment, ...previousPayments])
    setUserCoinByEmail(input.buyer_email, nextBuyerCoin)
    return { success: true, nextBuyerCoin }
  }

  const value: MockDataContextValue = {
    users,
    tasks,
    submissions,
    withdrawals,
    payments,
    addSubmission,
    addWithdrawalRequest,
    createTask,
    updateTask,
    deleteTask,
    approveSubmission,
    rejectSubmission,
    purchaseCoinPackage,
    getUserByEmail,
  }

  return (
    <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>
  )
}
