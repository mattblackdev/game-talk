import { ReactNode } from 'react'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { useOverlay } from '../../hooks/useOverlay'

export function Sauce({ children }: { children?: ReactNode }) {
  useOverlay(<Overlay />)
  return children
}

function Overlay() {
  return (
    <TypewriterWithLink link="11_Behavior/index.tsx:0:0">
      Don't bother them!
    </TypewriterWithLink>
  )
}
