import type { vec2, vec3, vec4 } from "./types"
import * as mathf from "./utils/"

export const create = (x = 0, y = 0, z = 0, w = 0): vec4 => new Float32Array([x, y, z, w])
/**
 * Shorthand for writing Vec4(0,0,0,0)
 */
export const zero = create(0, 0, 0, 0)
/**
 * Shorthand for writing Vec4(1,1,1,1)
 */
export const one = create(1, 1, 1, 1)
/**
 * Shorthand for writing Vector3(NegativeInfinity, NegativeInfinity, NegativeInfinity)
 */
export const negativeInfinity = create(mathf.NegativeInfinity, mathf.NegativeInfinity, mathf.NegativeInfinity, mathf.NegativeInfinity)
/**
 * Shorthand for writing Vector3(PositiveInfinity, PositiveInfinity, PositiveInfinity)
 */
export const positiveInfinity = create(mathf.Infinity, mathf.Infinity, mathf.Infinity, mathf.Infinity)
/**
 * Adds a vector by a number.
 */
export const scalarAddition = (v: vec4, k: number): vec4 => create(v[0] + k, v[1] + k, v[2] + k, v[3] + k)
/**
 * Subtracts a vector by a number.
 */
export const scalarSubtraction = (v: vec4, k: number): vec4 => create(v[0] - k, v[1] - k, v[2] - k, v[3] - k)
/**
 * Multiplies a vector by a number
 */
export const scalarMultiplication = (v: vec4, k: number): vec4 => create(v[0] * k, v[1] * k, v[2] * k, v[3] * k)
/**
 * Divides a vector by a number.
 */
export const scalarDivision = (v: vec4, k: number): vec4 => create(v[0] / k, v[1] / k, v[2] / k, v[3] / k)
/**
 * Adds two vectors.
 */
export const add = (v1: vec4, v2: vec4): vec4 => create(v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2], v1[3] + v2[3])
/**
 * Subtracts one vector from another.
 */
export const subtract = (v1: vec4, v2: vec4): vec4 => create(v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2], v1[3] - v2[3])
/**
 * Multiplies one vector from another.
 */
export const multiply = (v1: vec4, v2: vec4): vec4 => create(v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2], v1[3] * v2[3])
/**
 * Divides one vector from another.
 */
export const divide = (v1: vec4, v2: vec4): vec4 => create(v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2], v1[3] / v2[3])
/**
 * Negates a vector.
 */
export const negate = (a: vec4): vec4 => create(-a[0], -a[1], -a[2], -a[3])
/**
 * Converts a vec 4to vec2
 */
export const tovec2 = (v: vec4): vec2 => create(v[0], v[1])
/**
 * Converts a vec4 to vec3
 */
export const tovec3 = (v: vec4): vec3 => create(v[0], v[1], v[2])
/**
 * Converts a vec2 to vec4
 */
export const vec2tovec4 = (v: vec2): vec4 => create(v[0], v[1], 0, 0)
/**
 * Converts a vec3 to vec4
 */
export const vec3tovec4 = (v: vec3): vec4 => create(v[0], v[1], v[2], 0)
/**
 * Dot Product of two vectors.
 */
export const Dot = (v1: vec4, v2: vec4): number => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2] + v1[3] * v2[3]
/**
 * Clamps each component between min and max
 */
export const clamp = (v: vec4, min: vec4, max: vec4): vec4 => create(v[0] < min[0] ? min[0] : v[0] > max[0] ? max[0] : v[0], v[1] < min[1] ? min[1] : v[1] > max[1] ? max[1] : v[1], v[2] < min[2] ? min[2] : v[2] > max[2] ? max[2] : v[2], v[3] < min[3] ? min[3] : v[3] > max[3] ? max[3] : v[3])
/**
 * Clamps each component between 0 and 1
 */
export const clamp01 = (v: vec4): vec4 => create(v[0] < 0 ? 0 : v[0] > 1 ? 1 : v[0], v[1] < 0 ? 0 : v[1] > 1 ? 1 : v[1], v[2] < 0 ? 0 : v[2] > 1 ? 1 : v[2], v[3] < 0 ? 0 : v[3] > 1 ? 1 : v[3])
/**
 * Clamps the value between -1 and 1
 */
