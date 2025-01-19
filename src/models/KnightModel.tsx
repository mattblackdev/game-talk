import { useGLTF } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import { ReactNode, useMemo } from 'react'
import { SkeletonUtils } from 'three-stdlib'

export function KnightModel({ children }: { children?: ReactNode }) {
  const { scene } = useGLTF('/models/knight.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  return (
    <group name="Scene" position={[0, -0.87, 0]}>
      <group name="Rig">
        <primitive object={nodes.root} />
      </group>
      <skinnedMesh
        name="Knight_ArmLeft"
        // @ts-ignore
        geometry={nodes.Knight_ArmLeft.geometry}
        material={materials.knight_texture}
        // @ts-ignore
        skeleton={nodes.Knight_ArmLeft.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Knight_ArmRight"
        // @ts-ignore
        geometry={nodes.Knight_ArmRight.geometry}
        material={materials.knight_texture}
        // @ts-ignore
        skeleton={nodes.Knight_ArmRight.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Knight_Body"
        // @ts-ignore
        geometry={nodes.Knight_Body.geometry}
        material={materials.knight_texture}
        // @ts-ignore
        skeleton={nodes.Knight_Body.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Knight_Head"
        // @ts-ignore
        geometry={nodes.Knight_Head.geometry}
        material={materials.knight_texture}
        // @ts-ignore
        skeleton={nodes.Knight_Head.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Knight_LegLeft"
        // @ts-ignore
        geometry={nodes.Knight_LegLeft.geometry}
        material={materials.knight_texture}
        // @ts-ignore
        skeleton={nodes.Knight_LegLeft.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Knight_LegRight"
        // @ts-ignore
        geometry={nodes.Knight_LegRight.geometry}
        material={materials.knight_texture}
        // @ts-ignore
        skeleton={nodes.Knight_LegRight.skeleton}
        receiveShadow
        castShadow
      />
      {children}
    </group>
  )
}

useGLTF.preload('/models/knight.glb')
