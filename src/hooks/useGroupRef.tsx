import { useRef } from 'react'
import { Group, Object3DEventMap } from 'three'

const goop = new Group()
goop.name = 'goop'

export type GroupRef = React.MutableRefObject<Group<Object3DEventMap>>
export function useGroupRef(): GroupRef {
  return useRef<Group>(goop)
}
