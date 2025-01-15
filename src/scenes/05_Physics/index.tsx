import { CoefficientCombineRule, RigidBody } from '@react-three/rapier'
import { colors0x } from '../../app/colors'
import { Sky } from '../../coms/Sky'
import { useMouseLook } from '../../hooks/useMouseLook'
import { Sauce, handleCollision } from './Sauce'

export function Physics() {
  useMouseLook()
  return (
    <Sauce>
      <Sky />

      <RigidBody
        restitution={0.5}
        restitutionCombineRule={CoefficientCombineRule.Max}
      >
        <mesh position={[0, 10, 0]}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color={colors0x.Red} />
        </mesh>
      </RigidBody>

      {/* <RigidBody type="fixed" onCollisionEnter={handleCollision}> */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[20, 20, 0.1, 128]} />
        <meshStandardMaterial color={colors0x.Green} />
      </mesh>
      {/* </RigidBody> */}
    </Sauce>
  )
}
