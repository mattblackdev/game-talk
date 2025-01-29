import { Ground } from '../../coms/Ground'
import { EcctrlKnight } from '../../coms/Knight'
import { Sky } from '../../coms/Sky'
import { Scenery } from '../06_Models'
import { SwordSensor } from '../10_Flight/SwordSensor'
import { Minion } from './Minion'
import { Sauce } from './Sauce'

export function Flight() {
  return (
    <Sauce>
      <Sky />
      <Scenery />
      <EcctrlKnight>
        <SwordSensor />
      </EcctrlKnight>
      <Minion />
      <Ground />
    </Sauce>
  )
}
