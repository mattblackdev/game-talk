import { createContext, ReactNode, useContext } from 'react'

const TriplexContext = createContext({ isEditing: false })

export interface TriplexContextProviderProps {
  children: ReactNode
  isEditing: boolean
}
export function TriplexContextProvider({
  children,
  ...value
}: TriplexContextProviderProps) {
  return <TriplexContext.Provider value={value} children={children} />
}

export function useIsTriplexEditing() {
  return useContext(TriplexContext).isEditing
}
