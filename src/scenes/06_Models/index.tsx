import { CameraControls } from '@react-three/drei'
import {
  randomRadialPosition,
  randomScale,
  times,
  uniqueId,
} from '../../app/utils'
import { Ground } from '../../coms/Ground'
import { Rocks } from '../../coms/Rocks'
import { Sky } from '../../coms/Sky'
import { Tree } from '../../coms/Tree'
import { Sauce } from './Sauce'

export function Models() {
  return (
    <Sauce>
      <Sky />
      <CameraControls />
      {/* <Scenery /> */}
      <Ground />
    </Sauce>
  )
}

export function Scenery() {
  return (
    <>
      {/* {smallTrees} */}
      {/* {tallTrees} */}
      <Rocks />
    </>
  )
}

const smallTrees = times(200, () => (
  <Tree
    key={uniqueId()}
    scale={randomScale(2, 3)}
    position={randomRadialPosition({ innerRadius: 70, radius: 80 })}
  />
))

const tallTrees = times(100, () => (
  <Tree
    key={uniqueId()}
    scale={randomScale(4, 7)}
    position={randomRadialPosition({ innerRadius: 81, radius: 99 })}
  />
))
