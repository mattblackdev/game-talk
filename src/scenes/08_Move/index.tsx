import { KeyboardControls } from '@react-three/drei'
import Ecctrl, { EcctrlAnimation } from 'ecctrl'
import { Ground } from '../../coms/Ground'
import { Sky } from '../../coms/Sky'
import { KnightModel } from '../../models/KnightModel'
import { Sauce } from './Sauce'

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

const animationSet = {
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

export function Move() {
  return (
    <Sauce>
      <Sky />
      <KeyboardControls map={keyboardMap}>
        <Ecctrl animated camMoveSpeed={3} camInitDir={{ x: 0, y: -Math.PI }}>
          <EcctrlAnimation
            characterURL={'/models/knight.glb'}
            animationSet={animationSet}
          >
            <KnightModel />
          </EcctrlAnimation>
        </Ecctrl>
      </KeyboardControls>
      <Ground />
    </Sauce>
  )
}
