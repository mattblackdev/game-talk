import { useGLTF } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import { useMemo } from 'react'
import { SkeletonUtils } from 'three-stdlib'

export function MinionModel() {
  const { scene } = useGLTF('/models/minion.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  return (
    <group name="Scene" position={[0, -1, 0]}>
      <group name="Rig">
        <primitive object={nodes.root} />
      </group>
      <skinnedMesh
        name="Skeleton_Minion_ArmLeft"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_ArmLeft.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_ArmLeft.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_ArmRight"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_ArmRight.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_ArmRight.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_Body"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_Body.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_Body.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_Cloak"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_Cloak.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_Cloak.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_Eyes"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_Eyes.geometry}
        material={materials.Glow}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_Eyes.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_Head"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_Head.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_Head.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_Jaw"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_Jaw.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_Jaw.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_LegLeft"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_LegLeft.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_LegLeft.skeleton}
        receiveShadow
        castShadow
      />
      <skinnedMesh
        name="Skeleton_Minion_LegRight"
        // @ts-ignore
        geometry={nodes.Skeleton_Minion_LegRight.geometry}
        material={materials.skeleton}
        // @ts-ignore
        skeleton={nodes.Skeleton_Minion_LegRight.skeleton}
        receiveShadow
        castShadow
      />
    </group>
  )
}
