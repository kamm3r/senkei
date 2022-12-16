import { Rad2Deg } from "./utils/constants"
import * as math from "./utils/clamp"
import { Lerp } from "./utils/interpolation"
import type { uvec3 } from "./types"

// Uint32Array
export const create = (x = 0, y = 0, z = 0): uvec3 => new Uint32Array([x, y, z])

export const back = (): uvec3 => create(0, 0, -1)
export const down = (): uvec3 => create(0, -1, 0)
export const forward = (): uvec3 => create(0, 0, 1)
export const left = (): uvec3 => create(-1, 0, 0)
export const right = (): uvec3 => create(1, 0, 0)
export const up = (): uvec3 => create(0, 1, 0)
export const one = (): uvec3 => create(1, 1, 1)
export const zero = (): uvec3 => create(0, 0, 0)
export const positiveInfinity = (): uvec3 => create(Infinity, Infinity, Infinity)

export const copy = (v1: uvec3, v2: uvec3): uvec3 => create(v1[0] = v2[0], v1[1] = v2[1], v1[2] = v2[2])
export const scalarAddition = (v: uvec3, k: number): uvec3 => create(v[0] + k, v[1] + k, v[2] + k)
export const scalarSubtraction = (v: uvec3, k: number): uvec3 => create(v[0] - k, v[1] - k, v[2] - k)
export const scalarMultiplication = (v: uvec3, k: number): uvec3 => create(v[0] * k, v[1] * k, v[2] * k)
export const scalarDivision = (v: uvec3, k: number): uvec3 => create(v[0] / k, v[1] / k, v[2] / k)
// d=a+b
export const add = (v1: uvec3, v2: uvec3): uvec3 => create(v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2])
// "From b to a" d=a-b
export const subtract = (v1: uvec3, v2: uvec3): uvec3 => create(v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2])
// d=a*b
export const multiply = (v1: uvec3, v2: uvec3): uvec3 => create(v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2])
// d=a/b
export const divide = (v1: uvec3, v2: uvec3): uvec3 => create(v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2])
// Dot Product of two vectors.
export const dot = (v1: uvec3, v2: uvec3): number => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
//	Cross Product of two vectors.
export const cross = (v1: uvec3, v2: uvec3): uvec3 => create((v1[1] * v2[2]) - (v1[2] * v2[1]), (v1[0] * v2[2]) - (v1[2] * v2[0]), (v1[0] * v2[1]) - (v1[1] * v2[0]))
// also know as exterior product
// create(0,0,0,v1[0] * v2[1] - v1[1] * v2[0])
export const wedge = (v1: uvec3, v2: uvec3): number => v1[0] * v2[1] - v1[1] * v2[0]

// Returns the length of this vector
export const magnitude = (v: uvec3): number => Math.sqrt(magnitudeSqrt(v))
//	Returns the squared length of this vector
export const magnitudeSqrt = (v: uvec3): number => v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
//	Returns a copy of vector with its magnitude clamped to maxLength.
export const clampMagnitude = (v: uvec3, maxLength: number): uvec3 => {
    const sqrtmag = magnitudeSqrt(v)
    if (sqrtmag > maxLength * maxLength) {
        const mag = Math.sqrt(sqrtmag)
        const normx = v[0] / mag
        const normy = v[1] / mag
        const normz = v[2] / mag
        return create(normx / maxLength, normy / maxLength, normz / maxLength)
    }
    return v
}
//Returns this vector with a magnitude of 1
export const normalized = (v: uvec3): uvec3 => create(v[0] / magnitude(v), v[1] / magnitude(v), v[2] / magnitude(v))

//Makes this vector have a magnitude of 1.
export const normalize = (v: uvec3): void => {
    create(v[0] / Math.abs(v[0]), v[1] / Math.abs(v[1]), v[2] / Math.abs(v[2]))
}

// when you want specific distance between a^ and b
export const scalarProjection = (v1: uvec3, v2: uvec3): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (out: uvec3, v1: uvec3, v2: uvec3): uvec3 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    out[0] = v1Norm[0] * scProj,
        out[1] = v1Norm[1] * scProj
    out[2] = v1Norm[2] * scProj
    return out
}
//Returns the distance between a and b.
export const distance = (v1: uvec3, v2: uvec3): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: uvec3, v2: uvec3): number => {
    const x = (v2[0] - v1[0])
    const y = (v2[1] - v1[1])
    const z = (v2[2] - v1[2])
    return x * x + y * y + z * z
}
//Linearly interpolates between two points.
export const lerp = (a: uvec3, b: uvec3, t: uvec3): uvec3 => create((Lerp(a[0], b[0], t[0]), Lerp(a[1], b[1], t[1]), Lerp(a[2], b[2], t[2])))
//Linearly interpolates between two vectors.
export const lerpUnclamped = (a: uvec3, b: uvec3, t: number): uvec3 => {
    return a
}
export const inverseLerp = () => { }
// Spherically interpolates between two vectors??points.
export const slerp = (a: uvec3, b: uvec3, t: number): uvec3 => {
    return a
}
//Spherically interpolates between two vectors.
export const slerpUnclamped = (a: uvec3, b: uvec3, t: number): uvec3 => {
    return a
}
//	Calculates the angle between vectors from and.
export const angle = (from: uvec3, to: uvec3): number => {
    const denominator = Math.sqrt(magnitudeSqrt(from) * magnitudeSqrt(to))
    const Dot = math.clamp(dot(from, to) / denominator, -1, 1)
    return Math.acos(Dot) * Rad2Deg
}
//Calculates the signed angle between vectors from and to in relation to axis.
export const signedAngle = (from: uvec3, to: uvec3, axis: uvec3): number => {
    return angle(from, to) * Math.sign(axis[0] * (from[1] * to[2] - from[2] * to[1]) + axis[1] * (from[2] * to[0] - from[0] * to[2]) + axis[2] * (from[0] * to[1] - from[1] * to[0]))
}
//	Multiplies two vectors component-wise.
/**
 * 
 * @param a vec
 * @param b vec
 * @returns 
 */
export const scale = (a: uvec3, b: uvec3): uvec3 => create(a[0] * b[0], a[1] * b[1], a[2] * b[2])

//Calculate a position between the points specified by current and target, moving no farther than the distance specified by maxDistanceDelta.
export const MoveTowards = () => { }
//Reflects a vector off the plane defined by a normal.
export const reflect = () => { }
// Rotates a vector current towards target.
export const rotateTowards = () => { }
// Projects a vector onto another vector.
export const Project = () => { }
//Projects a vector onto a plane defined by a normal orthogonal to the plane.
export const ProjectOnPlane = () => { }
//Gradually changes a vector towards a desired goal over time.
export const smoothDamp = () => { }
//Returns a vector that is made from the largest components of two vectors.
export const max = (lhs: uvec3, rhs: uvec3): uvec3 => create(Math.max(lhs[0], rhs[0]), Math.max(lhs[1], rhs[1]), Math.max(lhs[2], rhs[2]))
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: uvec3, rhs: uvec3): uvec3 => create(Math.min(lhs[0], rhs[0]), Math.min(lhs[1], rhs[1]), Math.min(lhs[2], rhs[2]))