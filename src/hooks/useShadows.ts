import { useEffect } from 'react'
import { Group, Object3DEventMap } from 'three'

export function useShadows(scene: Group<Object3DEventMap>) {
  useEffect(() => {
    scene.traverse((o) => {
      if (o.type !== 'Mesh') return
      o.castShadow = true
      o.receiveShadow = true
    })
  }, [scene])
}
