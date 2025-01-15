import { useEffect } from 'react'

export function useEnterKey(func: () => void) {
  useEffect(() => {
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        func()
      }
    })
    return () => window.removeEventListener('keydown', func)
  }, [func])
}
