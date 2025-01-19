import { KeyboardControls } from '@react-three/drei'
import Ecctrl, { EcctrlAnimation } from 'ecctrl'
import { ReactNode } from 'react'
import { KnightModel } from '../models/KnightModel'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
  { name: 'action1', keys: ['1'] },
  { name: 'action2', keys: ['2'] },
  { name: 'action3', keys: ['3'] },
  { name: 'action4', keys: ['KeyF'] },
]

export const animationSet = {
  idle: 'Idle',
  walk: 'Walking_A',
  run: 'Running_A',
  jump: 'Jump_Start',
  jumpIdle: 'Jump_Idle',
  jumpLand: 'Jump_Land',
  fall: 'Jump_Idle',
  action1: 'Lie_Down',
  action2: 'PickUp',
  action3: 'Throw',
  action4: '1H_Melee_Attack_Chop',
}

export function EcctrlKnight({ children }: { children: ReactNode }) {
  return (
    <KeyboardControls map={keyboardMap}>
      <Ecctrl
        animated
        jumpVel={10}
        camMoveSpeed={3}
        camInitDir={{ x: 0, y: -Math.PI }}
      >
        <EcctrlAnimation
          characterURL={'/models/knight.glb'}
          animationSet={animationSet}
        >
          <KnightModel>{children}</KnightModel>
        </EcctrlAnimation>
      </Ecctrl>
    </KeyboardControls>
  )
}
