import type { vec2, vec3, vec4 } from "./types"
import { Infinity, NegativeInfinity } from "./utils/floatingPoints"
import { Lerp } from "./utils/interpolation"
import * as math from "./utils/abs"

// export const create = (x = 0, y = 0, z = 0, w = 0): vec4 => {
//     return { x, y, z, w }
// }
export const create = (x = 0, y = 0, z = 0, w = 0): vec4 => new Float32Array([x, y, z, w])
export const one = (): vec4 => create(1, 1, 1, 1)
export const zero = (): vec4 => create(0, 0, 0, 0)
export const negativeInfinity = (): vec4 => create(NegativeInfinity, NegativeInfinity, NegativeInfinity, NegativeInfinity)
export const positiveInfinity = (): vec4 => create(Infinity, Infinity, Infinity, Infinity)

export const scalarAddition = (v: vec4, k: number): vec4 => create(v[0] + k, v[1] + k, v[2] + k, v[3] + k)
export const scalarSubtraction = (v: vec4, k: number): vec4 => create(v[0] - k, v[1] - k, v[2] - k, v[3] - k)
export const scalarMultiplication = (v: vec4, k: number): vec4 => create(v[0] * k, v[1] * k, v[2] * k, v[3] * k)
export const scalarDivision = (v: vec4, k: number): vec4 => create(v[0] / k, v[1] / k, v[2] / k, v[3] / k)
export const add = (v1: vec4, v2: vec4): vec4 => create(v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2], v1[3] + v2[3])
export const subtract = (v1: vec4, v2: vec4): vec4 => create(v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2], v1[3] - v2[3])
export const multiply = (v1: vec4, v2: vec4): vec4 => create(v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2], v1[3] * v2[3])
export const divide = (v1: vec4, v2: vec4): vec4 => create(v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2], v1[3] / v2[3])
export const tovec2 = (v: vec4): vec2 => create(v[0], v[1])
export const tovec3 = (v: vec4): vec3 => create(v[0], v[1], v[2])
export const vec3tovec4 = (v: vec3): vec4 => create(v[0], v[1], v[2], 0)
export const vec2tovec4 = (v: vec2): vec4 => create(v[0], v[1], 0, 0)
export const dot = (v1: vec4, v2: vec4): number => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2] + v1[3] * v2[3]
export const clamp = (v: vec4, min: vec4, max: vec4): vec4 => create(v[0] < min[0] ? min[0] : v[0] > max[0] ? max[0] : v[0], v[1] < min[1] ? min[1] : v[1] > max[1] ? max[1] : v[1], v[2] < min[2] ? min[2] : v[2] > max[2] ? max[2] : v[2], v[3] < min[3] ? min[3] : v[3] > max[3] ? max[3] : v[3])
export const clamp01 = (v: vec4): vec4 => create(v[0] < 0 ? 0 : v[0] > 1 ? 1 : v[0], v[1] < 0 ? 0 : v[1] > 1 ? 1 : v[1], v[2] < 0 ? 0 : v[2] > 1 ? 1 : v[2], v[3] < 0 ? 0 : v[3] > 1 ? 1 : v[3])
export const clampNeg1to1 = (v: vec4): vec4 => create(v[0] < -1 ? -1 : v[0] > 1 ? 1 : v[0], v[1] < -1 ? -1 : v[1] > 1 ? 1 : v[1], v[2] < -1 ? -1 : v[2] > 1 ? 1 : v[2], v[3] < -1 ? -1 : v[3] > 1 ? 1 : v[3])
// Returns the absolute value, per component. Basically makes negative numbers positive
export const Abs = (v: vec4): vec4 => create(math.Abs(v[0]), math.Abs(v[1]), math.Abs(v[2]), math.Abs(v[3]));
export const magnitude = (v: vec4): number => Math.sqrt(magnitudeSqrt(v))
export const magnitudeSqrt = (v: vec4): number => v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]

export const normalized = (v: vec4): vec4 => {
    const mag = magnitude(v)
    return create(v[0] / mag, v[1] / mag, v[2] / mag, v[3] / mag)
}
// export const normalize = (v: vec4): vec4 => {
//     const mag = magnitude(v)
//     if (mag > 0.00001) {
//         return { x: v[0] / mag, y: v[1] / mag, z: v[2] / mag, w: v[3] / mag }
//     } else {
//         return zero()
//     }
// }
export const normalize = (out: vec4, v: vec4): vec4 => {
    const mag = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3])
    if (mag > 0.00001) {
        out[0] = v[0] / mag
        out[1] = v[1] / mag
        out[2] = v[2] / mag
        out[3] = v[3] / mag
        return out
    } else {
        return zero()
    }
}
export const distance = (v1: vec4, v2: vec4): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: vec4, v2: vec4): number => {
    const x = (v2[0] - v1[0])
    const y = (v2[1] - v1[1])
    const z = (v2[2] - v1[2])
    const w = (v2[3] - v1[3])
    return x * x + y * y + z * z + w * w
}
export const lerp = (a: vec4, b: vec4, t: vec4): vec4 => create(Lerp(a[0], b[0], t[0]), Lerp(a[1], b[1], t[1]), Lerp(a[2], b[2], t[2]), Lerp(a[3], b[3], t[3]))
export const lerpUnclamped = (a: vec4, b: vec4, t: number): vec4 => create(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t)
export const inverseLerp = (a: vec4, b: vec4, v: vec4): vec4 => create((v[0] - a[0]) / (b[0] - a[0]), (v[1] - a[1]) / (b[1] - a[1]), (v[2] - a[2]) / (b[2] - a[2]), (v[3] - a[3]) / (b[3] - a[3]))
export const MoveTowards = (current: vec4, target: vec4, maxDistanceDelta: number): vec4 => {
    const vx = target[0] - current[0];
    const vy = target[1] - current[1];
    const vz = target[2] - current[2];
    const vw = target[3] - current[3];

    const sqrtDist = vx * vx + vy * vy + vz * vz + vw * vw;
    if (sqrtDist === 0 || (maxDistanceDelta >= 0 && sqrtDist <= maxDistanceDelta * maxDistanceDelta)) target
    const dist = Math.sqrt(sqrtDist)
    return create(current[0] + vx / dist * maxDistanceDelta, current[1] + vy / dist * maxDistanceDelta, current[2] + vz / dist * maxDistanceDelta, current[3] + vw / dist * maxDistanceDelta)
}
//	Multiplies two vectors component-wise.
export const scale = (a: vec4, b: vec4): vec4 => create(a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3])
// Projects a vector onto another vector.
export const Project = (a: vec4, b: vec4): vec4 => create(b[0] * (dot(a, b) / dot(a, b)), b[1] * (dot(a, b) / dot(a, b)), b[2] * (dot(a, b) / dot(a, b)), b[3] * (dot(a, b) / dot(a, b)))
//Returns a vector that is made from the largest components of two vectors.
export const max = (lhs: vec4, rhs: vec4): vec4 => create(Math.max(lhs[0], rhs[0]), Math.max(lhs[1], rhs[1]), Math.max(lhs[2], rhs[2]), Math.max(lhs[3], rhs[3]))
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: vec4, rhs: vec4): vec4 => create(Math.min(lhs[0], rhs[0]), Math.min(lhs[1], rhs[1]), Math.min(lhs[2], rhs[2]), Math.min(lhs[3], rhs[3]))