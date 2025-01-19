import { ReactNode } from 'react'
import { useOverlay } from '../../hooks/useOverlay'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { GroupRef, useGroupRef } from '../../hooks/useGroupRef'
import { Pause } from 'windups'

export function Sauce({ children }: { children?: ReactNode }) {
  const ref = useGroupRef()

  useOverlay(<Overlay sceneRef={ref} />)

  return <group ref={ref}>{children}</group>
}

function Overlay({ sceneRef }: { sceneRef: GroupRef }) {
  const hasGround = sceneRef.current.children.find((o) => o.name === 'ground')

  return !hasGround ? (
    <TypewriterWithLink link="04_Ground/index.tsx:14:11" middle>
      Ah! Another nice day.
      <Pause ms={200} />.
      <Pause ms={400} />.
      <Pause ms={2000} />
      <br></br>
      Wait... <Pause ms={500} />
      Where's the ground?!
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition scene="Physics">Nice!!</TypewriterWithTransition>
  )
}
