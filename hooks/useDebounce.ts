import { useState, useEffect, useRef } from 'react'

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function useDebouncedCallback<A extends unknown[]>(callback: (...args: A) => void, wait: number) {
  const argsRef = useRef<A>()
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  useEffect(() => cleanup, [])

  return function debouncedCallback(...args: A) {
    argsRef.current = args

    cleanup()

    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current)
      }
    }, wait)
  }
}
