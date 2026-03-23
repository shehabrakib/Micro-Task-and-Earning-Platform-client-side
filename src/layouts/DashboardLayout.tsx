import { useEffect, useRef, useState } from 'react'
import {
  HiMenuAlt2,
  HiOutlineBell,
  HiOutlineCash,
  HiOutlineClipboardList,
  HiOutlineCollection,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiX,
} from 'react-icons/hi'
import type { IconType } from 'react-icons/lib'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { notifications } from '../mock/mockData'

type DashboardNavItem = {
  label: string
  path: string
  icon: IconType
}

type AppNotification = {
  _id: string
  message: string
  toEmail: string
  actionRoute: string
  createdAt: string
}

const workerNavItems: DashboardNavItem[] = [
  { label: 'Home', path: '/dashboard/worker-home', icon: HiOutlineHome },
  {
    label: 'Task List',
    path: '/dashboard/task-list',
    icon: HiOutlineCollection,
  },
  {
    label: 'My Submissions',
    path: '/dashboard/my-submissions',
    icon: HiOutlineClipboardList,
  },
  {
    label: 'Withdrawals',
    path: '/dashboard/withdrawals',
    icon: HiOutlineCash,
  },
]

const buyerNavItems: DashboardNavItem[] = [
  { label: 'Home', path: '/dashboard/buyer-home', icon: HiOutlineHome },
  { label: 'Add Task', path: '/dashboard/add-task', icon: HiOutlineCollection },
  { label: 'My Tasks', path: '/dashboard/my-tasks', icon: HiOutlineClipboardList },
  {
    label: 'Purchase Coin',
    path: '/dashboard/purchase-coin',
    icon: HiOutlineShoppingBag,
  },
  {
    label: 'Payment History',
    path: '/dashboard/payment-history',
    icon: HiOutlineCash,
  },
]

const adminNavItems: DashboardNavItem[] = [
  { label: 'Home', path: '/dashboard/admin-home', icon: HiOutlineHome },
  {
    label: 'Manage Users',
    path: '/dashboard/manage-users',
    icon: HiOutlineUsers,
  },
  {
    label: 'Manage Tasks',
    path: '/dashboard/manage-tasks',
    icon: HiOutlineCollection,
  },
]

