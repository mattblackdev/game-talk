import { CylinderCollider, RigidBody } from '@react-three/rapier'
import { colors0x } from '../app/colors'

const depth = 10
const radius = 100
const segments = 128

export function Ground() {
  return (
    <RigidBody type="fixed" position={[0, -depth / 2, 0]}>
      <CylinderCollider args={[depth / 2, radius]} />
      <mesh name="ground" receiveShadow>
        <cylinderGeometry args={[radius, radius, depth, segments]} />
        <meshStandardMaterial color={colors0x.Green} />
      </mesh>
    </RigidBody>
  )
}
