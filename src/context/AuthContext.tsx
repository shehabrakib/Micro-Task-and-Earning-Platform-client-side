import { createContext, useEffect, useState, type ReactNode } from 'react'
import { users } from '../mock/mockData'

type UserRole = 'worker' | 'buyer' | 'admin'
type RegisterRole = 'worker' | 'buyer'

type AppUser = {
  _id: string
  name: string
  email: string
  photoURL: string
  role: UserRole
  coin: number
}

type AuthContextValue = {
  currentUser: AppUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string,
    role: RegisterRole,
  ) => Promise<void>
  logout: () => void
  updateCurrentUserCoin: (nextCoin: number) => void
}

const TOKEN_STORAGE_KEY = 'token'
const DEFAULT_MOCK_PASSWORD = 'taskearn123'

export const AuthContext = createContext<AuthContextValue | null>(null)

function isUserRole(value: string): value is UserRole {
  return value === 'worker' || value === 'buyer' || value === 'admin'
}

function readStringField(source: object, field: string): string | null {
  const value = Reflect.get(source, field)
  if (typeof value !== 'string') {
    return null
  }
  return value
}

function readNumberField(source: object, field: string): number | null {
  const value = Reflect.get(source, field)
  if (typeof value !== 'number') {
    return null
  }
  return value
}

function mapRawUser(rawValue: unknown): AppUser | null {
  if (typeof rawValue !== 'object' || rawValue === null) {
    return null
  }

  const id = readStringField(rawValue, '_id')
  const name = readStringField(rawValue, 'name')
  const email = readStringField(rawValue, 'email')
  const photoURL = readStringField(rawValue, 'photoURL')
  const role = readStringField(rawValue, 'role')
  const coin = readNumberField(rawValue, 'coin')

  if (
    id === null ||
    name === null ||
    email === null ||
    photoURL === null ||
    role === null ||
    coin === null
  ) {
    return null
  }

  if (!isUserRole(role)) {
    return null
  }

  return {
    _id: id,
    name,
    email,
    photoURL,
    role,
    coin,
  }
}

function loadInitialUsers(): AppUser[] {
  const parsedUsers: AppUser[] = []

  // We parse the mock users defensively so context data always has a safe shape.
  users.forEach((rawUser) => {
    const safeUser = mapRawUser(rawUser)
    if (safeUser !== null) {
      parsedUsers.push(safeUser)
    }
  })

  return parsedUsers
}

function createMockToken(email: string): string {
  return `mock-jwt-token:${email}:${Date.now()}`
}

function getEmailFromToken(token: string): string | null {
  const tokenParts = token.split(':')
  if (tokenParts.length !== 3) {
    return null
  }
  return tokenParts[1]
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [mockUsers, setMockUsers] = useState<AppUser[]>(() => loadInitialUsers())
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [passwordStore, setPasswordStore] = useState<Record<string, string>>(() => {
    const initialPasswordStore: Record<string, string> = {}
    loadInitialUsers().forEach((user) => {
      initialPasswordStore[user.email.toLowerCase()] = DEFAULT_MOCK_PASSWORD
    })
    return initialPasswordStore
  })

  const login = async (email: string, password: string): Promise<void> => {
    const normalizedEmail = email.trim().toLowerCase()
    const matchingUser = mockUsers.find(
      (user) => user.email.toLowerCase() === normalizedEmail,
    )

    if (matchingUser === undefined) {
      throw new Error('Invalid email or password')
    }

    const storedPassword = passwordStore[normalizedEmail]
    if (storedPassword !== password) {
      throw new Error('Invalid email or password')
    }

    const token = createMockToken(matchingUser.email)
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    setCurrentUser(matchingUser)
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: RegisterRole,
  ): Promise<void> => {
    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = mockUsers.find(
      (user) => user.email.toLowerCase() === normalizedEmail,
    )

    if (existingUser !== undefined) {
      throw new Error('Email already in use')
    }

    const newUser: AppUser = {
      _id: `u-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      // New users get a predictable mock avatar until profile editing is added.
      photoURL: `https://i.pravatar.cc/150?u=${encodeURIComponent(normalizedEmail)}`,
      role,
      coin: role === 'worker' ? 10 : 50,
    }

    setMockUsers((previousUsers) => [...previousUsers, newUser])
    setPasswordStore((previousPasswords) => ({
      ...previousPasswords,
      [normalizedEmail]: password,
    }))

    const token = createMockToken(newUser.email)
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    setCurrentUser(newUser)
  }

  const logout = (): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setCurrentUser(null)
  }

  const updateCurrentUserCoin = (nextCoin: number): void => {
    if (currentUser === null) {
      return
    }

    setCurrentUser({
      ...currentUser,
      coin: nextCoin,
    })

    setMockUsers((previousUsers) =>
      previousUsers.map((user) => {
        if (user.email.toLowerCase() !== currentUser.email.toLowerCase()) {
          return user
        }

        return {
          ...user,
          coin: nextCoin,
        }
      }),
    )
  }

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (storedToken === null) {
      setLoading(false)
      return
    }

    const emailFromToken = getEmailFromToken(storedToken)
    if (emailFromToken === null) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      setLoading(false)
      return
    }

    const matchingUser = mockUsers.find(
      (user) => user.email.toLowerCase() === emailFromToken.toLowerCase(),
    )

    if (matchingUser === undefined) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      setCurrentUser(null)
      setLoading(false)
      return
    }

    setCurrentUser(matchingUser)
    setLoading(false)
  }, [mockUsers])

  const value: AuthContextValue = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateCurrentUserCoin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
