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
  const count = sceneRef.current.children.length - 2

  if (count < 1) {
    return (
      <TypewriterWithLink link="06_Models/index.tsx:19:11">
        Ok.. Let's add some scenery!
      </TypewriterWithLink>
    )
  }

  if (count < 2) {
    return (
      <TypewriterWithLink link="06_Models/index.tsx:28:11">
        That's... something..
      </TypewriterWithLink>
    )
  }

  if (count < 301) {
    return (
      <TypewriterWithLink link="06_Models/index.tsx:29:11">
        How about a few more? 😄
      </TypewriterWithLink>
    )
  }

  return (
    <TypewriterWithTransition scene="Breath">Lovely!</TypewriterWithTransition>
  )
}
