import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Vector3Tuple } from 'three'
import { TreeModel } from '../models/TreeModel'

interface TreeProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
}

export function Tree(props: TreeProps) {
  return (
    <RigidBody type="fixed" colliders="trimesh" {...props}>
      <TreeModel />
    </RigidBody>
  )
}

useGLTF.preload('/models/tree.glb')
