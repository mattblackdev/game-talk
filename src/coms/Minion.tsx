import { CylinderCollider, RigidBody } from '@react-three/rapier'
import { Vector3Tuple } from 'three'
import { MinionModel } from '../models/MinionModel'

interface MinionProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
}

export function Minion({ ...props }: MinionProps) {
  return (
    <RigidBody {...props}>
      <CylinderCollider args={[1, 1]} />
      <MinionModel />
    </RigidBody>
  )
}
