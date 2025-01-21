import { animated, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import { colors } from '../../app/colors'
import { transitionScene } from '../../hooks/useScene'
import { Typewriter, TypewriterProps } from './Typewriter'

export type TypewriterWithTransitionProps = TypewriterProps & {
  scene: string
}

export function TypewriterWithTransition({
  scene,
  onDone,
  ...rest
}: TypewriterWithTransitionProps) {
  const [style, spring] = useSpring(() => ({
    opacity: 0,
  }))

  return (
    <>
      <Typewriter
        onDone={() => {
          spring.start({
            to: { opacity: 1 },
            onRest: () => {
              spring.start({
                loop: { reverse: true },
                from: { opacity: 1 },
                to: { opacity: 0.5 },
              })
            },
          })
        }}
        {...rest}
      />
      <Text style={style} onClick={() => transitionScene(scene)}>
        Next Scene
      </Text>
    </>
  )
}

const Text = animated(
  styled.div({
    marginTop: 40,
    borderRadius: 40,
    color: colors.White,
    backgroundColor: colors.Purple,
    border: `2px solid ${colors.White}`,
    WebkitTextStroke: `2px ${colors.Black}`,
    paintOrder: 'stroke fill',
    pointerEvents: 'auto',
    padding: '10px 20px',
    fontWeight: 'bold',
    fontSize: '2.4rem',
    cursor: 'pointer',
  })
)
