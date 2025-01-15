import { animated, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import { transitionScene } from '../../app/scene'
import { useEnterKey } from '../../hooks/useEnterKey'
import { colors } from '../../app/colors'

export type PressEnterProps = {
  scene: string
}

export function PressEnter({ scene }: PressEnterProps) {
  const style = useSpring({
    config: { duration: 3500 },
    loop: { reverse: true },
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  useEnterKey(() => transitionScene(scene))

  return <Text style={style}>Press Enter</Text>
}

const Text = animated(
  styled.div({
    WebkitTextStroke: `2px ${colors.White}`,
    paintOrder: 'stroke fill',
    position: 'absolute',
    bottom: '2vh',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: colors.Purple,
  })
)
