type DashboardRole = 'worker' | 'buyer' | 'admin'

export function getDashboardHomePath(role: DashboardRole): string {
  if (role === 'worker') {
    return '/dashboard/worker-home'
  }

  if (role === 'buyer') {
    return '/dashboard/buyer-home'
  }

  return '/dashboard/admin-home'
}
