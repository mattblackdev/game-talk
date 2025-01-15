import { ReactNode } from 'react'
import { useOverlay } from '../../hooks/useOverlay'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { GroupRef, useGroupRef } from '../../hooks/useObjectRef'

export function Sauce({ children }: { children?: ReactNode }) {
  const ref = useGroupRef()

  useOverlay(<Overlay sceneRef={ref} />)

  return <group ref={ref}>{children}</group>
}

function Overlay({ sceneRef }: { sceneRef: GroupRef }) {
  const hasGround = sceneRef.current.children.find((o) => o.name === 'ground')

  return !hasGround ? (
    <TypewriterWithLink dark link="04_Ground/index.tsx">
      Where's the ground?
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition dark scene="Physics">
      Hmmm... that's a green ufo but ok
    </TypewriterWithTransition>
  )
}
