import { Rad2Deg } from "./utils/constants"
import { NegativeInfinity } from "./utils/floatingPoints"
import * as math from "./utils/clamp"
import { Lerp } from "./utils/interpolation"

type u32 = Uint32Array

type vec<T> = T

// Uint32Array
export const _new = (x = 0, y = 0, z = 0): vec<u32> => new Uint32Array([x, y, z])

export const back = (): vec<u32> => _new(0, 0, -1)
export const down = (): vec<u32> => _new(0, -1, 0)
export const forward = (): vec<u32> => _new(0, 0, 1)
export const left = (): vec<u32> => _new(-1, 0, 0)
export const right = (): vec<u32> => _new(1, 0, 0)
export const up = (): vec<u32> => _new(0, 1, 0)
export const one = (): vec<u32> => _new(1, 1, 1)
export const zero = (): vec<u32> => _new(0, 0, 0)
export const negativeInfinity = (): vec<u32> => _new(NegativeInfinity, NegativeInfinity, NegativeInfinity)
export const positiveInfinity = (): vec<u32> => _new(Infinity, Infinity, Infinity)

export const copy = (out: vec<u32>, v: vec<u32>): vec<u32> => {
    out[0] = v[0]
    out[1] = v[1]
    out[2] = v[2]
    return out
}
export const scalarAddition = (v: vec<u32>, k: number): vec<u32> => _new(v[0] + k, v[1] + k, v[2] + k)
export const scalarSubtraction = (v: vec<u32>, k: number): vec<u32> => _new(v[0] - k, v[1] - k, v[2] - k)
export const scalarMultiplication = (v: vec<u32>, k: number): vec<u32> => _new(v[0] * k, v[1] * k, v[2] * k)
export const scalarDivision = (v: vec<u32>, k: number): vec<u32> => _new(v[0] / k, v[1] / k, v[2] / k)
// d=a+b
export const add = (v1: vec<u32>, v2: vec<u32>): vec<u32> => _new(v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2])
// "From b to a" d=a-b
export const subtract = (v1: vec<u32>, v2: vec<u32>): vec<u32> => _new(v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2])
// d=a*b
export const multiply = (v1: vec<u32>, v2: vec<u32>): vec<u32> => _new(v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2])
// d=a/b
export const divide = (v1: vec<u32>, v2: vec<u32>): vec<u32> => _new(v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2])
// Dot Product of two vectors.
export const dot = (v1: vec<u32>, v2: vec<u32>): number => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
//	Cross Product of two vectors.
export const cross = (v1: vec<u32>, v2: vec<u32>): vec<u32> => _new((v1[1] * v2[2]) - (v1[2] * v2[1]), (v1[0] * v2[2]) - (v1[2] * v2[0]), (v1[0] * v2[1]) - (v1[1] * v2[0]))
// also know as exterior product
// _new(0,0,0,v1[0] * v2[1] - v1[1] * v2[0])
export const wedge = (v1: vec<u32>, v2: vec<u32>): number => v1[0] * v2[1] - v1[1] * v2[0]

// Returns the length of this vector
export const magnitude = (v: vec<u32>): number => Math.sqrt(magnitudeSqrt(v))
//	Returns the squared length of this vector
export const magnitudeSqrt = (v: vec<u32>): number => v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
//	Returns a copy of vector with its magnitude clamped to maxLength.
export const clampMagnitude = (v: vec<u32>, maxLength: number): vec<u32> => {
    const sqrtmag = magnitudeSqrt(v)
    if (sqrtmag > maxLength * maxLength) {
        const mag = Math.sqrt(sqrtmag)
        const normx = v[0] / mag
        const normy = v[1] / mag
        const normz = v[2] / mag
        return _new(normx / maxLength, normy / maxLength, normz / maxLength)
    }
    return v
}
//Returns this vector with a magnitude of 1
export const normalized = (v: vec<u32>): vec<u32> => _new(v[0] / magnitude(v), v[1] / magnitude(v), v[2] / magnitude(v))

//Makes this vector have a magnitude of 1.
export const normalize = (v: vec<u32>): void => {
    _new(v[0] / Math.abs(v[0]), v[1] / Math.abs(v[1]), v[2] / Math.abs(v[2]))
}

// when you want specific distance between a^ and b
export const scalarProjection = (v1: vec<u32>, v2: vec<u32>): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (out: vec<u32>, v1: vec<u32>, v2: vec<u32>): vec<u32> => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    out[0] = v1Norm[0] * scProj,
        out[1] = v1Norm[1] * scProj
    out[2] = v1Norm[2] * scProj
    return out
}
// supposendly or how i understood it, what unit vectors are
export const unitVector = (v: vec<u32>): vec<u32> => {
    return normalized(v)
}
//Returns the distance between a and b.
export const distance = (v1: vec<u32>, v2: vec<u32>): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: vec<u32>, v2: vec<u32>): number => {
    const x = (v2[0] - v1[0])
    const y = (v2[1] - v1[1])
    const z = (v2[2] - v1[2])
    return x * x + y * y + z * z
}
//Linearly interpolates between two points.
export const lerp = (a: vec<u32>, b: vec<u32>, t: vec<u32>): vec<u32> => _new((Lerp(a[0], b[0], t[0]), Lerp(a[1], b[1], t[1]), Lerp(a[2], b[2], t[2])))
//Linearly interpolates between two vectors.
export const lerpUnclamped = (a: vec<u32>, b: vec<u32>, t: number): vec<u32> => {
    return a
}
export const inverseLerp = () => { }
// Spherically interpolates between two vectors??points.
export const slerp = (a: vec<u32>, b: vec<u32>, t: number): vec<u32> => {
    return a
}
//Spherically interpolates between two vectors.
export const slerpUnclamped = (a: vec<u32>, b: vec<u32>, t: number): vec<u32> => {
    return a
}
//	Calculates the angle between vectors from and.
export const angle = (from: vec<u32>, to: vec<u32>): number => {
    const denominator = Math.sqrt(magnitudeSqrt(from) * magnitudeSqrt(to))
    const Dot = math.clamp(dot(from, to) / denominator, -1, 1)
    return Math.acos(Dot) * Rad2Deg
}
//Calculates the signed angle between vectors from and to in relation to axis.
export const signedAngle = (from: vec<u32>, to: vec<u32>, axis: vec<u32>): number => {
    return angle(from, to) * Math.sign(axis[0] * (from[1] * to[2] - from[2] * to[1]) + axis[1] * (from[2] * to[0] - from[0] * to[2]) + axis[2] * (from[0] * to[1] - from[1] * to[0]))
}
//	Multiplies two vectors component-wise.
/**
 * 
 * @param a vec
 * @param b vec
 * @returns 
 */
export const scale = (a: vec<u32>, b: vec<u32>): vec<u32> => _new(a[0] * b[0], a[1] * b[1], a[2] * b[2])

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
export const max = (lhs: vec<u32>, rhs: vec<u32>): vec<u32> => _new(Math.max(lhs[0], rhs[0]), Math.max(lhs[1], rhs[1]), Math.max(lhs[2], rhs[2]))
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: vec<u32>, rhs: vec<u32>): vec<u32> => _new(Math.min(lhs[0], rhs[0]), Math.min(lhs[1], rhs[1]), Math.min(lhs[2], rhs[2]))