import { useState } from 'react'
import { PressEnter } from './PressEnter'
import { Typewriter, TypewriterProps } from './Typewriter'

export type TypewriterWithTransitionProps = TypewriterProps & {
  scene: string
}

export function TypewriterWithTransition({
  scene,
  onDone,
  ...props
}: TypewriterWithTransitionProps) {
  const [isDone, setIsDone] = useState(false)
  return (
    <>
      <Typewriter
        onDone={() => {
          setIsDone(true)
          onDone?.()
        }}
        {...props}
      />
      {isDone && <PressEnter scene={scene} />}
    </>
  )
}
