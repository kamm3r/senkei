import type { Vec2, Vec3, Vec4 } from "./types"
import { clamp01 } from "./utils/clamp"
import { Infinity, NegativeInfinity } from "./utils/floatingPoints"

type vec4 = Float32Array
type vec4s = [number, number, number, number]

export const create = (x = 0, y = 0, z = 0, w = 0): Vec4 => {
    return { x, y, z, w }
}
// export const creates = (x = 0, y = 0, z = 0, w = 0): vec4 => {
export const creates = (x = 0, y = 0, z = 0, w = 0): vec4 => {
    const v = new Float32Array(4)
    v[0] = x
    v[1] = y
    v[2] = z
    v[3] = w
    return v
}
export const one = (): vec4 => new Float32Array([1, 1, 1, 1])
export const zero = (): vec4 => new Float32Array([0, 0, 0, 0])
export const negativeInfinity = (): vec4 => new Float32Array([NegativeInfinity, NegativeInfinity, NegativeInfinity, NegativeInfinity])
export const positiveInfinity = (): vec4 => new Float32Array([Infinity, Infinity, Infinity, Infinity])
// export const one = (): Vec4 => ({ x: 1, y: 1, z: 1, w: 1 })
// export const zero = (): Vec4 => ({ x: 0, y: 0, z: 0, w: 0 })
// export const negativeInfinity = (): Vec4 => ({ x: NegativeInfinity, y: NegativeInfinity, z: NegativeInfinity, w: NegativeInfinity })
// export const positiveInfinity = (): Vec4 => ({ x: Infinity, y: Infinity, z: Infinity, w: Infinity })

export const scalarAddition = (v: Vec4, k: number): Vec4 => {
    return { x: v.x + k, y: v.y + k, z: v.z + k, w: v.w + k }
}
export const scalarSubtraction = (v: Vec4, k: number): Vec4 => {
    return { x: v.x - k, y: v.y - k, z: v.z - k, w: v.w - k }
}
export const scalarMultiplication = (v: Vec4, k: number): Vec4 => {
    return { x: v.x * k, y: v.y * k, z: v.z * k, w: v.w * k }
}
export const scalarDivision = (v: Vec4, k: number): Vec4 => {
    return { x: v.x / k, y: v.y / k, z: v.z / k, w: v.w / k }
}
export const add = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z, w: v1.w + v2.w }
}
export const subtract = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z, w: v1.w - v2.w }
}
export const multiply = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z, w: v1.w * v2.w }
}
export const divide = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x / v2.x, y: v1.y / v2.y, z: v1.z / v2.z, w: v1.w / v2.w }
}
export const toVec2 = (v: Vec4): Vec2 => {
    return { x: v.x, y: v.y }
}
export const toVec3 = (v: Vec4): Vec3 => {
    return { x: v.x, y: v.y, z: v.z }
}
export const vec3toVec4 = (v: Vec3): Vec4 => {
    return { x: v.x, y: v.y, z: v.z, w: 0 }
}
export const vec2toVec4 = (v: Vec2): Vec4 => {
    return { x: v.x, y: v.y, z: 0, w: 0 }
}
export const dot = (v1: Vec4, v2: Vec4): number => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w
}

export const magnitude = (v: Vec4): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
export const magnitudeSqrt = (v: Vec4): number => {
    return v.x * v.x + v.y * v.y + v.z * v.z + v.w * v.w
}

export const normalized = (v: Vec4): Vec4 => {
    const vLen = magnitude(v)
    return { x: v.x / vLen, y: v.y / vLen, z: v.z / vLen, w: v.w / vLen }
}
// export const normalize = (v: Vec4): Vec4 => {
//     const mag = magnitude(v)
//     if (mag > 0.00001) {
//         return { x: v.x / mag, y: v.y / mag, z: v.z / mag, w: v.w / mag }
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
export const distance = (v1: Vec4, v2: Vec4): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: Vec4, v2: Vec4): number => {
    const x = (v2.x - v1.x)
    const y = (v2.y - v1.y)
    const z = (v2.z - v1.z)
    const w = (v2.w - v1.w)
    return x * x + y * y + z * z + w * w
}
export const lerp = (a: Vec4, b: Vec4, t: number): Vec4 => {
    t = clamp01(t)
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t, w: a.w + (b.w - a.w) * t }
}
export const lerpUnclamped = (a: Vec4, b: Vec4, t: number): Vec4 => {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t, w: a.w + (b.w - a.w) * t }
}
export const MoveTowards = (current: Vec4, target: Vec4, maxDistanceDelta: number): Vec4 => {
    const vx = target.x - current.x;
    const vy = target.y - current.y;
    const vz = target.z - current.z;
    const vw = target.w - current.w;

    const sqrtDist = vx * vx + vy * vy + vz * vz + vw * vw;
    if (sqrtDist === 0 || (maxDistanceDelta >= 0 && sqrtDist <= maxDistanceDelta * maxDistanceDelta)) target
    const dist = Math.sqrt(sqrtDist)
    return { x: current.x + vx / dist * maxDistanceDelta, y: current.y + vy / dist * maxDistanceDelta, z: current.z + vz / dist * maxDistanceDelta, w: current.w + vw / dist * maxDistanceDelta }
}
//	Multiplies two vectors component-wise.
export const scale = (a: Vec4, b: Vec4): Vec4 => {
    return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z, w: a.w * b.w }
}
// Projects a vector onto another vector.
export const Project = (a: Vec4, b: Vec4): Vec4 => {
    return { x: b.x * (dot(a, b) / dot(a, b)), y: b.y * (dot(a, b) / dot(a, b)), z: b.z * (dot(a, b) / dot(a, b)), w: b.w * (dot(a, b) / dot(a, b)) }
}
//Returns a vector that is made from the largest components of two vectors.
export const max = (lhs: Vec4, rhs: Vec4): Vec4 => {
    // maybe right need to think about it
    return { x: Math.max(lhs.x, rhs.x), y: Math.max(lhs.y, rhs.y), z: Math.max(lhs.z, rhs.z), w: Math.max(lhs.w, rhs.w) }
}
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: Vec4, rhs: Vec4): Vec4 => {
    // maybe right need to think about it
    return { x: Math.min(lhs.x, rhs.x), y: Math.min(lhs.y, rhs.y), z: Math.min(lhs.z, rhs.z), w: Math.min(lhs.w, rhs.w) }
}