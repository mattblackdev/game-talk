import { CameraControls, useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Ground } from '../../coms/Ground'
import { Sky } from '../../coms/Sky'
import { Scenery } from '../06_Models'
import { Sauce } from './Sauce'

export function Breath() {
  const { animations, scene } = useGLTF('/models/knight.glb')

  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    actions['Idle']?.reset().play()
  }, [])

  return (
    <Sauce>
      <Sky />
      <Scenery />
      <CameraControls />
      {/* <primitive
        name="player"
        object={scene}
        dispose={null}
        position={[7.5, 0, 7.5]}
        rotation={[0, Math.PI / 4, 0]}
      /> */}
      <Ground />
    </Sauce>
  )
}
