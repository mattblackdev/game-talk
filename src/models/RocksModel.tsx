import { useGLTF } from '@react-three/drei'

export function RocksModel() {
  const { nodes, materials } = useGLTF('/models/rocks.glb')
  return (
    <mesh
      castShadow
      receiveShadow
      dispose={null}
      // @ts-ignore
      geometry={nodes.rock_single_A.geometry}
      material={materials.hexagons_medieval}
    />
  )
}

useGLTF.preload('/models/rocks.glb')
