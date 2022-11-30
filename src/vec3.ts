import type { Vec3 } from "./types"
import { clamp } from "./utils/clamp"
import { Rad2Deg } from "./utils/constants"
import { EPSILON, Infinity, NegativeInfinity } from "./utils/floatingPoints"

type vec3 = Float32Array

export const create = (x = 0, y = 0, z = 0): Vec3 => {
    return { x, y, z }
}
export const creates = (x = 0, y = 0, z = 0): vec3 => {
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
export const negativeInfinity = (): Vec3 => ({ x: NegativeInfinity, y: NegativeInfinity, z: NegativeInfinity })
export const positiveInfinity = (): Vec3 => ({ x: Infinity, y: Infinity, z: Infinity })

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
    let sqrtmag = magnitudeSqrt(v)
    if (sqrtmag > maxLength * maxLength) {
        let mag = Math.sqrt(sqrtmag)
        let normx = v.x / mag
        let normy = v.y / mag
        let normz = v.z / mag
        return { x: normx / maxLength, y: normy / maxLength, z: normz / maxLength }
    }
    return v
}
// export const clampMagnitude = (v: Vec3, min: number, max: number): Vec3 => {
//     let mag = magnitudeSqrt(v)
//     return mag < min ? ({ x: v.x / mag, y: v.y / mag, z: v.z / mag }) * min : mag > max ? (v / mag) * max : v;
// }
//Returns this vector with a magnitude of 1
export const normalized = (v: Vec3): Vec3 => {
    const vLen = magnitude(v)
    if (vLen > 0.00001) {
        return { x: v.x / vLen, y: v.y / vLen, z: v.z / vLen }
    } else {
        return zero()
    }
}
//Makes this vector have a magnitude of 1.
export const normalize = (v: Vec3): void => {
    let mag = magnitude(v)
    if (mag > 0.00001) {
        { v.x / mag, v.y / mag, v.z / mag }
    } else {
        zero()
    }
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
    const denominator = Math.sqrt(magnitudeSqrt(from) * magnitudeSqrt(to))
    let Dot = clamp(dot(from, to) / denominator, -1, 1)
    return Math.acos(Dot) * Rad2Deg
}
//Calculates the signed angle between vectors from and to in relation to axis.
export const signedAngle = (from: Vec3, to: Vec3, axis: Vec3): number => {
    let unsignedAngle = angle(from, to);
    let cx = from.y * to.z - from.z * to.y;
    let cy = from.z * to.x - from.x * to.z;
    let cz = from.x * to.y - from.y * to.x;
    let sign = Math.sign(axis.x * cx + axis.y * cy + axis.z * cz);
    return unsignedAngle * sign
}
//	Multiplies two vectors component-wise.
export const scale = (a: Vec3, b: Vec3): Vec3 => {
    return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z }
}
//Calculate a position between the points specified by current and target, moving no farther than the distance specified by maxDistanceDelta.
/**
 * 
 * @param current The position to move from.
 * @param target The position to move towards.
 * @param maxDistanceDelta:Distance to move current per call.
 * @returns 
 */
