import { ReactNode } from 'react'
import styled from 'styled-components'
import { Pace, WindupChildren } from 'windups'
import { colors } from '../../app/colors'

export type TypewriterProps = {
  dark?: boolean
  onDone?(): void
  children: ReactNode
}

export function Typewriter(props: TypewriterProps) {
  return (
    <>
      <Font $dark={props.dark}>
        <WindupChildren onFinished={props.onDone}>
          <Pace ms={51}>{props.children}</Pace>
        </WindupChildren>
      </Font>
    </>
  )
}

const Font = styled.div<{ $dark?: boolean }>((props) => ({
  WebkitTextStroke: props.$dark ? `4px ${colors.Black}` : `2px ${colors.Cyan}`,
  maxWidth: 'min(750px, 80vw)',
  paintOrder: 'stroke fill',
  fontSize: '1.8rem',
  padding: 10,
}))
