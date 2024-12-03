import { SpringConfig } from '@react-spring/web'
import { ReactNode } from 'react'
import create from 'zustand'
import { colors } from './colors'
// import { clearSelection } from './useSelectable'

export type State = {
  sceneKey: string
  transitionScene: (
    nextScene: string,
    options?: {
      fadeColor?: string
      fadeInConfig?: SpringConfig
      fadeOutConfig?: SpringConfig
      onFadeOut?: () => void
      onFadeIn?: () => void
    }
  ) => void

  overlay: ReactNode
  overlayKey: string
  overlayCallback: null | (() => void)
  overlayConfig: null | SpringConfig
  overlayColor: string
  overlayHasFocus: boolean
  setOverlay: (params: {
    key?: string
    color?: string
    overlay?: ReactNode
    config?: SpringConfig
    captureFocus?: boolean
    callback?: () => void
  }) => void
  closeOverlay: () => void
}

function determineSceneFromRoute() {
  const route = window.location.pathname.substring(1)
  return route || 'start'
}

export const useStore = create<State>((set, get) => ({
  overlay: null,
  overlayKey: '',
  overlayColor: '#00000000',
  overlayConfig: null,
  overlayCallback: null,
  overlayHasFocus: false,
  setOverlay: ({
    overlay = null,
    key = '',
    color = null,
    config = null,
    callback = null,
    captureFocus = true,
  }) => {
    const overlayHasFocus = !!overlay && captureFocus
    const overlayColor = color ?? '#00000000'

    set({
      overlay,
      overlayKey: key,
      overlayColor,
      overlayConfig: config,
      overlayCallback: callback,
      overlayHasFocus,
    })
  },
  closeOverlay: () => {
    const { setOverlay } = get()
    setOverlay({})
  },

  sceneKey: determineSceneFromRoute(),
  transitionScene: (
    nextScene,
    {
      fadeColor = colors.RealBlack,
      fadeOutConfig = { duration: 744 },
      fadeInConfig = { duration: 744 },
      onFadeOut,
      onFadeIn,
    } = {}
  ) => {
    const { setOverlay } = get()
    // clearSelection()
    setOverlay({
      color: fadeColor + 'FF',
      config: fadeOutConfig,
      callback: () => {
        onFadeOut?.()
        set({
          sceneKey: nextScene,
        })
        setOverlay({
          config: fadeInConfig,
          color: fadeColor + '00',
          callback: onFadeIn,
        })
      },
    })
  },
}))

export const getState = () => useStore.getState()

console.log('hi', determineSceneFromRoute())

export const selectSceneKey = (state: State) => state.sceneKey
export const useSceneKey = () => useStore(selectSceneKey)
export const selectTransitionScene = (state: State) => state.transitionScene
export const useTransitionScene = () => useStore(selectTransitionScene)

export const selectOverlay = (state: State) => state.overlay
export const selectSetOverlay = (state: State) => state.setOverlay
export const selectCloseOverlay = (state: State) => state.closeOverlay
