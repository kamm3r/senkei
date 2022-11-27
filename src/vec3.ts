import { EPSILON } from "./constants"

export interface Vec3 {
    x: number
    y: number
    z: number
}
// export const create = (x?: number, y?: number, z?: number): Vec3 => {
//     if (x === undefined || y === undefined || z === undefined) {
//         return { x: 0, y: 0, z: 0 }
//     }
//     return { x, y, z }
// }
export const create = (x = 0, y = 0, z = 0): Vec3 => {
    return { x, y, z }
}
// float32array
export const creates = (x = 0, y = 0, z = 0): Float32Array => {
    return new Float32Array([x, y, z])
}
export const back = (): Vec3 => ({ x: 0, y: 0, z: -1 })
export const down = (): Vec3 => ({ x: 0, y: -1, z: 0 })
export const forward = (): Vec3 => ({ x: 0, y: 0, z: 1 })
export const left = (): Vec3 => ({ x: -1, y: 0, z: 0 })
export const right = (): Vec3 => ({ x: 1, y: 0, z: 0 })
export const up = (): Vec3 => ({ x: 0, y: 1, z: 0 })
export const one = (): Vec3 => ({ x: 1, y: 1, z: 1 })
export const zero = (): Vec3 => ({ x: 0, y: 0, z: 0 })
export const negativeInfinity = (): Vec3 => ({ x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY, z: Number.NEGATIVE_INFINITY })
export const positiveInfinity = (): Vec3 => ({ x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY, z: Number.POSITIVE_INFINITY })
export const copy = (a: Vec3, b: Vec3): Vec3 => {
    return { x: a.x = b.x, y: a.y = b.y, z: a.z = b.z }
}
export const printVec = (v: Vec3): void => {
    console.log(`"vec3( ${v.x},${v.y},${v.z});`)
}

//Returns true if the given vector is exactly equal to this vector.
export const exactEquals = (v1: Vec3, v2: Vec3): boolean => {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z
}
//operator =! Returns true if vectors are different.
export const differentEquals = (v1: Vec3, v2: Vec3): boolean => {
    return v1.x !== v2.x && v1.y !== v2.y && v1.z !== v2.z
}
//operator == Returns true if two vectors are approximately equal.
export const approximatelyEquals = (v1: Vec3, v2: Vec3): boolean => {
    return (Math.abs(v1.x - v2.x) <=
        EPSILON * Math.max(1.0, Math.abs(v1.x), Math.abs(v2.x)) &&
        Math.abs(v1.y - v2.y) <=
        EPSILON * Math.max(1.0, Math.abs(v1.y), Math.abs(v2.y)) &&
        Math.abs(v1.z - v2.z) <=
        EPSILON * Math.max(1.0, Math.abs(v1.z), Math.abs(v2.z))
    );
}
// maybe??? probably not though
export const approximatelyEqual = (v1: Vec3, v2: Vec3): boolean => {
    return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z
}

export const scalarAddition = (v: Vec3, k: number): Vec3 => {
    return { x: v.x + k, y: v.y + k, z: v.z + k }
}

export const scalarSubtraction = (v: Vec3, k: number): Vec3 => {
    return { x: v.x - k, y: v.y - k, z: v.z - k }
}

export const scalarMultiplication = (v: Vec3, k: number): Vec3 => {
    return { x: v.x * k, y: v.y * k, z: v.z * k }
}

export const scalarDivision = (v: Vec3, k: number): Vec3 => {
    return { x: v.x / k, y: v.y / k, z: v.z / k }
}

export const add = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }
}

export const subtract = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }
}

export const multiply = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z }
}

export const divide = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x / v2.x, y: v1.y / v2.y, z: v1.z / v2.z }
}

