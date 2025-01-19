import { ReactNode } from 'react'
import { create } from 'zustand'
import { TypewriterWithLink } from '../../coms/typewriter/TypewriterWithLink'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'
import { useOverlay } from '../../hooks/useOverlay'

export function Sauce({ children }: { children: ReactNode }) {
  useOverlay(<Overlay />)
  return children
}

function Overlay() {
  const hasRotated = useStore((s) => s.hasRotated)

  return [
    <TypewriterWithLink link={'03_Mouse/index.tsx:8:11'} middle>
      How do we look around?
    </TypewriterWithLink>,
    <TypewriterWithTransition scene="Ground" middle>
      Amazing!
    </TypewriterWithTransition>,
  ][!hasRotated ? 0 : 1]
}

const useStore = create<{ timeout?: NodeJS.Timeout; hasRotated: boolean }>(
  () => ({
    timeout: undefined,
    hasRotated: false,
  })
)

export const triggerNextStep = () => {
  if (!useStore.getState().timeout) {
    useStore.setState({
      timeout: setTimeout(() => {
        useStore.setState({ hasRotated: true })
      }, 300),
    })
  }
}
