import { CameraControls, Sky, Stars } from '@react-three/drei'
import { colors0x } from '../../app/colors'
import { Sauce } from './Sauce'

const depth = 10
const radius = 100
const segments = 128

export function Ground() {
  return (
    <Sauce>
      <CameraControls />
      <Sky azimuth={0.6} />
      {/* <mesh name="ground" position-y={-depth}>
        <cylinderGeometry args={[radius, radius, depth, segments]} />
        <meshStandardMaterial color={colors0x.Green} />
      </mesh> */}
      <directionalLight position={[radius, radius * 0.6, radius * 0.5]} />
      <hemisphereLight color={0xabaaba} />
      <ambientLight />
      <Stars />
    </Sauce>
  )
}
