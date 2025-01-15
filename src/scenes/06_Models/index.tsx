import { Ground } from '../../coms/Ground'
import { Rocks } from '../../coms/Rocks'
import { Sky } from '../../coms/Sky'
import { Tree } from '../../coms/Tree'
import { useMouseLook } from '../../hooks/useMouseLook'
import { Sauce } from './Sauce'

export function Models() {
  useMouseLook()
  return (
    <Sauce>
      <Sky />
      {/* <Tree position={[-3, 0, -3]} scale={[2, 2, 2]} />
      <Rocks
        position={[12, 0, -15]}
        scale={[15, 15, 15]}
        rotation={[0, -0.1, 0]}
      /> */}
      <Ground />
    </Sauce>
  )
}
