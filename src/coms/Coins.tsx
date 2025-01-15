import { useGLTF } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { Vector3Tuple } from 'three'
import { useShadows } from '../hooks/useShadows'

type CoinsProps = {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
}

export function Coins(props: CoinsProps) {
  const { scene } = useGLTF('/models/coins.glb')
  useShadows(scene)
  return (
    <RigidBody>
      <BallCollider args={[1]} />
      <primitive object={scene} {...props} />
    </RigidBody>
  )
}

useGLTF.preload('/models/coins.glb')
