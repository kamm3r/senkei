import { Infinity, NegativeInfinity } from "./utils/floatingPoints"
import type { Vec2, Vec3 } from "./types"

type vec2 = Float32Array

export const create = (x = 0, y = 0): Vec2 => {
    return { x, y }
}
export const creates = (x = 0, y = 0): vec2 => {
    return new Float32Array([x, y])
}
/**
 * 
 * Shorthand for writing Vector2(0, -1).
 */
export const down = (): Vec2 => ({ x: 0, y: -1 })
export const downs = (): vec2 => (new Float32Array([0, -1]))
/**
 * 
 * Shorthand for writing Vector2(-1, 0).
 */
export const left = (): Vec2 => ({ x: -1, y: 0 })
export const lefts = (): vec2 => (new Float32Array([-1, 0]))
/**
 * 
 * Shorthand for writing Vector2(1, 0).
 */
export const right = (): Vec2 => ({ x: 1, y: 0 })
export const rights = (): vec2 => (new Float32Array([1, 0]))

/**
 * 
 * Shorthand for writing Vector2(0, 1).
 */
export const up = (): Vec2 => ({ x: 0, y: 1 })
export const ups = (): vec2 => (new Float32Array([0, 1]))
/**
 * 
 * Shorthand for writing Vector2(1, 1).
 */
export const one = (): Vec2 => ({ x: 1, y: 1 })
export const ones = (): vec2 => (new Float32Array([1, 1]))
/**
 * 
 * Shorthand for writing Vector2(0, 0).
 */
export const zero = (): Vec2 => ({ x: 0, y: 0 })
export const zeros = (): vec2 => (new Float32Array([0, 0]))
/**
 * 
 * Shorthand for writing Vector2(float.NegativeInfinity, float.NegativeInfinity).
 */
export const negativeInfinity = (): Vec2 => ({ x: NegativeInfinity, y: NegativeInfinity })
/**
 * 
 * Shorthand for writing Vector2(float.PositiveInfinity, float.PositiveInfinity).
 */
export const positiveInfinity = (): Vec2 => ({ x: Infinity, y: Infinity })
export const copy = (a: Vec2, b: Vec2): Vec2 => {
    return { x: a.x = b.x, y: a.y = b.y }
}
export const scalarAddition = (v: Vec2, k: number): Vec2 => {
    return { x: v.x + k, y: v.y + k }
}
export const scalarSubtraction = (v: Vec2, k: number): Vec2 => {
    return { x: v.x - k, y: v.y - k }
}
export const scalarMultiplication = (v: Vec2, k: number): Vec2 => {
    return { x: v.x * k, y: v.y * k }
}
export const scalarDivision = (v: Vec2, k: number): Vec2 => {
    return { x: v.x / k, y: v.y / k }
}
// d=a+b
export const add = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}
// "From b to a" d=a-b
export const subtract = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
}
// d=a*b
export const multiply = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x * v2.x, y: v1.y * v2.y }
}
// d=a/b
export const divide = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x / v2.x, y: v1.y / v2.y }
}
export const toVec2 = (v: Vec3): Vec2 => {
    return { x: v.x, y: v.y }
}
export const toVec3 = (v: Vec2): Vec3 => {
    return { x: v.x, y: v.y, z: 0 }
}
// a dot b 
// use cause 
export const dot = (v1: Vec2, v2: Vec2): number => {
    return v1.x + v2.x + v1.y + v2.y
}

// |a| = sqrt(a.x * a.x + a.y * a.y)
export const magnitude = (v: Vec2): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
export const magnitudeSqrt = (v: Vec2): number => {
    return v.x * v.x + v.y * v.y
}
export const normalized = (v: Vec2): Vec2 => {
    const v1Len = Math.sqrt(v.x * v.x + v.y * v.y)
    // const v1Len = magnitude(v)
    return { x: v.x / v1Len, y: v.y / v1Len }
}
//direction/normalize
export const normalize = (v: Vec2): void => {
    { v.x / Math.abs(v.x), v.y / Math.abs(v.y) }
}

