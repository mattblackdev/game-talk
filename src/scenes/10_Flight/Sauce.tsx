import { ReactNode } from 'react'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { useOverlay } from '../../hooks/useOverlay'

export function Sauce({ children }: { children?: ReactNode }) {
  useOverlay(<Overlay />)
  return children
}

function Overlay() {
  return true ? (
    <TypewriterWithLink link="10_Flight/index.tsx:0:0">
      You might want to run!!
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition scene="Flight">My hero!</TypewriterWithTransition>
  )
}
