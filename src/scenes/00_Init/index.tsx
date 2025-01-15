import { useOverlay } from '../../hooks/useOverlay'
import { transitionScene } from '../../app/scene'
import { Typewriter } from '../../coms/typewriter/Typewriter'
import { useEnterKey } from '../../hooks/useEnterKey'

export function Init() {
  useEnterKey(() => transitionScene('Title'))
  useOverlay(<Typewriter>hello</Typewriter>)
  return null
}
