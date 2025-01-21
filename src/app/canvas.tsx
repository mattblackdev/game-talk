import { Canvas as R3fCanvas } from '@react-three/fiber'
import { ReactNode } from 'react'

export function Canvas({ children }: { children: ReactNode }) {
  return (
    <R3fCanvas
      style={{ position: 'absolute' }}
      shadows
      camera={{
        fov: 75,
        position: [9, 2, 9],
        rotation: [0, Math.PI / 4, 0],
      }}
    >
      {children}
    </R3fCanvas>
  )
}
