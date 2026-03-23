import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const contextValue = useContext(AuthContext)

  if (contextValue === null) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return contextValue
}
