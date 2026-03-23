import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PrivateRoute() {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  // If auth is still resolving, do not redirect yet.
  if (loading) {
    return null
  }

  if (currentUser === null) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ fromPath: location.pathname }}
      />
    )
  }

  return <Outlet />
}

export default PrivateRoute
