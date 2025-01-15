import { useGLTF } from '@react-three/drei'

export function TreeModel() {
  const { nodes, materials } = useGLTF('/models/tree.glb')
  return (
    <mesh
      castShadow
      receiveShadow
      dispose={null}
      // @ts-ignore
      geometry={nodes.tree.geometry}
      material={materials.tree}
    />
  )
}

useGLTF.preload('/models/tree.glb')
