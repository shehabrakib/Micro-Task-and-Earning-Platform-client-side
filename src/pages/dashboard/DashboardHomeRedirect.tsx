import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getDashboardHomePath } from '../../utils/dashboardPaths'

function DashboardHomeRedirect() {
  const { currentUser } = useAuth()

  if (currentUser === null) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={getDashboardHomePath(currentUser.role)} replace />
}

export default DashboardHomeRedirect