// Dot Product of two vectors.
export const dot = (v1: Vec3, v2: Vec3): number => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}
// export const orthogonal = (v1: Vec3, v2: Vec3): boolean => {
//     return false
// }
//	Cross Product of two vectors.
export const cross = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: (v1.y * v2.z) - (v1.z * v2.y), y: (v1.x * v2.z) - (v1.z * v2.x), z: (v1.x * v2.y) - (v1.y * v2.x) }
}
// also know as exterior product
export const wedge = (v1: Vec3, v2: Vec3): { x: number, y: number, z: number, w: number } => {
    const b = v1.x * v2.y - v1.y * v2.x
    return { x: 0, y: 0, z: 0, w: b }
}
// Returns the length of this vector
export const magnitude = (v: Vec3): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
//	Returns the squared length of this vector
export const magnitudeSqrt = (v: Vec3): number => {
    return v.x * v.x + v.y * v.y + v.z * v.z
}
//	Returns a copy of vector with its magnitude clamped to maxLength.
export const clampMagnitude = (v: Vec3, maxLength: number): Vec3 => {
    return { x: 0, y: 0, z: 0 }
}
// export const magnitudeSqrt = (v: Vec3): number => {
//     return dot(v, v)
// }
// export const normalized = (v: Vec3): Vec3 => {
//     let len = magnitudeSqrt(v)
//     if (len > 0) len = 1 / Math.sqrt(len)

//     return { x: v.x * len, y: v.y * len, z: v.z * len }
// }
//Returns this vector with a magnitude of 1
export const normalized = (v: Vec3): Vec3 => {
    const vLen = magnitude(v)
    return { x: v.x / vLen, y: v.y / vLen, z: v.z / vLen }
}
//Makes this vector have a magnitude of 1.
export const normalize = (v: Vec3): void => {
    { v.x / Math.abs(v.x), v.y / Math.abs(v.y), v.z / Math.abs(v.z) }
}

export const negate = (v: Vec3): Vec3 => {
    return { x: -v.x, y: -v.y, z: -v.z }
}
// when you want specific distance between a^ and b
export const scalarProjection = (v1: Vec3, v2: Vec3): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (v1: Vec3, v2: Vec3): Vec3 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    return { x: v1Norm.x * scProj, y: v1Norm.y * scProj, z: v1Norm.z * scProj }
}
// supposendly or how i understood it, what unit vectors are
export const unitVector = (v: Vec3): Vec3 => {
    return normalized(v)
}
//Returns the distance between a and b.
export const distance = (v1: Vec3, v2: Vec3): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: Vec3, v2: Vec3): number => {
    const x = (v2.x - v1.x)
    const y = (v2.y - v1.y)
    const z = (v2.z - v1.z)
    return x * x + y * y + z * z
}
//Linearly interpolates between two points.
export const lerp = (a: Vec3, b: Vec3, t: number): Vec3 => {
    return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), z: a.z + t * (b.z - a.z) }
}
//Linearly interpolates between two vectors.
export const lerpUnclamped = (a: Vec3, b: Vec3, t: number): Vec3 => {
    return { x: 1, y: 1, z: 1 }
}
export const inverseLerp = () => { }
// Spherically interpolates between two vectors??points.
export const slerp = (a: Vec3, b: Vec3, t: number): Vec3 => {
    return { x: 1, y: 1, z: 1 }
}
//Spherically interpolates between two vectors.
export const slerpUnclamped = (a: Vec3, b: Vec3, t: number): Vec3 => {
    return { x: 1, y: 1, z: 1 }
}
//	Calculates the angle between vectors from and.
export const angle = (from: Vec3, to: Vec3): number => {
    const mag = Math.sqrt((from.x * from.x + from.y * from.y + from.z * from.z) * (to.x * to.x + to.y * to.y + to.z * to.z))
    const cosine = mag && dot(from, to) / mag
    return Math.acos(Math.min(Math.max(cosine, -1), 1))
}
//Calculates the signed angle between vectors from and to in relation to axis.
export const signedAngle = (from: Vec3, to: Vec3, axis: Vec3): number => {
    return 2
}
//	Multiplies two vectors component-wise.
export const scale = (a: Vec3, b: Vec3): Vec3 => {
    return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z }
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
export const max = (lhs: Vec3, rhs: Vec3): Vec3 => {
    // maybe right need to think about it
    return { x: Math.max(lhs.x, rhs.x), y: Math.max(lhs.y, rhs.y), z: Math.max(lhs.z, rhs.z) }
}
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: Vec3, rhs: Vec3): Vec3 => {
    // maybe right need to think about it
    return { x: Math.min(lhs.x, rhs.x), y: Math.min(lhs.y, rhs.y), z: Math.min(lhs.z, rhs.z) }
}