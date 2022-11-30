import { Vec } from "./utils/constants"
import { NegativeInfinity } from "./utils/floatingPoints"

type f32 = Float32Array

type vec<T> = T

// Float32Array
export const _new = (x = 0, y = 0, z = 0): vec<f32> => {
    const vec3 = new Vec(3)
    vec3[0] = x
    vec3[1] = y
    vec3[2] = z
    return vec3
}

export const back = (): vec<f32> => (new Vec([0, 0, -1]))
export const down = (): vec<f32> => (new Vec([0, -1, 0]))
export const forward = (): vec<f32> => (new Vec([0, 0, 1]))
export const left = (): vec<f32> => (new Vec([-1, 0, 0]))
export const right = (): vec<f32> => (new Vec([1, 0, 0]))
export const up = (): vec<f32> => (new Vec([0, 1, 0]))
export const one = (): vec<f32> => (new Vec([1, 1, 1]))
export const zero = (): vec<f32> => (new Vec([0, 0, 0]))
export const negativeInfinity = (): vec<f32> => (new Vec([NegativeInfinity, NegativeInfinity, NegativeInfinity]))
export const positiveInfinity = (): vec<f32> => (new Vec([Infinity, Infinity, Infinity]))

export const copy = (out: vec<f32>, v: vec<f32>): vec<f32> => {
    out[0] = v[0]
    out[1] = v[1]
    out[2] = v[2]
    return out
}
export const scalarAddition = (v: vec<f32>, k: number): vec<f32> => {
    v[0] + k
    v[1] + k
    v[2] + k
    return v
}
export const scalarSubtraction = (v: vec<f32>, k: number): vec<f32> => {
    v[0] - k
    v[1] - k
    v[2] - k
    return v
}
export const scalarMultiplication = (v: vec<f32>, k: number): vec<f32> => {
    v[0] * k
    v[1] * k
    v[2] * k
    return v
}
export const scalarDivision = (v: vec<f32>, k: number): vec<f32> => {
    v[0] / k
    v[1] / k
    v[2] / k
    return v
}
// d=a+b
export const add = (out: vec<f32>, v1: vec<f32>, v2: vec<f32>): vec<f32> => {
    out[0] = v1[0] + v2[0]
    out[1] = v1[1] + v2[1]
    out[2] = v1[2] + v2[2]
    return out
}
// "From b to a" d=a-b
export const subtract = (out: vec<f32>, v1: vec<f32>, v2: vec<f32>): vec<f32> => {
    out[0] = v1[0] - v2[0]
    out[1] = v1[1] - v2[1]
    out[2] = v1[2] - v2[2]
    return out
}
// d=a*b
export const multiply = (out: vec<f32>, v1: vec<f32>, v2: vec<f32>): vec<f32> => {
    out[0] = v1[0] * v2[0]
    out[1] = v1[1] * v2[1]
    out[2] = v1[2] * v2[2]
    return out
}
// d=a/b
export const divide = (out: vec<f32>, v1: vec<f32>, v2: vec<f32>): vec<f32> => {
    out[0] = v1[0] / v2[0]
    out[1] = v1[1] / v2[1]
    out[2] = v1[2] / v2[2]
    return out
}

// Dot Product of two vectors.
export const dot = (v1: vec<f32>, v2: vec<f32>): number => {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
}
//	Cross Product of two vectors.
export const cross = (out: vec<f32>, v1: vec<f32>, v2: vec<f32>): vec<f32> => {
    out[0] = (v1[1] * v2[2]) - (v1[2] * v2[1])
    out[1] = (v1[0] * v2[2]) - (v1[2] * v2[0])
    out[2] = (v1[0] * v2[1]) - (v1[1] * v2[0])
    return out
}
// also know as exterior product
export const wedge = (out: vec<f32>, v1: vec<f32>, v2: vec<f32>): vec<f32> => {
    const b = v1[0] * v2[1] - v1[1] * v2[0]
    out[3] = b
    return out
}
// Returns the length of this vector
export const magnitude = (v: vec<f32>): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
//	Returns the squared length of this vector
export const magnitudeSqrt = (v: vec<f32>): number => {
    return v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
}
//	Returns a copy of vector with its magnitude clamped to maxLength.
export const clampMagnitude = (v: vec<f32>, maxLength: number): vec<f32> => {
    return v
}
//Returns this vector with a magnitude of 1
export const normalized = (v: vec<f32>): vec<f32> => {
    const out = new Vec(3)
    const vLen = magnitude(v)
    out[0] = v[0] / vLen
    out[1] = v[1] / vLen,
        out[2] = v[2] / vLen
    return out
}
//Makes this vector have a magnitude of 1.
export const normalize = (v: vec<f32>): void => {
    const out = new Vec(3)
    out[0] = v[0] / Math.abs(v[0])
    out[1] = v[1] / Math.abs(v[1])
    out[2] = v[2] / Math.abs(v[2])
}

