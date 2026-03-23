import { createContext, useState, type ReactNode } from 'react'
import {
  submissions as initialSubmissions,
  tasks as initialTasks,
  withdrawals as initialWithdrawals,
} from '../mock/mockData'

type TaskItem = (typeof initialTasks)[number]
type SubmissionItem = (typeof initialSubmissions)[number]
type WithdrawalItem = (typeof initialWithdrawals)[number]

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

type MockDataContextValue = {
  tasks: TaskItem[]
  submissions: SubmissionItem[]
  withdrawals: WithdrawalItem[]
  addSubmission: (input: CreateSubmissionInput) => void
  addWithdrawalRequest: (input: CreateWithdrawalInput) => void
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
  const [tasks] = useState<TaskItem[]>(() => initialTasks.map((task) => ({ ...task })))
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(() =>
    initialSubmissions.map((submission) => ({ ...submission })),
  )
  const [withdrawals, setWithdrawals] = useState<WithdrawalItem[]>(() =>
    initialWithdrawals.map((withdrawal) => ({ ...withdrawal })),
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

  const value: MockDataContextValue = {
    tasks,
    submissions,
    withdrawals,
    addSubmission,
    addWithdrawalRequest,
  }

  return (
    <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>
  )
}
