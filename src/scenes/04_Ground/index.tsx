import { Sky, Stars } from '@react-three/drei'
import { colors0x } from '../../app/colors'
import { useMouseLook } from '../../hooks/useMouseLook'
import { Sauce } from './Sauce'

const radius = 10
const depth = 0.1
const segments = 128

export function Ground() {
  useMouseLook()
  return (
    <Sauce>
      <Stars />
      <Sky azimuth={0.5} />
      {/* <mesh name="ground" position={[0, -0.1, 0]}>
        <cylinderGeometry args={[radius, radius, depth, segments]} />
        <meshStandardMaterial color={colors0x.Green} />
      </mesh> */}
      <directionalLight position={[10, 6, 5]} />
      <hemisphereLight color={0xabaaba} />
      <ambientLight />
    </Sauce>
  )
}
