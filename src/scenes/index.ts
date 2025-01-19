import { ReactNode } from 'react'
import { Init } from './00_Init'
import { Title } from './01_Title'
import { Light } from './02_Light'
import { Mouse } from './03_Mouse'
import { Ground } from './04_Ground'
import { Physics } from './05_Physics'
import { Models } from './06_Models'
import { Breath } from './07_Breath'
import { Move } from './08_Move'
import { Fight } from './09_Fight/'

export const scenes: Record<string, () => ReactNode> = {
  Init,
  Title,
  Light,
  Mouse,
  Ground,
  Physics,
  Models,
  Breath,
  Move,
  Fight,
}
