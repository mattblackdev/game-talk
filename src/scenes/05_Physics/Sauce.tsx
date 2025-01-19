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
    <TypewriterWithLink link="05_Physics/index.tsx:28:13">
      Hey, <Pause ms={300} /> wanna do me a solid? 😅
    </TypewriterWithLink>
  ) : (
    <TypewriterWithTransition scene="Models">Bouncy!</TypewriterWithTransition>
  )
}