function getInitials(name: string): string {
  const parts = name.trim().split(' ')

  if (parts.length === 0 || parts[0].length === 0) {
    return 'U'
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  return `${parts[0].charAt(0).toUpperCase()}${parts[1].charAt(0).toUpperCase()}`
}

function toTitleCase(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function getRelativeTimeText(createdAt: string): string {
  const timestamp = new Date(createdAt).getTime()

  if (Number.isNaN(timestamp)) {
    return 'just now'
  }

  const diffInMs = Date.now() - timestamp
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInMinutes < 1) {
    return 'just now'
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

function getNotificationDotClass(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('rejected')) {
    return 'bg-amber-500'
  }

  if (lowerMessage.includes('withdrawal')) {
    return 'bg-emerald-500'
  }

  return 'bg-indigo-500'
}

function DashboardLayout() {
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const notificationRef = useRef<HTMLDivElement | null>(null)

  let navItems: DashboardNavItem[] = []
  if (currentUser !== null) {
    if (currentUser.role === 'worker') {
      navItems = workerNavItems
    } else if (currentUser.role === 'buyer') {
      navItems = buyerNavItems
    } else {
      navItems = adminNavItems
    }
  }

  let pageTitle = 'Dashboard'
  const matchedItem = navItems.find((item) => item.path === location.pathname)
  if (matchedItem !== undefined) {
    pageTitle = matchedItem.label
  }

  const userNotifications: AppNotification[] = []
  if (currentUser !== null) {
    notifications.forEach((rawNotification) => {
      if (rawNotification.toEmail.toLowerCase() === currentUser.email.toLowerCase()) {
        userNotifications.push(rawNotification)
      }
    })

    userNotifications.sort((firstItem, secondItem) => {
      const firstTime = new Date(firstItem.createdAt).getTime()
      const secondTime = new Date(secondItem.createdAt).getTime()
      return secondTime - firstTime
    })
  }

  useEffect(() => {
    setIsSidebarOpen(false)
    setIsNotificationOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const wrapper = notificationRef.current
      if (wrapper === null) {
        return
      }

      const target = event.target
      if (target instanceof Node && !wrapper.contains(target)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
  }

  if (currentUser === null) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F8F9FF]">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-black/45 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-55 flex-col bg-indigo-950 transition-transform duration-200',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <p className="text-base font-semibold text-white">TaskEarn</p>
            <p className="text-[11px] text-white/50">Micro-task dashboard</p>
          </div>
          <button
            type="button"
            className="rounded-md p-1.5 text-white/70 hover:bg-white/10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <HiX size={18} />
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
              {getInitials(currentUser.name)}
            </span>
            <div>
              <p className="text-[13px] font-medium text-white">{currentUser.name}</p>
              <p className="text-[11px] text-white/45">
                {toTitleCase(currentUser.role)}
              </p>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5 text-[12px] font-semibold text-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {currentUser.coin} coins
          </div>
        </div>

        <div className="px-5 pt-4">
          <p className="mb-3 text-[10px] uppercase tracking-widest text-white/35">
            Main Menu
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2.5 border-l-2 px-3 py-2 text-[13px] transition',
                      isActive
                        ? 'border-indigo-300 bg-indigo-500/20 text-white'
                        : 'border-transparent text-white/60 hover:bg-white/10 hover:text-white',
                    ].join(' ')
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto px-5 pb-5 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-[13px] font-medium text-red-200 transition hover:bg-red-500/20"
            onClick={handleLogout}
          >
            <HiOutlineLogout size={16} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col lg:ml-55">
        <header className="sticky top-0 z-20 border-b border-black/10 bg-white">
          <div className="relative flex min-h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-md border border-slate-200 p-2 text-slate-700 lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <HiMenuAlt2 size={18} />
              </button>

              <div className="hidden items-center gap-2 text-slate-900 sm:flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-semibold text-white">
                  T
                </span>
                <span className="text-sm font-medium">TaskEarn</span>
              </div>

              <h1 className="text-[15px] font-medium text-slate-900">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" ref={notificationRef}>
                <button
                  type="button"
                  className="relative flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-700"
                  onClick={() =>
                    setIsNotificationOpen((previousValue) => !previousValue)
                  }
                >
                  <HiOutlineBell size={16} />
                  {userNotifications.length > 0 ? (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                      {userNotifications.length}
                    </span>
                  ) : null}
                </button>

                {isNotificationOpen ? (
                  <div className="absolute right-0 top-10 z-30 w-[320px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">
                        Notifications
                      </p>
                      <button
                        type="button"
                        className="text-xs font-medium text-indigo-600"
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        Mark all read
                      </button>
                    </div>

                    {userNotifications.length === 0 ? (
                      <div className="flex h-12 items-center justify-center text-sm text-slate-500">
                        No notifications
                      </div>
                    ) : (
                      <div className="max-h-80 overflow-y-auto">
                        {userNotifications.map((item) => (
                          <article
                            key={item._id}
                            className="border-b border-slate-100 bg-indigo-50/40 px-4 py-3 last:border-b-0"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2.5">
                                <span
                                  className={[
                                    'mt-1 h-2.5 w-2.5 rounded-full',
                                    getNotificationDotClass(item.message),
                                  ].join(' ')}
                                />
                                <p className="text-[13px] leading-5 text-slate-800">
                                  {item.message}
                                </p>
                              </div>
                              <span className="shrink-0 text-[11px] text-slate-400">
                                {getRelativeTimeText(item.createdAt)}
                              </span>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="hidden items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 sm:inline-flex">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                {currentUser.coin} coins
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {getInitials(currentUser.name)}
                </span>
                <div>
                  <p className="text-[13px] font-medium text-slate-900">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {toTitleCase(currentUser.role)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
