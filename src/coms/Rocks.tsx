import { RigidBody } from '@react-three/rapier'
import { Vector3Tuple } from 'three'
import { RocksModel } from '../models/RocksModel'

export interface RocksProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
}

export function Rocks(props: RocksProps) {
  return (
    <RigidBody type="fixed" colliders="trimesh" {...props}>
      <RocksModel />
    </RigidBody>
  )
}
