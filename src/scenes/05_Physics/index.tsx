import { CameraControls } from '@react-three/drei'
import {
  CoefficientCombineRule,
  CylinderCollider,
  RigidBody,
} from '@react-three/rapier'
import { colors0x } from '../../app/colors'
import {
  randomColor,
  randomRadialPosition,
  times,
  uniqueId,
} from '../../app/utils'
import { Sky } from '../../coms/Sky'
import { handleCollision, Sauce } from './Sauce'

const depth = 10
const radius = 100
const segments = 128

export function Physics() {
  return (
    <Sauce>
      <Sky />
      {balls}
      <CameraControls distance={100} />
      <RigidBody type="fixed" onCollisionEnter={handleCollision}>
        {/* <CylinderCollider args={[depth / 2, radius]} /> */}
        <mesh name="ground">
          <cylinderGeometry args={[radius, radius, depth, segments]} />
          <meshStandardMaterial color={colors0x.Green} />
        </mesh>
      </RigidBody>
    </Sauce>
  )
}

const balls = times(500, () => (
  <RigidBody
    key={uniqueId()}
    colliders="ball"
    restitution={0.5}
    restitutionCombineRule={CoefficientCombineRule.Max}
    position={randomRadialPosition({
      radius,
      centerY: 456,
      height: 789,
    })}
  >
    <mesh>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color={randomColor()} />
    </mesh>
  </RigidBody>
))
