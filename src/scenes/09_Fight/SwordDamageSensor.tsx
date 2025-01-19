import { CuboidCollider } from '@react-three/rapier'
import { useIsSwordDamaging } from './useIsSwordDamaging'

export function SwordDamageSensor() {
  // True 700ms after sword strike
  // begins, then false 100ms later.
  const isDamaging = useIsSwordDamaging()

  if (!isDamaging) return null

  return (
    <CuboidCollider
      sensor
      name="Sword"
      args={[0.7, 0.1, 0.1]}
      position={[-0.5, 1, 1]}
      rotation={[0, Math.PI / 2 - 0.2, 0]}
    />
  )
}