export const clampNeg1to1 = (v: vec4): vec4 => create(v[0] < -1 ? -1 : v[0] > 1 ? 1 : v[0], v[1] < -1 ? -1 : v[1] > 1 ? 1 : v[1], v[2] < -1 ? -1 : v[2] > 1 ? 1 : v[2], v[3] < -1 ? -1 : v[3] > 1 ? 1 : v[3])
/**
 * Returns the absolute value, per component. Basically makes negative numbers positive
 */
export const Abs = (v: vec4): vec4 => create(mathf.Abs(v[0]), mathf.Abs(v[1]), mathf.Abs(v[2]), mathf.Abs(v[3]));
/**
 * Returns the length of this vector
 */
export const Magnitude = (v: vec4): number => Math.sqrt(SqrMagnitude(v))
/**
 * Returns the squared length of this vector
 */
export const SqrMagnitude = (v: vec4): number => v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]

/**
 * some what pointless dup
 *  Returns this vector with a magnitude of 1.
 */
export const normalized = (v: vec4): vec4 => Normalize(v)
/**
 * Returns this vector with a magnitude of 1. 
 */
export const Normalize = (v: vec4): vec4 => Magnitude(v) > mathf.kEpsilon ? create(v[0] / Magnitude(v), v[1] / Magnitude(v), v[2] / Magnitude(v), v[3] / Magnitude(v)) : zero
/**
 * Returns the distance between /a/ and /b/.
*/
export const Distance = (a: vec4, b: vec4): number => Math.sqrt(SqrDistance(a, b))

export const SqrDistance = (v1: vec4, v2: vec4): number => {
    const x = (v2[0] - v1[0])
    const y = (v2[1] - v1[1])
    const z = (v2[2] - v1[2])
    const w = (v2[3] - v1[3])
    return x * x + y * y + z * z + w * w
}
export const Lerp = (a: vec4, b: vec4, t: number): vec4 => create(mathf.LerpClamped(a[0], b[0], t), mathf.LerpClamped(a[1], b[1], t), mathf.LerpClamped(a[2], b[2], t), mathf.LerpClamped(a[3], b[3], t))
export const Lerps = (a: vec4, b: vec4, t: vec4): vec4 => create(mathf.Lerp(a[0], b[0], t[0]), mathf.Lerp(a[1], b[1], t[1]), mathf.Lerp(a[2], b[2], t[2]), mathf.Lerp(a[3], b[3], t[3]))
export const LerpUnclamped = (a: vec4, b: vec4, t: number): vec4 => create(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t)
export const InverseLerp = (a: vec4, b: vec4, v: vec4): vec4 => create((v[0] - a[0]) / (b[0] - a[0]), (v[1] - a[1]) / (b[1] - a[1]), (v[2] - a[2]) / (b[2] - a[2]), (v[3] - a[3]) / (b[3] - a[3]))
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
/**
 * Multiplies two vectors component-wise.
 */
export const Scale = (a: vec4, b: vec4): vec4 => create(a[0] * b[0], a[1] * b[1], a[2] * b[2], a[3] * b[3])
/**
 * Projects a vector onto another vector.
 */
export const Project = (a: vec4, b: vec4): vec4 => create(b[0] * (Dot(a, b) / Dot(a, b)), b[1] * (Dot(a, b) / Dot(a, b)), b[2] * (Dot(a, b) / Dot(a, b)), b[3] * (Dot(a, b) / Dot(a, b)))
/**
 * Returns a vector that is made from the largest components of two vectors.
 */
export const Max = (lhs: vec4, rhs: vec4): vec4 => create(mathf.Max(lhs[0], rhs[0]), mathf.Max(lhs[1], rhs[1]), mathf.Max(lhs[2], rhs[2]), mathf.Max(lhs[3], rhs[3]))
/**
 * Returns a vector that is made from the smallest components of two vectors.
 */
export const Min = (lhs: vec4, rhs: vec4): vec4 => create(mathf.Min(lhs[0], rhs[0]), mathf.Min(lhs[1], rhs[1]), mathf.Min(lhs[2], rhs[2]), mathf.Min(lhs[3], rhs[3]))
