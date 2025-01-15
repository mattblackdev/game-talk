import { useAnimations, useGLTF } from '@react-three/drei'
import { Ground } from '../../coms/Ground'
import { Sky } from '../../coms/Sky'
import { Sauce } from './Sauce'

export function Breath() {
  const { animations, scene } = useGLTF('/models/knight.glb')
  const { actions } = useAnimations(animations, scene)
  actions['Idle']?.play()
  return (
    <Sauce>
      <Sky />
      <primitive
        name="player"
        object={scene}
        dispose={null}
        position={[7.5, 0, 7.5]}
        rotation={[0, Math.PI / 4, 0]}
      />
      <Ground />
    </Sauce>
  )
}
