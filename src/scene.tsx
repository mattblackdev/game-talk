import { ReactNode } from 'react'
import { getState, useSceneKey } from './store'
import { TypeWriter } from './typewriter'

function Start() {
  return (
    <TypeWriter
      onDone={() => {
        console.log('huh?')
        getState().transitionScene('end')
      }}
    >
      hello
    </TypeWriter>
  )
}

function End() {
  return <TypeWriter>Goodbye</TypeWriter>
}

const scenes: Record<string, ReactNode> = {
  start: <Start />,
  end: <End />,
}

export function Scene() {
  const sceneKey = useSceneKey()
  console.log(sceneKey)
  return scenes[sceneKey]
}
