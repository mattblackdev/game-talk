import { useGLTF } from '@react-three/drei'

export function CoinsModel() {
  const { nodes, materials } = useGLTF('/models/coins.glb')

  return (
    <mesh
      castShadow
      receiveShadow
      // @ts-ignore
      geometry={nodes.coin_stack_large.geometry}
      material={materials.texture}
    />
  )
}

useGLTF.preload('/models/coins.glb')
