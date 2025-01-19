import { useGame } from 'ecctrl'
import { ReactNode, useEffect, useState } from 'react'
import { Typewriter } from '../../coms/typewriter/Typewriter'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { useOverlay } from '../../hooks/useOverlay'

export function Sauce({ children }: { children?: ReactNode }) {
  useOverlay(<Overlay />)
  return children
}

function Overlay() {
  const [hasWalked, setHasWalked] = useState(false)
  const [hasRan, setHasRan] = useState(false)

  useEffect(
    () =>
      useGame.subscribe(
        (s) => s.curAnimation,
        (currentAnimation) => {
          console.log(currentAnimation)
          if (currentAnimation === 'Walking_A') {
            setHasWalked(true)
          } else if (currentAnimation === 'Running_A') {
            setHasRan(true)
          }
        }
      ),
    [hasWalked, setHasWalked]
  )

  return !hasWalked ? (
    <TypewriterWithLink link="08_Move/index.tsx">
      You're alive! Try moving 😃
    </TypewriterWithLink>
  ) : !hasRan ? (
    <Typewriter>Hold shift to run</Typewriter>
  ) : (
    <TypewriterWithTransition scene="Fight">
      Amazing! Get ready to fight!
    </TypewriterWithTransition>
  )
}
