import { animated, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import { colors } from '../../app/colors'
import { Typewriter, TypewriterProps } from './Typewriter'

export type TypewriterWithLinkProps = TypewriterProps & {
  link: string
}

export function TypewriterWithLink({
  link,
  onDone,
  ...rest
}: TypewriterWithLinkProps) {
  const [style, spring] = useSpring(() => ({
    opacity: 0,
  }))

  const href = `vscode://file/${
    import.meta.env.VITE_REPO_PATH
  }/src/scenes/${link}`

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
          onDone?.()
        }}
        {...rest}
      />
      <Link style={style} href={href}>
        Edit Code
      </Link>
    </>
  )
}

const Link = animated(
  styled.a({
    marginTop: 40,
    borderRadius: 40,
    color: colors.White,
    backgroundColor: colors.Purple,
    border: `2px solid ${colors.White}`,
    WebkitTextStroke: `2px ${colors.Black}`,
    paintOrder: 'stroke fill',
    textDecoration: 'none',
    pointerEvents: 'auto',
    padding: '10px 20px',
    fontSize: '2.4rem',
    fontWeight: 'bold',
  })
)
