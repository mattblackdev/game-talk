import { animated, easings, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import { colors } from '../../app/colors'
import { Typewriter, TypewriterProps } from './Typewriter'

export type TypewriterWithLinkProps = TypewriterProps & {
  link: string
}

export function TypewriterWithLink({
  link,
  dark,
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
            config: { duration: 1000 },
            to: { opacity: 1 },
            onRest: () => {
              spring.start({
                config: { duration: 1000, easing: easings.easeInExpo },
                loop: { reverse: true },
                from: { opacity: 1 },
                to: { opacity: 0.7 },
              })
            },
          })
          onDone?.()
        }}
        dark={dark}
        {...rest}
      />
      <Link style={style} href={href} $dark={dark}>
        Edit code
      </Link>
    </>
  )
}

const Link = animated(
  styled.a<{ $dark?: boolean }>((props) => ({
    marginTop: 10,
    fontWeight: 900,
    fontSize: '1.1rem',
    color: props.$dark ? colors.Purple : colors.Cyan,
  }))
)
