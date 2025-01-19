import { ReactNode } from 'react'
import { useOverlay } from '../../hooks/useOverlay'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { GroupRef, useGroupRef } from '../../hooks/useGroupRef'

export function Sauce({ children }: { children?: ReactNode }) {
  const ref = useGroupRef()
  useOverlay(<Overlay sceneRef={ref} />)
  return <group ref={ref}>{children}</group>
}

function Overlay({ sceneRef }: { sceneRef: GroupRef }) {
  const isDone = sceneRef.current.children.find((o) => o.name === 'player')
  return !isDone ? (
    <TypewriterWithLink link="07_Breath/index.tsx:22:11">
      So... Where are you?
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition scene="Move">
      Ah, there you are!
    </TypewriterWithTransition>
  )
}
