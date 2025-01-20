import { CuboidCollider } from '@react-three/rapier'
import { useIsSwordDamaging } from '../09_Fight/useIsSwordDamaging'

export function SwordSensor() {
  if (useIsSwordDamaging()) {
    return (
      <CuboidCollider
        sensor
        name="Sword"
        args={[0.7, 0.1, 0.1]}
        position={[-0.6, 0.5, 1]}
        rotation={[0, Math.PI / 2 - 0.2, 0]}
      />
    )
  }
}