export const MoveTowards = (current: Vec3, target: Vec3, maxDistanceDelta: number): Vec3 => {
    let vx = target.x - current.x;
    let vy = target.y - current.y;
    let vz = target.z - current.z;

    let sqrtDist = vx * vx + vy * vy + vz * vz;
    if (sqrtDist === 0 || (maxDistanceDelta >= 0 && sqrtDist <= maxDistanceDelta * maxDistanceDelta)) target
    let dist = Math.sqrt(sqrtDist)
    return { x: current.x + vx / dist * maxDistanceDelta, y: current.y + vy / dist * maxDistanceDelta, z: current.z + vz / dist * maxDistanceDelta }
}
//Reflects a vector off the plane defined by a normal.
export const reflect = (inDirection: Vec3, inNormal: Vec3): Vec3 => {
    let factor = -2 * dot(inNormal, inDirection)
    return {
        x: factor * inNormal.x + inDirection.x,
        y: factor * inNormal.y + inDirection.y,
        z: factor * inNormal.z + inDirection.z
    }
}
// Rotates a vector current towards target.
export const rotateTowards = () => { }
// Projects a vector onto another vector.
export const Project = (v: Vec3, onNormal: Vec3): Vec3 => {
    let sqrtMag = dot(onNormal, onNormal)
    if (sqrtMag < EPSILON) {
        return zero()
    }
    else {
        let Dot = dot(v, onNormal)
        return { x: v.x - onNormal.x * Dot / sqrtMag, y: v.y - onNormal.y * Dot / sqrtMag, z: v.z - onNormal.z * Dot / sqrtMag }
    }
}
//Projects a vector onto a plane defined by a normal orthogonal to the plane.
export const ProjectOnPlane = (v: Vec3, planeNormal: Vec3): Vec3 => {
    let sqrtMag = dot(planeNormal, planeNormal)
    if (sqrtMag < EPSILON) {
        return v
    }
    else {
        let Dot = dot(v, planeNormal)
        return { x: planeNormal.x * Dot / sqrtMag, y: planeNormal.y * Dot / sqrtMag, z: planeNormal.z * Dot / sqrtMag }
    }
}
//Gradually changes a vector towards a desired goal over time.
export const smoothDamps = (current: Vec3, target: Vec3, currentVelocity: Vec3, smoothTime: number, maxSpeed: number, deltaTime: number): Vec3 => {
    let output_x = 0;
    let output_y = 0;
    let output_z = 0;

    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime);
    let omega = 2 / smoothTime;

    let x = omega * deltaTime;
    let exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

    let change_x = current.x - target.x;
    let change_y = current.y - target.y;
    let change_z = current.z - target.z;
    const og = create()
    let originalTo = copy(og, target);

    // Clamp maximum speed
    let maxChange = maxSpeed * smoothTime;

    let maxChangeSq = maxChange * maxChange;
    let sqrmag = change_x * change_x + change_y * change_y + change_z * change_z;
    if (sqrmag > maxChangeSq) {
        let mag = Math.sqrt(sqrmag);
        change_x = change_x / mag * maxChange;
        change_y = change_y / mag * maxChange;
        change_z = change_z / mag * maxChange;
    }

    target.x = current.x - change_x;
    target.y = current.y - change_y;
    target.z = current.z - change_z;

    let temp_x = (currentVelocity.x + omega * change_x) * deltaTime;
    let temp_y = (currentVelocity.y + omega * change_y) * deltaTime;
    let temp_z = (currentVelocity.z + omega * change_z) * deltaTime;

    currentVelocity.x = (currentVelocity.x - omega * temp_x) * exp;
    currentVelocity.y = (currentVelocity.y - omega * temp_y) * exp;
    currentVelocity.z = (currentVelocity.z - omega * temp_z) * exp;

    output_x = target.x + (change_x + temp_x) * exp;
    output_y = target.y + (change_y + temp_y) * exp;
    output_z = target.z + (change_z + temp_z) * exp;

    // Prevent overshooting
    let origMinusCurrent_x = originalTo.x - current.x;
    let origMinusCurrent_y = originalTo.y - current.y;
    let origMinusCurrent_z = originalTo.z - current.z;
    let outMinusOrig_x = output_x - originalTo.x;
    let outMinusOrig_y = output_y - originalTo.y;
    let outMinusOrig_z = output_z - originalTo.z;

    if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y + origMinusCurrent_z * outMinusOrig_z > 0) {
        output_x = originalTo.x;
        output_y = originalTo.y;
        output_z = originalTo.z;

        currentVelocity.x = (output_x - originalTo.x) / deltaTime;
        currentVelocity.y = (output_y - originalTo.y) / deltaTime;
        currentVelocity.z = (output_z - originalTo.z) / deltaTime;
    }

    return { x: output_x, y: output_y, z: output_z };
}
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
