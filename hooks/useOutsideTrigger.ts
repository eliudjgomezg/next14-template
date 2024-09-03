import { useEffect } from 'react'

export const useOutsideTrigger = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target: HTMLElement | null = event.target as HTMLElement
      if (ref.current && !ref.current.contains(target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}

export default useOutsideTrigger
