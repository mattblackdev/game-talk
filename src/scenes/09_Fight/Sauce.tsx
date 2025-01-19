import { ReactNode } from 'react'
import { useMinionStore } from '.'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { useOverlay } from '../../hooks/useOverlay'

export function Sauce({ children }: { children?: ReactNode }) {
  useOverlay(<Overlay />)
  return children
}

function Overlay() {
  const isMinionDefeated = useMinionStore((s) => s.status) === 'dead'
  return !isMinionDefeated ? (
    <TypewriterWithLink link="09_Fight/index.tsx">
      Press F to slash!
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition scene="Move">My hero!</TypewriterWithTransition>
  )
}
