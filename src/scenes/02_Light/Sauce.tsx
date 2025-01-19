import { ReactNode } from 'react'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { GroupRef, useGroupRef } from '../../hooks/useGroupRef'
import { useOverlay } from '../../hooks/useOverlay'

export function Sauce({ children }: { children?: ReactNode }) {
  const ref = useGroupRef()

  useOverlay(<Overlay sceneRef={ref} />)

  return <group ref={ref}>{children}</group>
}

function Overlay({ sceneRef }: { sceneRef: GroupRef }) {
  const numberOfChildren = sceneRef.current.children.length

  const words = [
    <TypewriterWithLink link={'02_Light/index.tsx:7:11'} middle>
      Why's it so dark in here?
    </TypewriterWithLink>,
    <TypewriterWithLink link={'02_Light/index.tsx:8:11'} middle>
      I'm seeing stars!
    </TypewriterWithLink>,
  ]
  const word = words[numberOfChildren]

  return (
    word ?? (
      <TypewriterWithTransition key={3} scene="Mouse" middle>
        Ah, what a beautiful day.
      </TypewriterWithTransition>
    )
  )
}
