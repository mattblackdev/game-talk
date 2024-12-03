import { a, useSpring } from '@react-spring/web'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  OnChar,
  Pace,
  WindupChildren,
  Linebreaker as WindupsLinebreaker,
} from 'windups'

type TypeWriterProps = {
  pace?: number
  fadeOut?: number
  dontFadeOut?: boolean
  children: ReactNode
  onDone?(): void
}

export function TypeWriter(props: TypeWriterProps) {
  const [width, setWidth] = useState(444)
  const [skipped, setSkipped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLSpanElement>(null)

  // Get width of div for Linebreaker
  useLayoutEffect(() => {
    setWidth(ref.current?.clientWidth || 251)
  }, [])

  const [style, api] = useSpring(() => ({
    from: {
      opacity: 1,
      width: '100%',
      display: 'inline-block',
    },
  }))

  // Fade out
  const handleTypingFinished = () => {
    if (props.dontFadeOut) {
      props.onDone?.()
      return
    }

    let duration = props.fadeOut ?? 2100
    setTimeout(() => {
      api.start({
        to: { opacity: 0 },
        config: { duration },
        onRest: () => {
          console.log('done!')
          props.onDone?.()
        },
      })
    }, 510)
  }

  // Handle skipping via click
  useEffect(() => {
    function handleClick() {
      if (!skipped) {
        setSkipped(true)
      }
    }
    setTimeout(() => document.addEventListener('click', handleClick), 0)
    return () => document.removeEventListener('click', handleClick)
  }, [skipped, setSkipped])

  return (
    <a.div style={style} ref={ref}>
      <WindupsLinebreaker width={width} fontStyle="1.2rem VT323">
        <WindupChildren skipped={skipped} onFinished={handleTypingFinished}>
          <OnChar
            fn={(char) => {
              if (char === ' ') return
              bottom.current?.scrollIntoView()
            }}
          >
            <Pace ms={props.pace ?? 151}>{props.children}</Pace>
          </OnChar>
        </WindupChildren>
      </WindupsLinebreaker>
      <span ref={bottom} />
    </a.div>
  )
}
