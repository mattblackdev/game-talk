import { Typewriter } from '../../coms/typewriter/Typewriter'
import { useKeyDown } from '../../hooks/useKeyDown'
import { useOverlay } from '../../hooks/useOverlay'
import { transitionScene } from '../../hooks/useScene'

export function Init() {
  useKeyDown('Enter', () => transitionScene('Title'))
  useOverlay(<Typewriter middle>press enter to start</Typewriter>)
  return null
}
