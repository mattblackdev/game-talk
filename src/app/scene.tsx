import { create } from 'zustand'
import { colors } from './colors'
import { setOverlay } from '../hooks/useOverlay'
import { scenes } from '../scenes'
import { Suspense } from 'react'

export type SceneState = {
  key: string
}

export const useScene = create<SceneState>(() => ({
  key: window.location.hash.substring(1) || 'Init',
}))

export function transitionScene(key: string) {
  setOverlay({
    config: { duration: 2000 },
    color: colors.RealBlack + 'FF',
    callback: () => {
      window.location.hash = key
      useScene.setState({ key })
      setOverlay({
        config: { duration: 2000 },
        color: colors.RealBlack + '00',
      })
    },
  })
}

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
