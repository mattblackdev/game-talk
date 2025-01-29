import { ReactNode, useEffect, useState } from 'react'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { useOverlay } from '../../hooks/useOverlay'

export function Sauce({ children }: { children?: ReactNode }) {
  useOverlay(<Overlay />)
  return children
}

function Overlay() {
  const [next, setNext] = useState(false)

  useEffect(() => {
    const handle = setTimeout(() => {
      setNext(true)
    }, 5000)
    return () => void clearTimeout(handle)
  }, [])

  return !next ? (
    <TypewriterWithLink link="10_Flight/index.tsx:0:0">
      You might want to run!!
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition scene="Behavior">Phew!</TypewriterWithTransition>
  )
}
