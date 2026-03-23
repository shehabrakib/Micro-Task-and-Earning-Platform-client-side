import { useEffect, useState, type FormEvent } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type LoginFormErrors = {
  email: string
  password: string
  form: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginPage() {
  const { currentUser, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: '',
    password: '',
    form: '',
  })

  useEffect(() => {
    if (currentUser !== null) {
      navigate('/dashboard', { replace: true })
    }
  }, [currentUser, navigate])

  const validateForm = (): boolean => {
    const nextErrors: LoginFormErrors = {
      email: '',
      password: '',
      form: '',
    }

    if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (password.trim().length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(nextErrors)
    return nextErrors.email === '' && nextErrors.password === ''
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Login failed. Try again.'

      setErrors((previousErrors) => ({
        ...previousErrors,
        form: message,
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-2">
        <div className="hidden bg-indigo-950 p-10 text-white lg:block">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-indigo-100">
            Login with your account to access protected dashboard routes and
            your role-specific workspace.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-indigo-100">
            <li>Track your submissions and earnings</li>
            <li>Manage tasks and coin activity</li>
            <li>Continue from your saved session</li>
          </ul>

          <p className="mt-10 text-xs text-indigo-200">
            Mock tip: existing mock users use password `taskearn123`.
          </p>
        </div>

        <div className="p-6 sm:p-10">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Login
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Fill in your credentials to continue. Validation runs before submit
            and errors are shown under each field.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email !== '' ? (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                placeholder="Minimum 6 characters"
                autoComplete="current-password"
              />
              {errors.password !== '' ? (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.password}
                </p>
              ) : null}
            </div>

            {errors.form !== '' ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errors.form}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>

            {/* UI only for now. Real provider wiring will be done later. */}
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <FcGoogle size={18} />
              Continue with Google (UI only)
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            New here?{' '}
            <Link to="/register" className="font-semibold text-indigo-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
