import { Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import DashboardLayout from './layouts/DashboardLayout'
import PublicLayout from './layouts/PublicLayout'
import DashboardHomeRedirect from './pages/dashboard/DashboardHomeRedirect'
import DashboardSectionPage from './pages/dashboard/DashboardSectionPage'
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
                <DashboardSectionPage
                  badge="Worker Home"
                  title="Worker dashboard shell is ready"
                  description="This role-specific home route now runs inside the FE-05 dashboard layout. The full worker dashboard widgets will be added in the next epic."
                />
              </RoleRoute>
            }
          />
          <Route
            path="task-list"
            element={
              <RoleRoute requiredRole="worker">
                <DashboardSectionPage
                  badge="Task List"
                  title="Worker task list page placeholder"
                  description="Sidebar navigation, route protection, and dashboard shell are complete. Task cards and filters will be added in FE-06."
                />
              </RoleRoute>
            }
          />
          <Route
            path="my-submissions"
            element={
              <RoleRoute requiredRole="worker">
                <DashboardSectionPage
                  badge="My Submissions"
                  title="Submission history page placeholder"
                  description="This protected route is ready and connected to worker navigation. Submission table and status views will be implemented in FE-06."
                />
              </RoleRoute>
            }
          />
          <Route
            path="withdrawals"
            element={
              <RoleRoute requiredRole="worker">
                <DashboardSectionPage
                  badge="Withdrawals"
                  title="Worker withdrawal page placeholder"
                  description="The route exists under the FE-05 shell with role access control. Withdrawal form and validations will be implemented in FE-06."
                />
              </RoleRoute>
            }
          />

          <Route
            path="buyer-home"
            element={
              <RoleRoute requiredRole="buyer">
                <DashboardSectionPage
                  badge="Buyer Home"
                  title="Buyer dashboard shell is ready"
                  description="This route confirms FE-05 role navigation and dashboard layout are working for buyer accounts."
                />
              </RoleRoute>
            }
          />
          <Route
            path="add-task"
            element={
              <RoleRoute requiredRole="buyer">
                <DashboardSectionPage
                  badge="Add Task"
                  title="Add task page placeholder"
                  description="This protected buyer route is now connected. The full task creation form will be built in FE-07."
                />
              </RoleRoute>
            }
          />
          <Route
            path="my-tasks"
            element={
              <RoleRoute requiredRole="buyer">
                <DashboardSectionPage
                  badge="My Tasks"
                  title="Buyer task list placeholder"
                  description="Navigation and role guard are complete. The buyer task table with update/delete actions will be implemented in FE-07."
                />
              </RoleRoute>
            }
          />
          <Route
            path="purchase-coin"
            element={
              <RoleRoute requiredRole="buyer">
                <DashboardSectionPage
                  badge="Purchase Coin"
                  title="Coin purchase page placeholder"
                  description="This buyer route is wired into the FE-05 shell. Package cards and dummy payment flow will be added in FE-07."
                />
              </RoleRoute>
            }
          />
          <Route
            path="payment-history"
            element={
              <RoleRoute requiredRole="buyer">
                <DashboardSectionPage
                  badge="Payment History"
                  title="Payment history page placeholder"
                  description="The route and role restriction are ready. Payment table UI will be implemented in FE-07."
                />
              </RoleRoute>
            }
          />

          <Route
            path="admin-home"
            element={
              <RoleRoute requiredRole="admin">
                <DashboardSectionPage
                  badge="Admin Home"
                  title="Admin dashboard shell is ready"
                  description="This protected admin route confirms FE-05 role-aware shell support for admin users."
                />
              </RoleRoute>
            }
          />
          <Route
            path="manage-users"
            element={
              <RoleRoute requiredRole="admin">
                <DashboardSectionPage
                  badge="Manage Users"
                  title="User management page placeholder"
                  description="The FE-05 shell and role-based access are ready. User table and role controls will be added in FE-08."
                />
              </RoleRoute>
            }
          />
          <Route
            path="manage-tasks"
            element={
              <RoleRoute requiredRole="admin">
                <DashboardSectionPage
                  badge="Manage Tasks"
                  title="Task management page placeholder"
                  description="This protected admin route is connected. Task management table functionality will be implemented in FE-08."
                />
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
