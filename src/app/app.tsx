import { Physics } from '@react-three/rapier'
import { Canvas } from './canvas'
import { Overlay } from '../hooks/useOverlay'
import { Scene } from './scene'

export function App() {
  return (
    <>
      <Canvas>
        <Physics gravity={[0, -10, 0]}>
          <Scene />
        </Physics>
      </Canvas>
      <Overlay />
    </>
  )
}
