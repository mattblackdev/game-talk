import { Canvas as R3fCanvas } from '@react-three/fiber'
import { ReactNode } from 'react'

// import { getProject } from '@theatre/core'
// import { editable as e, PerspectiveCamera, SheetProvider } from '@theatre/r3f'
// import extension from '@theatre/r3f/dist/extension'
// import studio from '@theatre/studio'
// import demoProjectState from '../cube.json'

// studio.initialize()
// studio.extend(extension)

// const demoSheet = getProject('Demo Project', {
//   state: demoProjectState,
// }).sheet('Demo Sheet')

// useEffect(() => {
//   demoSheet.project.ready.then(() =>
//     demoSheet.sequence.play({ iterationCount: Infinity }),
//   )
// }, [])

export function Canvas({ children }: { children: ReactNode }) {
  return (
    <R3fCanvas
      style={{ position: 'absolute' }}
      shadows
      camera={{
        fov: 75,
        position: [9, 2, 9],
        rotation: [0, Math.PI / 4, 0],
      }}
    >
      {children}
    </R3fCanvas>
  )
}
