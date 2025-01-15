import { ReactNode } from 'react'
import { create } from 'zustand'
import { useOverlay } from '../../hooks/useOverlay'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { Pause } from 'windups'

const useTrigger = create(() => ({
  isTriggered: false,
}))

export const handleCollision = () => {
  useTrigger.setState({ isTriggered: true })
}

export function Sauce({ children }: { children: ReactNode }) {
  useOverlay(<Overlay />)
  return children
}

function Overlay() {
  const hasCollided = useTrigger((s) => s.isTriggered)

  return !hasCollided ? (
    <TypewriterWithLink dark link="05_Physics/index.tsx">
      Hey man, <Pause ms={300} /> do me a solid.. Add a RigidBody?
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition dark scene="Models">
      Bouncy!
    </TypewriterWithTransition>
  )
}
