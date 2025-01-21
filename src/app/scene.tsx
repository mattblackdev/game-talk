import { useScene } from '../hooks/useScene'
import { scenes } from '../scenes'
import { Suspense } from 'react'

export function Scene() {
  const key = useScene((s) => s.key)
  const Scene = scenes[key]

  if (!Scene) {
    console.log(`No scene for key: "${key}"`)
    return null
  }

  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  )
}
