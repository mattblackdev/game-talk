import { useAnimations, useGLTF } from '@react-three/drei'
import { CylinderCollider, quat, RigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { AnimationAction, Group, LoopOnce, Vector3 } from 'three'
import { create } from 'zustand'
import { Ground } from '../../coms/Ground'
import { EcctrlKnight } from '../../coms/Knight'
import { Sky } from '../../coms/Sky'
import { MinionModel } from '../../models/MinionModel'
import { Scenery } from '../06_Models'
import { Sauce } from './Sauce'
import { SwordDamageSensor } from './SwordDamageSensor'

export const useMinionStore = create(() => ({
  status: 'idle' as 'idle' | 'dying' | 'dead',
}))

export function Fight() {
  const minionRef = useRef<Group>(null)
  const { animations } = useGLTF('/models/minion.glb')
  const { actions } = useAnimations(animations, minionRef)
  const { status } = useMinionStore()

  console.log('status', status)

  useEffect(() => {
    let action: AnimationAction | null = null
    if (status === 'dead') {
      action = actions['Death_C_Pose']
      if (action) {
        action.clampWhenFinished = true
        action.reset().fadeIn(0.1).setLoop(LoopOnce, 0).play()
      }
    } else if (status === 'dying') {
      action = actions['Death_C_Skeletons']
      action?.reset().fadeIn(0.1).setLoop(LoopOnce, 0).play()
    } else {
      action = actions['Idle']
      action?.reset().play()
    }
    return () => {
      // Fade out previous action
      action?.fadeOut(0.1)
    }
  }, [status])

  return (
    <Sauce>
      <Sky />
      <Scenery />

      <EcctrlKnight>
        <SwordDamageSensor />
      </EcctrlKnight>

      <RigidBody name="Minion" position={[-5, 1, -5]}>
        <CylinderCollider
          args={[1, 1]}
          sensor={status === 'dead'}
          onIntersectionEnter={({ target: minion, other: sword }) => {
            if (sword.colliderObject?.name !== 'Sword') return

            // The sensor's initial "Forward" vector
            const attackVector = new Vector3(-1, 0, 0)
              // Rotated by it's current (the player's) rotation
              .applyQuaternion(quat(sword.collider.rotation()))
              .multiplyScalar(74) // Horizontal force
              .setY(33) // Upwards force

            minion.rigidBody?.applyImpulse(attackVector, true)

            // 300ms for normal physics
            setTimeout(() => {
              useMinionStore.setState({ status: 'dying' })
              // 700 for animation
              setTimeout(() => {
                useMinionStore.setState({ status: 'dead' })
              }, 700)
            }, 300)
          }}
        />
        <group ref={minionRef}>
          <MinionModel />
        </group>
      </RigidBody>

      <Ground />
    </Sauce>
  )
}
