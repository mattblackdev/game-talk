import { ReactNode } from 'react'
import { useOverlay } from '../../hooks/useOverlay'
import { Typewriter } from '../../coms/typewriter/Typewriter'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { GroupRef, useGroupRef } from '../../hooks/useGroupRef'

export function Sauce({ children }: { children?: ReactNode }) {
  const ref = useGroupRef()

  useOverlay(<Overlay sceneRef={ref} />)

  return <group ref={ref}>{children}</group>
}

function Overlay({ sceneRef }: { sceneRef: GroupRef }) {
  const numberOfChildren = sceneRef.current.children.length

  const words = [
    <TypewriterWithLink key={1} link={'02_Light/index.tsx'}>
      Why's it so dark in here?
    </TypewriterWithLink>,
    <Typewriter key={2}>I'm seeing stars!</Typewriter>,
  ]
  const word = words[numberOfChildren]

  return (
    word ?? (
      <TypewriterWithTransition key={3} dark scene="Mouse">
        Now we're talking!
      </TypewriterWithTransition>
    )
  )
}
