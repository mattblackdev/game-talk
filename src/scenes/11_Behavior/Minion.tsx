import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import {
  CapsuleCollider,
  CollisionTarget,
  CylinderCollider,
  quat,
  RapierRigidBody,
  RigidBody,
  vec3,
} from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimationAction, Group, Vector3 } from 'three'
import {
  loopAction,
  playAction,
  randomRadialPosition,
  randomRange,
} from '../../app/utils'
import { MinionModel } from '../../models/MinionModel'

enum MinionStatus {
  Pacing = 'pacing',
  Roaming = 'roaming',
  Chasing = 'chasing',
  Dying = 'dying',
  Dead = 'dead',
  Idle = 'idle',
}

function getRandomBoredAtTime() {
  return randomRange(10, 20)
}

export function Minion() {
  const modelRef = useRef<Group>(null)
  const rbRef = useRef<RapierRigidBody>(null)
  const targetRef = useRef<CollisionTarget>(null)
  const moveTarget = useMemo(() => new Vector3(), [])
  const pacingAnchor = useMemo(() => new Vector3(), [])

  const clock = useThree((s) => s.clock)
  const idleTimerRef = useRef(clock.elapsedTime + getRandomBoredAtTime())

  const { animations } = useGLTF('/models/minion.glb')
  const { actions } = useAnimations(animations, modelRef)

  const [status, setStatus] = useState(MinionStatus.Idle)

  useEffect(() => {
    let action: AnimationAction | null | undefined

    if (status === MinionStatus.Dead) {
      action = playAction('Death_C_Pose', actions)
    } else if (status === MinionStatus.Dying) {
      action = playAction('Death_C_Skeletons', actions)
    } else if (status === MinionStatus.Pacing) {
      action = loopAction('Walking_A', actions)
    } else if (status === MinionStatus.Roaming) {
      action = playAction('Walking_A', actions)
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
    if (!rbRef.current) return
    if (status === MinionStatus.Chasing && targetRef.current?.rigidBody) {
      const targetPos = vec3(targetRef.current.rigidBody.translation())
      const minionPos = vec3(rbRef.current.translation())
      const moveVector = targetPos
        .sub(minionPos)
        .setY(0.2)
        .normalize()
        .multiplyScalar(60)

      rbRef.current.applyImpulse(moveVector, true)

      modelRef.current?.lookAt(targetPos)
    } else if (
      status === MinionStatus.Idle &&
      clock.elapsedTime > idleTimerRef.current
    ) {
      setStatus(MinionStatus.Pacing)

      const position = rbRef.current.translation()
      pacingAnchor.set(position.x, position.y, position.z)

      moveTarget.set(
        ...randomRadialPosition({
          innerRadius: 2,
          radius: 5,
          centerX: pacingAnchor.x,
          height: pacingAnchor.y,
          centerY: pacingAnchor.z,
        })
      )

      modelRef.current?.lookAt(moveTarget)
    } else if (status === MinionStatus.Pacing) {
      const position = rbRef.current.translation()
      const moveVector = moveTarget.sub(position)

      // TODO: Check if close to target and need new target

      moveVector.setY(0.2).normalize().multiplyScalar(60)

      rbRef.current.applyImpulse(moveVector, true)
    }
  })

  return (
    <RigidBody
      ref={rbRef}
      name="Minion"
      lockRotations
      lockTranslations={status === MinionStatus.Dead}
      position={[10, 1, -10]}
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
