import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { create } from 'zustand'
import { useIsTriplexEditing } from '../triplex/Context'

const useStore = create(() => ({
  isLocked: false,
}))
const setLocked = () => useStore.setState({ isLocked: true })
const setUnlocked = () => useStore.setState({ isLocked: false })
export const getIsPointerLocked = () => useStore.getState().isLocked
export const useIsPointerLocked = () => useStore((s) => s.isLocked)

export function usePointerLock() {
  const isTriplexEditing = useIsTriplexEditing()
  const { gl } = useThree()

  useEffect(() => {
    function handleClick() {
      if (isTriplexEditing) return
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock?.()
      }
    }
    window.addEventListener('click', handleClick)

    function handlePointerLockChange() {
      if (!document.pointerLockElement) {
        setUnlocked()
      } else {
        setLocked()
      }
    }
    document.addEventListener('pointerlockchange', handlePointerLockChange)

    return () => {
      gl.domElement.removeEventListener('click', handleClick)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.exitPointerLock()
      setUnlocked()
    }
  }, [gl, isTriplexEditing])

  return useIsPointerLocked()
}