export const negate = (out: vec<f32>, v: vec<f32>): vec<f32> => {
    out[0] = -v[0]
    out[1] = - v[1]
    out[2] = - v[2]
    return out
}
// when you want specific distance between a^ and b
export const scalarProjection = (v1: vec<f32>, v2: vec<f32>): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (out: vec<f32>, v1: vec<f32>, v2: vec<f32>): vec<f32> => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    out[0] = v1Norm[0] * scProj,
        out[1] = v1Norm[1] * scProj
    out[2] = v1Norm[2] * scProj
    return out
}
// supposendly or how i understood it, what unit vectors are
export const unitVector = (v: vec<f32>): vec<f32> => {
    return normalized(v)
}
//Returns the distance between a and b.
export const distance = (v1: vec<f32>, v2: vec<f32>): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: vec<f32>, v2: vec<f32>): number => {
    const x = (v2[0] - v1[0])
    const y = (v2[1] - v1[1])
    const z = (v2[2] - v1[2])
    return x * x + y * y + z * z
}
//Linearly interpolates between two points.
export const lerp = (out: vec<f32>, a: vec<f32>, b: vec<f32>, t: number): vec<f32> => {
    out[0] = a[0] + t * (b[0] - a[0])
    out[1] = a[1] + t * (b[1] - a[1])
    out[2] = a[2] + t * (b[2] - a[2])
    return out
}
//Linearly interpolates between two vectors.
export const lerpUnclamped = (a: vec<f32>, b: vec<f32>, t: number): vec<f32> => {
    return a
}
export const inverseLerp = () => { }
// Spherically interpolates between two vectors??points.
export const slerp = (a: vec<f32>, b: vec<f32>, t: number): vec<f32> => {
    return a
}
//Spherically interpolates between two vectors.
export const slerpUnclamped = (a: vec<f32>, b: vec<f32>, t: number): vec<f32> => {
    return a
}
//	Calculates the angle between vectors from and.
export const angle = (from: vec<f32>, to: vec<f32>): number => {
    const mag = Math.sqrt((from[0] * from[0] + from[1] * from[1] + from[2] * from[2]) * (to[0] * to[0] + to[1] * to[1] + to[2] * to[2]))
    const cosine = mag && dot(from, to) / mag
    return Math.acos(Math.min(Math.max(cosine, -1), 1))
}
//Calculates the signed angle between vectors from and to in relation to axis.
export const signedAngle = (from: vec<f32>, to: vec<f32>, axis: vec<f32>): number => {
    return 2
}
//	Multiplies two vectors component-wise.
/**
 * 
 * @param out same as a vec
 * @param a vec
 * @param b vec
 * @returns 
 */
export const scale = (out: vec<f32>, a: vec<f32>, b: vec<f32>): vec<f32> => {
    out[0] = a[0] * b[0]
    out[1] = a[1] * b[1]
    out[2] = a[2] * b[2]
    return out
}
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
export const max = (out: vec<f32>, lhs: vec<f32>, rhs: vec<f32>): vec<f32> => {
    // maybe right need to think about it
    out[0] = Math.max(lhs[0], rhs[0])
    out[1] = Math.max(lhs[1], rhs[1])
    out[2] = Math.max(lhs[2], rhs[2])
    return out
}
//Returns a vector that is made from the smallest components of two vectors.
export const min = (out: vec<f32>, lhs: vec<f32>, rhs: vec<f32>): vec<f32> => {
    // maybe right need to think about it

    out[0] = Math.min(lhs[0], rhs[0])
    out[1] = Math.min(lhs[1], rhs[1])
    out[2] = Math.min(lhs[2], rhs[2])
    return out
}