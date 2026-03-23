import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getDashboardHomePath } from '../utils/dashboardPaths'

type AllowedRole = 'worker' | 'buyer' | 'admin'

type RoleRouteProps = {
  requiredRole: AllowedRole
  children: ReactNode
}

function RoleRoute({ requiredRole, children }: RoleRouteProps) {
  const { currentUser } = useAuth()

  if (currentUser === null) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== requiredRole) {
    return <Navigate to={getDashboardHomePath(currentUser.role)} replace />
  }

  return <>{children}</>
}

export default RoleRoute
