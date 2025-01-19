import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Vector3Tuple } from 'three'

interface TreeProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
}

export function Tree(props: TreeProps) {
  const { nodes, materials } = useGLTF('/models/tree.glb')

  return (
    <RigidBody type="fixed" colliders="hull" {...props}>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.tree.geometry}
        material={materials.tree}
      />
    </RigidBody>
  )
}

useGLTF.preload('/models/tree.glb')
