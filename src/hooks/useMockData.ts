import { useContext } from 'react'
import { MockDataContext } from '../context/MockDataContext'

export function useMockData() {
  const contextValue = useContext(MockDataContext)

  if (contextValue === null) {
    throw new Error('useMockData must be used inside MockDataProvider')
  }

  return contextValue
}
