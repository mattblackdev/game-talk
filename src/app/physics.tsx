import { Physics as RapierPhysics } from '@react-three/rapier'
import { ReactNode, useState } from 'react'
import { useKeyDown } from '../hooks/useKeyDown'

export function Physics({ children }: { children: ReactNode }) {
  const [debug, setDebug] = useState(true)
  useKeyDown('`', () => setDebug((enabled) => !enabled))
  return (
    /* Prefer explicit colliders and heavier gravity for games */
    <RapierPhysics debug={debug} colliders={false} gravity={[0, -26, 0]}>
      {children}
    </RapierPhysics>
  )
}
