import { Stars } from '@react-three/drei'
import { useMouseLook } from '../../hooks/useMouseLook'
import { Sauce } from './Sauce'

export function Mouse() {
  // useMouseLook()

  return (
    <Sauce>
      <Stars />
    </Sauce>
  )
}
