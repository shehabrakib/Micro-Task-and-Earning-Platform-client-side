import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type RegisterRole = 'worker' | 'buyer'

type RegisterFormErrors = {
  name: string
  email: string
  password: string
  role: string
  form: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function RegisterPage() {
  const { currentUser, register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<RegisterRole>('worker')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<RegisterFormErrors>({
    name: '',
    email: '',
    password: '',
    role: '',
    form: '',
  })

  useEffect(() => {
    if (currentUser !== null) {
      navigate('/dashboard', { replace: true })
    }
  }, [currentUser, navigate])

  const validateForm = (): boolean => {
    const nextErrors: RegisterFormErrors = {
      name: '',
      email: '',
      password: '',
      role: '',
      form: '',
    }

    if (name.trim().length < 2) {
      nextErrors.name = 'Full Name must be at least 2 characters.'
    }

    if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (password.trim().length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (role !== 'worker' && role !== 'buyer') {
      nextErrors.role = 'Please choose a valid role.'
    }

    setErrors(nextErrors)
    return (
      nextErrors.name === '' &&
      nextErrors.email === '' &&
      nextErrors.password === '' &&
      nextErrors.role === ''
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await register(name, email, password, role)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed. Try again.'
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
          <h1 className="text-3xl font-semibold">Start earning today</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-indigo-100">
            Register as worker or buyer to begin with default coins and get a
            role-based dashboard experience.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-indigo-100">
            <li>Worker gets 10 coins at signup</li>
            <li>Buyer gets 50 coins at signup</li>
            <li>Auth state is restored after reload with token</li>
          </ul>
        </div>

        <div className="p-6 sm:p-10">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Register
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Create a new account
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Complete the form with valid information. Inline errors will guide
            you before submission.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                placeholder="Enter your full name"
                autoComplete="name"
              />
              {errors.name !== '' ? (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Email
              </label>
              <input
                id="register-email"
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
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
              />
              {errors.password !== '' ? (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="register-role"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Role
              </label>
              <select
                id="register-role"
                value={role}
                onChange={(event) => {
                  const nextValue = event.target.value
                  if (nextValue === 'worker' || nextValue === 'buyer') {
                    setRole(nextValue)
                  }
                }}
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="worker">Worker</option>
                <option value="buyer">Buyer</option>
              </select>
              {errors.role !== '' ? (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.role}
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
              {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-700">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
