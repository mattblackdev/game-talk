import { CameraControls, Stars } from '@react-three/drei'
import { Sauce, triggerNextStep } from './Sauce'

export function Mouse() {
  return (
    <Sauce>
      <Stars />
      {/* <CameraControls onChange={triggerNextStep} /> */}
    </Sauce>
  )
}
