import { Sky as DreiSky, Stars } from '@react-three/drei'

export function Sky() {
  return (
    <group name="sky">
      <Stars />
      <DreiSky azimuth={0.6} />
      <directionalLight
        castShadow
        position={[100, 60, 50]}
        shadow-bias={-0.000001}
        shadow-camera-far={256}
        shadow-camera-top={256}
        shadow-camera-left={-256}
        shadow-camera-right={256}
        shadow-camera-bottom={-256}
        shadow-darkness={0.116}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight color={0xabaaba} />
      <ambientLight />
    </group>
  )
}
