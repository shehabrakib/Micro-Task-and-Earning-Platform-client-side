import AdminHomePage from './pages/dashboard/AdminHomePage'
import AdminManageTasksPage from './pages/dashboard/AdminManageTasksPage'
import AdminManageUsersPage from './pages/dashboard/AdminManageUsersPage'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import DashboardLayout from './layouts/DashboardLayout'
import PublicLayout from './layouts/PublicLayout'
import BuyerAddTaskPage from './pages/dashboard/BuyerAddTaskPage'
import BuyerHomePage from './pages/dashboard/BuyerHomePage'
import BuyerMyTasksPage from './pages/dashboard/BuyerMyTasksPage'
import BuyerPaymentHistoryPage from './pages/dashboard/BuyerPaymentHistoryPage'
import BuyerPurchaseCoinPage from './pages/dashboard/BuyerPurchaseCoinPage'
import DashboardHomeRedirect from './pages/dashboard/DashboardHomeRedirect'
import WorkerHomePage from './pages/dashboard/WorkerHomePage'
import WorkerSubmissionsPage from './pages/dashboard/WorkerSubmissionsPage'
import WorkerTaskDetailsPage from './pages/dashboard/WorkerTaskDetailsPage'
import WorkerTaskListPage from './pages/dashboard/WorkerTaskListPage'
import WorkerWithdrawalsPage from './pages/dashboard/WorkerWithdrawalsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './routes/PrivateRoute'
import RoleRoute from './routes/RoleRoute'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      // Full-page loader prevents route flicker while token check is running.
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white px-8 py-7 shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="text-sm font-medium text-slate-600">Checking session...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardHomeRedirect />} />

          <Route
            path="worker-home"
            element={
              <RoleRoute requiredRole="worker">
                <WorkerHomePage />
              </RoleRoute>
            }
          />
          <Route
            path="task-list"
            element={
              <RoleRoute requiredRole="worker">
                <WorkerTaskListPage />
              </RoleRoute>
            }
          />
          <Route
            path="task-list/:taskId"
            element={
              <RoleRoute requiredRole="worker">
                <WorkerTaskDetailsPage />
              </RoleRoute>
            }
          />
          <Route
            path="my-submissions"
            element={
              <RoleRoute requiredRole="worker">
                <WorkerSubmissionsPage />
              </RoleRoute>
            }
          />
          <Route
            path="withdrawals"
            element={
              <RoleRoute requiredRole="worker">
                <WorkerWithdrawalsPage />
              </RoleRoute>
            }
          />

          <Route
            path="buyer-home"
            element={
              <RoleRoute requiredRole="buyer">
                <BuyerHomePage />
              </RoleRoute>
            }
          />
          <Route
            path="add-task"
            element={
              <RoleRoute requiredRole="buyer">
                <BuyerAddTaskPage />
              </RoleRoute>
            }
          />
          <Route
            path="my-tasks"
            element={
              <RoleRoute requiredRole="buyer">
                <BuyerMyTasksPage />
              </RoleRoute>
            }
          />
          <Route
            path="purchase-coin"
            element={
              <RoleRoute requiredRole="buyer">
                <BuyerPurchaseCoinPage />
              </RoleRoute>
            }
          />
          <Route
            path="payment-history"
            element={
              <RoleRoute requiredRole="buyer">
                <BuyerPaymentHistoryPage />
              </RoleRoute>
            }
          />

          <Route
            path="admin-home"
            element={
              <RoleRoute requiredRole="admin">
                <AdminHomePage />
              </RoleRoute>
            }
          />
          <Route
            path="manage-users"
            element={
              <RoleRoute requiredRole="admin">
                <AdminManageUsersPage />
              </RoleRoute>
            }
          />
          <Route
            path="manage-tasks"
            element={
              <RoleRoute requiredRole="admin">
                <AdminManageTasksPage />
              </RoleRoute>
            }
          />

          <Route path="*" element={<DashboardHomeRedirect />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
