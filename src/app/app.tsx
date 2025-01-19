import { Overlay } from '../hooks/useOverlay'
import { Canvas } from './canvas'
import { Physics } from './physics'
import { Scene } from './scene'

export function App() {
  return (
    <>
      <Canvas>
        <Physics>
          <Scene />
        </Physics>
      </Canvas>
      <Overlay />
    </>
  )
}