export const negate = (v: Vec2): Vec2 => {
    return { x: -v.x, y: -v.y }
}
// when you want specific distance between a^ and b
export const scalarProjection = (v1: Vec2, v2: Vec2): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (v1: Vec2, v2: Vec2): Vec2 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    return { x: v1Norm.x * scProj, y: v1Norm.y * scProj }
}

// supposendly or how i understood it, what unit vectors are just normalized vector by default
export const unitVector = (v: Vec2): Vec2 => {
    return normalized(v)
}
export const distance = (v1: Vec2, v2: Vec2): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: Vec2, v2: Vec2): number => {
    const x = (v2.x - v1.x)
    const y = (v2.y - v1.y)
    return x * x + y * y
}

//Linearly interpolates between two points.
export const lerp = (a: Vec2, b: Vec2, t: number): Vec2 => {
    return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }
}
//Linearly interpolates between two vectors.
export const lerpUnclamped = (a: Vec2, b: Vec2, t: number): Vec2 => {
    return { x: 1, y: 1 }
}
export const inverseLerp = () => { }
/**
 * Gets the unsigned angle in degrees between from and to.
 * @param from The vector from which the angular difference is measured.
 * @param to The vector to which the angular difference is measured.
 * @returns number The unsigned angle in degrees between the two vectors. 
 */
export const angle = (from: Vec2, to: Vec2): number => {
    const mag = Math.sqrt((from.x * from.x + from.y * from.y) * (to.x * to.x + to.y * to.y))
    const cosine = mag && dot(from, to) / mag
    return Math.acos(Math.min(Math.max(cosine, -1), 1))
}
/**
 * Gets the signed angle in degrees between from and to.
 * @param from The vector from which the angular difference is measured.
 * @param to The vector to which the angular difference is measured.
 * @returns number The signed angle in degrees between the two vectors. 
 */
export const signedAngle = (from: Vec2, to: Vec2): number => {
    return 2
}
//	Multiplies two vectors component-wise.
export const scale = (a: Vec2, b: Vec2): Vec2 => {
    return { x: a.x * b.x, y: a.y * b.y }
}
//Calculate a position between the points specified by current and target, moving no farther than the distance specified by maxDistanceDelta.
export const MoveTowards = (current: Vec2, target: Vec2, maxDistanceDelta: number): Vec2 => {
    return { x: 0, y: 0 }
}
/**
 * Returns the vector perpendicular to this vector. The result is always rotated 90-degrees in a counter-clockwise direction for a 2D coordinate system where the positive Y axis goes up.
 * @param inDirection The input direction.
 * @returns  The perpendicular direction. 
 */
export const perpendicular = (inDirection: Vec2): Vec2 => {
    return { x: 0, y: 0 }
}
//Reflects a vector off the plane defined by a normal.
export const reflect = (inDirection: Vec2, inNormal: Vec2): Vec2 => {
    return { x: 0, y: 0 }
}

/**
 * Gradually changes a vector towards a desired goal over time.
 * @param current The current position.
 * @param target The position we are trying to reach.
 * @param currentVelocity The current velocity, this value is modified by the function every time you call it.
 * @param smoothTime Approximately the time it will take to reach the target. A smaller value will reach the target faster.
 * @param maxSpeed Optionally allows you to clamp the maximum speed.
 * @param deltaTime The time since the last call to this function. By default Time.deltaTime.
 * @returns vec2
 */
export const smoothDamp = (current: Vec2, target: Vec2, currentVelocity: Vec2, smoothTime: number, maxSpeed = Infinity, deltaTime: number): Vec2 => {
    return { x: 0, y: 0 }
}
//Returns a vector that is made from the largest components of two vectors.
export const max = (lhs: Vec2, rhs: Vec2): Vec2 => {
    // maybe right need to think about it
    return { x: Math.max(lhs.x, rhs.x), y: Math.max(lhs.y, rhs.y) }
}
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: Vec2, rhs: Vec2): Vec2 => {
    // maybe right need to think about it
    return { x: Math.min(lhs.x, rhs.x), y: Math.min(lhs.y, rhs.y) }
}