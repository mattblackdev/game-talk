import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Euler, Quaternion } from 'three'
import { usePointerLock } from './usePointerLock'

const limit = 1.0472
const speed = 0.00472

export function useMouseLook() {
  const isPointerLocked = usePointerLock()
  const camera = useThree((s) => s.camera)
  const [euler] = useState(() => new Euler(0, 0, 0, 'YXZ'))

  useEffect(() => {
    euler.setFromQuaternion(camera.getWorldQuaternion(new Quaternion()))

    function handlePointerMove(e: PointerEvent) {
      if (!isPointerLocked) return
      camera.rotateY(e.movementX * 0.001)
      camera.rotateX(e.movementY * 0.001)

      euler.y -= e.movementX * speed
      euler.x -= e.movementY * (speed / 2)
      euler.x = Math.min(Math.max(euler.x, -limit), limit)

      camera.quaternion.setFromEuler(euler)
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [camera, euler, isPointerLocked])
}
