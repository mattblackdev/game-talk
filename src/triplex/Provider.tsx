import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { TriplexContextProvider } from './Context'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <TriplexContextProvider isEditing>
        <Physics paused>{children}</Physics>
      </TriplexContextProvider>
    </Suspense>
  )
}
