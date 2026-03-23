import { useEffect, useRef, useState } from 'react'
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getDashboardHomePath } from '../utils/dashboardPaths'

type NavItem = {
  label: string
  path: string
}

const guestNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
]

function toTitleCase(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ')

  if (parts.length === 0 || parts[0].length === 0) {
    return 'U'
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  const firstInitial = parts[0].charAt(0).toUpperCase()
  const secondInitial = parts[1].charAt(0).toUpperCase()
  return `${firstInitial}${secondInitial}`
}

function Navbar() {
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement | null>(null)

  const dashboardPath =
    currentUser === null ? '/dashboard' : getDashboardHomePath(currentUser.role)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsProfileDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownRoot = profileMenuRef.current
      if (dropdownRoot === null) {
        return
      }

      const clickedTarget = event.target
      if (clickedTarget instanceof Node && !dropdownRoot.contains(clickedTarget)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-lg font-semibold text-indigo-950"
          onClick={closeMobileMenu}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            T
          </span>
          <div>
            <p>TaskEarn</p>
            <p className="text-xs font-normal text-slate-500">
              Micro-task earning platform
            </p>
          </div>
        </Link>

        {currentUser === null ? (
          <nav className="hidden items-center gap-3 md:flex">
            {guestNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Join Now
            </Link>
          </nav>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  'rounded-lg px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              Home
            </NavLink>

            <NavLink
              to={dashboardPath}
              className={({ isActive }) =>
                [
                  'rounded-lg px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              Dashboard
            </NavLink>

            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              {currentUser.coin} coins
            </span>

            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white"
                onClick={() =>
                  setIsProfileDropdownOpen((previousValue) => !previousValue)
                }
              >
                {getInitials(currentUser.name)}
              </button>

              {isProfileDropdownOpen ? (
                <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {toTitleCase(currentUser.role)}
                    </p>
                  </div>

                  <Link
                    to={dashboardPath}
                    className="block px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="block w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
        >
          {isMobileMenuOpen ? (
            <HiOutlineX size={24} />
          ) : (
            <HiOutlineMenuAlt3 size={24} />
          )}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                [
                  'rounded-lg px-4 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              Home
            </NavLink>

            {currentUser === null ? (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  Register
                </NavLink>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="mt-2 rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Create Account
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to={dashboardPath}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  Dashboard
                </NavLink>

                <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                  Available coins: {currentUser.coin}
                </div>

                <div className="rounded-lg border border-slate-200 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {toTitleCase(currentUser.role)}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-1 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-700 transition hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
