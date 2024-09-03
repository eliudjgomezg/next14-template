import { useState } from 'react'

export function useLocalStorage(params: { key: string; initialValue?: unknown }) {
  const { key, initialValue = {} } = params
  const [item, setStoredItem] = useState(() => {
    try {
      const localStorage = window.localStorage.getItem(key)
      return localStorage ? JSON.parse(localStorage) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setItem = (value: unknown) => {
    try {
      const valueToStore = value instanceof Function ? value(item) : value
      setStoredItem(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      throw { name: 'Local Storage error', response: error }
    }
  }

  const removeItem = () => {
    try {
      setStoredItem(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      throw { name: 'Local Storage error', response: error }
    }
  }

  return { item, setItem, removeItem }
}

export default useLocalStorage
