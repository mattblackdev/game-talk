import { useFrame, useThree } from '@react-three/fiber'
import { ReactNode, useRef } from 'react'
import { create } from 'zustand'
import { useOverlay } from '../../hooks/useOverlay'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'

export function Sauce({ children }: { children: ReactNode }) {
  const camera = useThree((s) => s.camera)
  const lastRotation = useRef(camera.rotation.x)

  useFrame(() => {
    const rotation = Math.abs(camera.rotation.x - lastRotation.current)
    lastRotation.current = camera.rotation.x
    updateStep(rotation)
  })

  useOverlay(<Overlay />)

  return children
}

const useStore = create(() => ({
  hasRotated: 0,
}))

function updateStep(rotation: number) {
  useStore.setState((s) => {
    let { hasRotated } = s

    if (!hasRotated && rotation > 0) {
      hasRotated = 1
    }

    return {
      hasRotated,
    }
  })
}

function Overlay() {
  const { hasRotated } = useStore()

  const words = [
    <TypewriterWithLink link={'03_Mouse/index.tsx'}>
      Now.. how do we look around?
    </TypewriterWithLink>,
    <TypewriterWithTransition scene="Ground">
      Amazing!
    </TypewriterWithTransition>,
  ]

  return words[hasRotated]
}
