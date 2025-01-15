import { Sky as DreiSky, Stars } from '@react-three/drei'

export function Sky() {
  return (
    <group name="sky">
      <Stars />
      <DreiSky azimuth={0.5} />
      <directionalLight
        castShadow
        position={[10, 6, 5]}
        shadow-bias={-0.000001}
        shadow-camera-far={100}
        shadow-camera-top={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-bottom={-100}
        shadow-darkness={0.116}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight color={0xabaaba} />
      <ambientLight />
    </group>
  )
}
