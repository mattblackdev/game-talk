import { CylinderCollider, RigidBody } from '@react-three/rapier'
import { colors0x } from '../app/colors'

export function Ground() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CylinderCollider args={[0.1, 22]} />
      <mesh name="ground" receiveShadow position={[0, -0.1, 0]}>
        <cylinderGeometry args={[22, 22, 0.1, 128]} />
        <meshStandardMaterial color={colors0x.Green} />
      </mesh>
    </RigidBody>
  )
}
