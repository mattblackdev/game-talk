import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Vector3Tuple } from 'three'

export interface RocksProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
}

export function Rocks(props: RocksProps) {
  const { nodes, materials } = useGLTF('/models/rocks.glb')

  return (
    <RigidBody type="fixed" colliders="trimesh" {...props}>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.rock_single_A.geometry}
        material={materials.hexagons_medieval}
        scale={[15, 15, 15]}
        position={[0, 0, -20]}
      />
    </RigidBody>
  )
}

useGLTF.preload('/models/rocks.glb')
