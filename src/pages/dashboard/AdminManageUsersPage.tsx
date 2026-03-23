import type { ChangeEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useMockData } from '../../hooks/useMockData'

type UserRole = 'worker' | 'buyer' | 'admin'

function isUserRole(value: string): value is UserRole {
  return value === 'worker' || value === 'buyer' || value === 'admin'
}

function toTitleCase(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function AdminManageUsersPage() {
  const { currentUser } = useAuth()
  const { users, updateUserRole, deleteUser } = useMockData()

  const handleRoleChange = (
    event: ChangeEvent<HTMLSelectElement>,
    userId: string,
  ) => {
    const selectedRole = event.target.value
    if (!isUserRole(selectedRole)) {
      window.alert('Invalid role selected.')
      return
    }

    const result = updateUserRole(userId, selectedRole)
    if (!result.success) {
      window.alert(result.message)
      return
    }
  }

  const handleDeleteUser = (userId: string, userName: string) => {
    // A simple confirmation helps prevent accidental deletes.
    const confirmed = window.confirm(`Delete user "${userName}"?`)
    if (!confirmed) {
      return
    }

    const result = deleteUser(userId)
    if (!result.success) {
      window.alert(result.message)
      return
    }

    window.alert('User deleted successfully.')
  }

  return (
    <section className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Manage Users</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Photo</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Coin</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isCurrentUser =
                currentUser !== null &&
                currentUser.email.toLowerCase() === user.email.toLowerCase()

              return (
                <tr key={user._id} className="border-t border-slate-100">
                  <td className="px-5 py-3">{user.name}</td>
                  <td className="px-5 py-3">{user.email}</td>
                  <td className="px-5 py-3">
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-9 w-9 rounded-full border border-black/10 object-cover"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={user.role}
                      className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700"
                      onChange={(event) => handleRoleChange(event, user._id)}
                    >
                      <option value="worker">{toTitleCase('worker')}</option>
                      <option value="buyer">{toTitleCase('buyer')}</option>
                      <option value="admin">{toTitleCase('admin')}</option>
                    </select>
                  </td>
                  <td className="px-5 py-3">{user.coin}</td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      disabled={isCurrentUser}
                      className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => handleDeleteUser(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminManageUsersPage
