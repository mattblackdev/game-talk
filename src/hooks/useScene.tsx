import { create } from 'zustand'
import { colors } from '../app/colors'
import { setOverlay } from '../hooks/useOverlay'

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
