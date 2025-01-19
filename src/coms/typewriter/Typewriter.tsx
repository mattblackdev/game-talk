import { ReactNode } from 'react'
import styled from 'styled-components'
import { Pace, WindupChildren } from 'windups'
import { colors } from '../../app/colors'

export type TypewriterProps = {
  children: ReactNode
  middle?: boolean
  onDone?(): void
}

export function Typewriter(props: TypewriterProps) {
  return (
    <Font>
      {!props.middle ? <Spacer /> : null}
      <WindupChildren onFinished={props.onDone}>
        <Pace ms={51}>{props.children}</Pace>
      </WindupChildren>
    </Font>
  )
}

const Font = styled.div({
  WebkitTextStroke: `4px ${colors.Purple}`,
  maxWidth: 'min(750px, 80vw)',
  paintOrder: 'stroke fill',
  fontSize: '2.2rem',
  padding: 10,
})

const Spacer = styled.div({
  height: '50vh',
})
