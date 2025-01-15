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
  const words =
    [
      "Ok.. Let's add some scenery!",
      "That's... something",
      'Getting there! Try Triplex to add more.',
    ][count] ?? (count < 7 ? 'How about a few more?' : '')

  return words ? (
    <TypewriterWithLink dark link="06_Models/index.tsx">
      {words}
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition scene="Breath">Lovely!</TypewriterWithTransition>
  )
}
