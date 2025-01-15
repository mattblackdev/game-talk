import { RapierRigidBody } from '@react-three/rapier'
import { ForwardedRef, MutableRefObject, useRef } from 'react'
import { Group, Mesh, Object3D } from 'three'

export type ObjectRef = React.MutableRefObject<Object3D>
export type GroupRef = React.MutableRefObject<Group>
export type RigidBodyRef = React.MutableRefObject<RapierRigidBody>

const noop = new Object3D()
noop.name = 'noop'
const goop = new Group()
goop.name = 'goop'
const moop = new Mesh()
moop.name = 'moop'

export function useObjectRef() {
  return useRef<Object3D>(noop)
}

export function useGroupRef() {
  return useRef<Group>(goop)
}

export function useMeshRef() {
  return useRef<Mesh>(moop)
}

export function useNullObjectRef() {
  return useRef<Object3D | null>(null)
}

export function useObjectArrayRef() {
  return useRef<Object3D[]>([])
}

export function useForwardedObjectRef(forwardedRef: ForwardedRef<Object3D>) {
  const _ref = useObjectRef()
  return (forwardedRef ?? _ref) as MutableRefObject<Object3D>
}

export function useForwardedGroupRef(forwardedRef: ForwardedRef<Group>) {
  const _ref = useObjectRef()
  return (forwardedRef ?? _ref) as MutableRefObject<Group>
}

export function useRigidBodyRef() {
  return useRef<RapierRigidBody>(null)
}
