import { Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import PublicLayout from './layouts/PublicLayout'
import AdminHomePage from './pages/dashboard/AdminHomePage'
import BuyerHomePage from './pages/dashboard/BuyerHomePage'
import DashboardHomeRedirect from './pages/dashboard/DashboardHomeRedirect'
import WorkerHomePage from './pages/dashboard/WorkerHomePage'
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
    // Keeping all basic routes here makes the app structure easy to read.
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
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
            path="buyer-home"
            element={
              <RoleRoute requiredRole="buyer">
                <BuyerHomePage />
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
