import { useEffect } from 'react'

export const useKeyDown = (key: string, callback: () => void) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === key) {
      event.preventDefault()
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])
}
