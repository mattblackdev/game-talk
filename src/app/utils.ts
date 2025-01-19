import { Euler, Quaternion, Vector3, Vector3Tuple, Vector4 } from 'three'
import { colors0x } from './colors'
import { generateUUID } from 'three/src/math/MathUtils.js'

export function addXYZ([x1, y1, z1]: Vector3Tuple, [x2, y2, z2]: Vector3Tuple) {
  return [x1 + x2, y1 + y2, z1 + z2] as Vector3Tuple
}

export function randomElement<T = unknown>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)]
}

export function randomIndex<T = unknown>(list: T[]) {
  return Math.floor(Math.random() * list.length)
}

export function randomNumber(max = 1) {
  return Math.random() * max
}

export function randomRange(min = 0, max = 1) {
  return min + Math.random() * (max - min)
}

export function times<T = unknown>(count: number, mapFn: (index: number) => T) {
  return Array.from<unknown, T>({ length: count }, (v, k) => mapFn(k))
}

export function formatXYZ(v: Vector3 | Euler) {
  return [v.x, v.y, v.z].map((p) => p.toFixed(2)).join(', ')
}

export function formatXYZW(
  v: Vector4 | Quaternion | { x: number; y: number; z: number; w: number }
) {
  return [v.x, v.y, v.z, v.w].map((p) => p.toFixed(2)).join(', ')
}

export function randomColor() {
  return randomElement([
    colors0x.Red,
    colors0x.Orange,
    colors0x.Yellow,
    colors0x.Cyan,
    colors0x.Purple,
    colors0x.Pink,
  ])
}

export function randomRadialPosition({
  radius = 1,
  height = 0,
  centerX = 0,
  centerY = 0,
  centerZ = 0,
  innerRadius = 0,
}) {
  const r = innerRadius
    ? Math.sqrt(
        innerRadius * innerRadius +
          Math.random() * (radius * radius - innerRadius * innerRadius)
      )
    : radius * Math.sqrt(Math.random())
  const theta = Math.random() * 2 * Math.PI
  return [
    r * Math.cos(theta) + centerX,
    randomRange(-height / 2, height / 2) + centerY,
    r * Math.sin(theta) + centerZ,
  ] as Vector3Tuple
}

export function randomScale(min = 0, max = 1) {
  const n = randomRange(min, max)
  return [n, n, n] as Vector3Tuple
}

export function uniqueId() {
  return generateUUID()
}
