import styled from 'styled-components'
import { useOverlay } from '../../hooks/useOverlay'
import { TypewriterWithTransition } from '../../coms/typewriter/TypewriterWithTransition'

export function Title() {
  useOverlay(<Overlay />)
  return null
}

function Overlay() {
  return (
    <>
      <TypewriterWithTransition scene="Light">
        <TitleText>3D Game Development with React</TitleText>
      </TypewriterWithTransition>
    </>
  )
}

const TitleText = styled.div({
  fontSize: '2rem',
})
