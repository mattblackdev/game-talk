import { useFrame } from '@react-three/fiber'
import { PlaneGeometry, ShaderMaterial } from 'three'

function WaterSurface() {
  const geometry = new PlaneGeometry(10, 10)
  const material = new ShaderMaterial({
    // @ts-ignore
    uniforms: { time: { value: 0 } },
    vertexShader: `
      uniform vec3 sunPosition;
      void main() {
        gl_Position = vec4(position.x + sin(time * 0.01) * 0.1, position.y, position.z, 1.0);
      }
    `,
    fragmentShader: `
      void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
      }
    `,
  })

  useFrame(() => {
    material.uniforms.time.value += 0.01
  })

  return <mesh geometry={geometry} material={material} />
}

export function Water() {
  return <WaterSurface />
}
