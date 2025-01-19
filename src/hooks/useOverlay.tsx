import { animated, SpringConfig, useSpring } from '@react-spring/web'
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { create } from 'zustand'

export type OverlayState = {
  children: ReactNode
  callback: null | (() => void)
  config: null | SpringConfig
  color: string
}

const transparent = '#00000000'

const useStore = create<OverlayState>(() => ({
  children: null,
  callback: null,
  config: null,
  color: transparent,
}))

export const setOverlay = ({
  children = null,
  callback = null,
  config = null,
  color = transparent,
}: {
  children?: ReactNode
  callback?: null | (() => void)
  config?: null | SpringConfig
  color?: string
}) => {
  useStore.setState({ children, callback, config, color })
}

export const closeOverlay = () => setOverlay({})

const Container = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
})

const Backdrop = animated(
  styled.div({
    width: '100%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
  })
)

const defaultConfig = { duration: 322 }
const onRest = () => useStore.getState().callback?.()

export function Overlay() {
  const overlay = useStore((s) => s.children)
  const backgroundColor = useStore((s) => s.color)
  const config = useStore((s) => s.config) ?? defaultConfig

  const backdropStyle = useSpring({
    backgroundColor,
    config,
    onRest,
  })

  return (
    <>
      <Backdrop style={backdropStyle} />
      {overlay ? <Container>{overlay}</Container> : null}
    </>
  )
}

export function useOverlay(children: ReactNode) {
  useEffect(() => {
    setOverlay({ children })
  }, [children])
}
