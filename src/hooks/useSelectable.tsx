import { MutableRefObject, useEffect } from 'react'
import { Group, Object3D } from 'three'
import { create } from 'zustand'
import { ObjectRef } from './useObjectRef'

type State = {
  selectables: ObjectRef[]
  selection: ObjectRef | null
  onSelectHandlers: Map<string, () => void>
  onFocusHandlers: Map<string, () => void>
  onBlurHandlers: Map<string, () => void>
  registerSelectable: (
    selectable: ObjectRef,
    onSelect: () => void,
    onFocus: () => void,
    onBlur: () => void,
  ) => () => void
  handleFocus: (selection: ObjectRef) => void
  handleSelect: (selection: ObjectRef) => void
  handleBlur: (selection: ObjectRef) => void
}

const useStore = create<State>((set, get) => ({
  selectables: [],
  onSelectHandlers: new Map(),
  onFocusHandlers: new Map(),
  onBlurHandlers: new Map(),
  registerSelectable(selectable, onSelect, onFocus, onBlur) {
    if (!selectable.current) return () => {}
    const key = selectable.current.uuid

    set(
      ({ selectables, onSelectHandlers, onFocusHandlers, onBlurHandlers }) => {
        onSelectHandlers.set(key, onSelect)
        onFocusHandlers.set(key, onFocus)
        onBlurHandlers.set(key, onBlur)
        const newSelectables = [...selectables, selectable]
        return {
          selectables: newSelectables,
          onSelectHandlers: onSelectHandlers,
          onFocusHandlers,
        }
      },
    )

    return () =>
      set(
        ({
          selectables,
          onSelectHandlers,
          onFocusHandlers,
          onBlurHandlers,
        }) => {
          onSelectHandlers.delete(key)
          onFocusHandlers.delete(key)
          onBlurHandlers.delete(key)
          return {
            selectables: selectables.filter((s) => s !== selectable),
            onSelectHandlers,
            onFocusHandlers,
            onBlurHandlers,
          }
        },
      )
  },

  selection: null,

  handleFocus: (_selection) => {
    const key = _selection.current?.uuid
    if (!key) return

    get().onFocusHandlers.get(key)?.()
    set({ selection: _selection })
  },

  handleSelect: (_selection) => {
    const key = _selection?.current?.uuid
    if (!key) return

    get().onSelectHandlers.get(key)?.()
  },

  handleBlur: (_selection) => {
    const key = _selection.current?.uuid
    if (!key) return

    get().onBlurHandlers.get(key)?.()
    set({ selection: null })
  },
}))

export function clearSelection() {
  const { selection, handleBlur } = useStore.getState()
  if (!selection) return
  handleBlur(selection)
}

export function useSelectable({
  ref,
  onSelect,
  onFocus,
  onBlur,
}: {
  ref: ObjectRef
  onSelect: () => void
  onFocus: () => void
  onBlur: () => void
}) {
  const register = useStore((state) => state.registerSelectable)
  useEffect(
    () => register(ref, onSelect, onFocus, onBlur),
    [ref, register, onSelect, onFocus, onBlur],
  )
}

export type SelectableConfig = {
  onSelect(): void
  onFocus(): void
  onBlur(): void
}
export type Selectables = Record<string, SelectableConfig>

export function useSelectables(
  selectables: Selectables,
  modelRef: MutableRefObject<Group>,
) {
  useEffect(() => {
    const unsubs = Object.keys(selectables).map((name) => {
      const obj = modelRef.current.getObjectByName(name)
      if (!obj) {
        throw new Error(`Expected ${name} within model`)
      }

      const { onSelect, onFocus, onBlur } = selectables[name]
      return registerSelectable({
        selectableObject: obj,
        onSelect,
        onFocus,
        onBlur,
      })
    })

    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [])
}

export function registerSelectable({
  selectableObject,
  onSelect,
  onFocus,
  onBlur,
}: {
  selectableObject: Object3D
  onSelect: () => void
  onFocus: () => void
  onBlur: () => void
}) {
  return useStore
    .getState()
    .registerSelectable(
      { current: selectableObject },
      onSelect,
      onFocus,
      onBlur,
    )
}
