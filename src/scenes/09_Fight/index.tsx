import { useAnimations, useGLTF } from '@react-three/drei'
import {
  CuboidCollider,
  CylinderCollider,
  quat,
  RigidBody,
} from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { AnimationAction, Group, Vector3 } from 'three'
import { create } from 'zustand'
import { loopAction, playAction } from '../../app/utils'
import { Ground } from '../../coms/Ground'
import { EcctrlKnight } from '../../coms/Knight'
import { Sky } from '../../coms/Sky'
import { MinionModel } from '../../models/MinionModel'
import { Scenery } from '../06_Models'
import { Sauce } from './Sauce'
import { useIsSwordDamaging } from './useIsSwordDamaging'

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
    let action: AnimationAction | null | undefined
    if (status === 'dead') {
      action = playAction('Death_C_Pose', actions)
    } else if (status === 'dying') {
      action = playAction('Death_C_Skeletons', actions)
    } else {
      action = loopAction('Idle', actions)
    }
    return () => {
      // Fade out previous action
      action?.fadeOut(0.1)
    }
  }, [status])

  // True 700ms after sword strike
  // begins, then false 100ms later.
  const isDamaging = useIsSwordDamaging()

  return (
    <Sauce>
      <Sky />
      <Scenery />

      <EcctrlKnight>
        {isDamaging ? (
          <CuboidCollider
            sensor
            name="Sword"
            args={[0.7, 0.1, 0.1]}
            position={[-0.6, 0.5, 1]}
            rotation={[0, Math.PI / 2 - 0.2, 0]}
          />
        ) : null}
      </EcctrlKnight>

      <RigidBody name="Minion" position={[-5, 1, -5]} rotation={[0, 1, 0]}>
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
