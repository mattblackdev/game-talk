import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
  CapsuleCollider,
  CollisionTarget,
  CylinderCollider,
  quat,
  RapierRigidBody,
  RigidBody,
  vec3,
} from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { AnimationAction, Group, Vector3 } from 'three'
import { loopAction, playAction } from '../../app/utils'
import { Ground } from '../../coms/Ground'
import { EcctrlKnight } from '../../coms/Knight'
import { Sky } from '../../coms/Sky'
import { MinionModel } from '../../models/MinionModel'
import { Scenery } from '../06_Models'
import { Sauce } from './Sauce'
import { SwordSensor } from './SwordSensor'

export function Flight() {
  return (
    <Sauce>
      <Sky />
      <Scenery />
      <EcctrlKnight>
        <SwordSensor />
      </EcctrlKnight>
      <Minion />
      <Ground />
    </Sauce>
  )
}

enum MinionStatus {
  Chasing = 'chasing',
  Dying = 'dying',
  Dead = 'dead',
  Idle = 'idle',
}

function Minion() {
  const modelRef = useRef<Group>(null)
  const rbRef = useRef<RapierRigidBody>(null)
  const targetRef = useRef<CollisionTarget>(null)

  const { animations } = useGLTF('/models/minion.glb')
  const { actions } = useAnimations(animations, modelRef)

  const [status, setStatus] = useState(MinionStatus.Idle)

  useEffect(() => {
    let action: AnimationAction | null | undefined
    if (status === MinionStatus.Dead) {
      action = playAction('Death_C_Pose', actions)
    } else if (status === MinionStatus.Dying) {
      action = playAction('Death_C_Skeletons', actions)
    } else if (status === MinionStatus.Chasing) {
      action = loopAction('Walking_A', actions)
    } else {
      action = loopAction('Idle', actions)
    }
    return () => {
      action?.fadeOut(0.1)
    }
  }, [status])

  useFrame(() => {
    if (
      status === MinionStatus.Chasing &&
      targetRef.current?.rigidBody &&
      rbRef.current
    ) {
      const targetPos = vec3(targetRef.current.rigidBody.translation())
      const minionPos = vec3(rbRef.current.translation())
      const moveVector = targetPos
        .sub(minionPos)
        .setY(0.2)
        .normalize()
        .multiplyScalar(60)

      rbRef.current.applyImpulse(moveVector, true)

      modelRef.current?.lookAt(targetPos)
    }
  })

  return (
    <RigidBody
      ref={rbRef}
      name="Minion"
      lockRotations
      lockTranslations={status === MinionStatus.Dead}
      position={[7, 1, -7]}
      rotation={[0, -1, 0]}
    >
      <CapsuleCollider
        args={[0.3, 0.7]}
        sensor={status === MinionStatus.Dead}
        onIntersectionEnter={({ target: minion, other: sword }) => {
          if (
            status === MinionStatus.Dead ||
            status === MinionStatus.Dying ||
            sword.colliderObject?.name !== 'Sword'
          ) {
            return
          }

          const attackVector = new Vector3(-1, 0, 0)
            .applyQuaternion(quat(sword.collider.rotation()))
            .multiplyScalar(4444) // Horizontal force
            .setY(333) // Upwards force

          // @ts-ignore
          targetRef.current = null

          minion.rigidBody?.applyImpulse(attackVector, true)

          setTimeout(() => {
            setStatus(MinionStatus.Dying)
            setTimeout(() => {
              setStatus(MinionStatus.Dead)
            }, 500)
          }, 300)
        }}
      />

      <CylinderCollider
        sensor
        args={[1, 10]}
        onIntersectionEnter={({ other }) => {
          if (
            status === MinionStatus.Idle &&
            other.colliderObject?.name === 'character-capsule-collider'
          ) {
            // @ts-ignore
            targetRef.current = other
            setStatus(MinionStatus.Chasing)
          }
        }}
        onIntersectionExit={({ other }) => {
          if (
            status === MinionStatus.Chasing &&
            other.colliderObject?.name === 'character-capsule-collider'
          ) {
            // @ts-ignore
            targetRef.current = null
            setStatus(MinionStatus.Idle)
          }
        }}
      />
      <group ref={modelRef}>
        <MinionModel />
      </group>
    </RigidBody>
  )
}
