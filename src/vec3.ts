import type { Vec3 } from "./types"
import * as math from "./utils/clamp"
import * as mathf from "./utils/abs"
import { Rad2Deg } from "./utils/constants"
import { EPSILON, Infinity, kEpsilon, NegativeInfinity } from "./utils/floatingPoints"
import { Lerp } from "./utils/interpolation"

export type vec3 = Float32Array

export const create = (x = 0, y = 0, z = 0): Vec3 => {
    return { x, y, z }
}
export const creates = (x = 0, y = 0, z = 0): vec3 => new Float32Array([x, y, z])

export const back = (): Vec3 => create(0, 0, -1)
export const down = (): Vec3 => create(0, -1, 0)
export const forward = (): Vec3 => create(0, 0, 1)
export const left = (): Vec3 => create(-1, 0, 0)
export const right = (): Vec3 => create(1, 0, 0)
export const up = (): Vec3 => create(0, 1, 0)
export const one = (): Vec3 => create(1, 1, 1)
export const zero = (): Vec3 => create(0, 0, 0)
export const negativeInfinity = (): Vec3 => create(NegativeInfinity, NegativeInfinity, NegativeInfinity)
export const positiveInfinity = (): Vec3 => create(Infinity, Infinity, Infinity)

export const copy = (a: Vec3, b: Vec3): Vec3 => create(a.x = b.x, a.y = b.y, a.z = b.z)
export const printVec = (v: Vec3): void => console.log(`"vec3( ${v.x},${v.y},${v.z});`)

//Returns true if the given vector is exactly equal to this vector.
export const exactEquals = (v1: Vec3, v2: Vec3): boolean => v1.x === v2.x && v1.y === v2.y && v1.z === v2.z
//operator =! Returns true if vectors are different.
export const differentEquals = (v1: Vec3, v2: Vec3): boolean => v1.x !== v2.x && v1.y !== v2.y && v1.z !== v2.z
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
export const approximatelyEqual = (v1: Vec3, v2: Vec3): boolean => v1.x == v2.x && v1.y == v2.y && v1.z == v2.z

export const scalarAddition = (v: Vec3, k: number): Vec3 => create(v.x + k, v.y + k, v.z + k)

export const scalarSubtraction = (v: Vec3, k: number): Vec3 => create(v.x - k, v.y - k, v.z - k)

export const scalarMultiplication = (v: Vec3, k: number): Vec3 => create(v.x * k, v.y * k, v.z * k)

export const scalarDivision = (v: Vec3, k: number): Vec3 => create(v.x / k, v.y / k, v.z / k)

export const add = (v1: Vec3, v2: Vec3): Vec3 => create(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)

export const subtract = (v1: Vec3, v2: Vec3): Vec3 => create(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)

export const multiply = (v1: Vec3, v2: Vec3): Vec3 => create(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z)

export const divide = (v1: Vec3, v2: Vec3): Vec3 => create(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z)
export const clamp = (v: Vec3, min: Vec3, max: Vec3): Vec3 => create(v.x < min.x ? min.x : v.x > max.x ? max.x : v.x, v.y < min.y ? min.y : v.y > max.y ? max.y : v.y, v.z < min.z ? min.z : v.z > max.z ? max.z : v.z)
export const clamp01 = (v: Vec3): Vec3 => create(v.x < 0 ? 0 : v.x > 1 ? 1 : v.x, v.y < 0 ? 0 : v.y > 1 ? 1 : v.y, v.z < 0 ? 0 : v.z > 1 ? 1 : v.z)
export const clampNeg1to1 = (v: Vec3): Vec3 => create(v.x < -1 ? -1 : v.x > 1 ? 1 : v.x, v.y < -1 ? -1 : v.y > 1 ? 1 : v.y, v.z < -1 ? -1 : v.z > 1 ? 1 : v.z)
// Returns the absolute value, per component. Basically makes negative numbers positive
export const Abs = (v: Vec3): Vec3 => create(mathf.Abs(v.x), mathf.Abs(v.y), mathf.Abs(v.z))
// Dot Product of two vectors.
export const dot = (v1: Vec3, v2: Vec3): number => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
// export const orthogonal = (v1: Vec3, v2: Vec3): boolean => {
//     return false
// }
//	Cross Product of two vectors.
export const cross = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: (v1.y * v2.z) - (v1.z * v2.y), y: (v1.x * v2.z) - (v1.z * v2.x), z: (v1.x * v2.y) - (v1.y * v2.x) }
}
// also know as exterior product
// {x:0,y:0,z:0 w:wedget product}
export const wedge = (v1: Vec3, v2: Vec3): number => v1.x * v2.y - v1.y * v2.x
// Returns the length of this vector
export const magnitude = (v: Vec3): number => Math.sqrt(magnitudeSqrt(v))
//	Returns the squared length of this vector
export const magnitudeSqrt = (v: Vec3): number => v.x * v.x + v.y * v.y + v.z * v.z
//	Returns a copy of vector with its magnitude clamped to maxLength.
export const clampMagnitude = (v: Vec3, maxLength: number): Vec3 => {
    const sqrtmag = magnitudeSqrt(v)
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
export const normalized = (v: Vec3): Vec3 => magnitude(v) > kEpsilon ? create(v.x / magnitude(v), v.y / magnitude(v), v.z / magnitude(v)) : zero()
//Makes this vector have a magnitude of 1.
export const normalize = (v: Vec3): void => {
    const mag = magnitude(v)
    if (mag > 0.00001) {
        { v.x / mag, v.y / mag, v.z / mag }
    } else {
        zero()
    }
}
type Negate = (v: vec3) => vec3
export const negate: Negate = (v) => creates(-v[0], -v[1], -v[2])
// export const negate = (v: Vec3): Vec3 => {
//     return { x: -v.x, y: -v.y, z: -v.z }
// }
// when you want specific distance between a^ and b
export const scalarProjection = (v1: Vec3, v2: Vec3): number => dot(normalized(v1), v2)
export const VectorProjection = (v1: Vec3, v2: Vec3): Vec3 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    return { x: v1Norm.x * scProj, y: v1Norm.y * scProj, z: v1Norm.z * scProj }
}
// supposendly or how i understood it, what unit vectors are
export const unitVector = (v: Vec3): Vec3 => normalized(v)
//Returns the distance between a and b.
type Distance = (v1: Vec3, v2: Vec3) => number
export const distance: Distance = (v1, v2) => Math.sqrt(distanceSqrt(v1, v2))
// export const distance = (v1: vec3, v2: vec3): number => Math.sqrt(distanceSqrt(v1, v2))
export const distanceSqrt = (v1: Vec3, v2: Vec3): number => (v2.x - v1.x) * (v2.x - v1.x) + (v2.y - v1.y) * (v2.y - v1.y) + (v2.z - v1.z) * (v2.z - v1.z)
//Linearly interpolates between two points.
export const lerp = (a: Vec3, b: Vec3, t: Vec3): Vec3 => create(Lerp(a.x, b.x, t.x), Lerp(a.y, b.y, t.y), Lerp(a.z, b.z, t.z))
//Linearly interpolates between two vectors.
export const lerpUnclamped = (a: Vec3, b: Vec3, t: number): Vec3 => {
    return { x: 1, y: 1, z: 1 }
}
export const inverseLerp = (a: Vec3, b: Vec3, v: Vec3): Vec3 => create((v.x - a.x) / (b.x - a.x), (v.y - a.y) / (b.y - a.y), (v.z - a.z) / (b.z - a.z))
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
    let Dot = math.clamp(dot(from, to) / denominator, -1, 1)
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
export const scale = (a: Vec3, b: Vec3): Vec3 => create(a.x * b.x, a.y * b.y, a.z * b.z)
//Calculate a position between the points specified by current and target, moving no farther than the distance specified by maxDistanceDelta.
/**
 * 
 * @param current The position to move from.
 * @param target The position to move towards.
 * @param maxDistanceDelta:Distance to move current per call.
 * @returns 
 */
export const MoveTowards = (current: Vec3, target: Vec3, maxDistanceDelta: number): Vec3 => {
    const sqrtDist = (target.x - current.x) * (target.x - current.x) + (target.y - current.y) * (target.y - current.y) + (target.z - current.z) * (target.z - current.z);
    if (sqrtDist === 0 || (maxDistanceDelta >= 0 && sqrtDist <= maxDistanceDelta * maxDistanceDelta)) target
    const dist = Math.sqrt(sqrtDist)
    return create(current.x + (target.x - current.x) / dist * maxDistanceDelta, current.y + (target.y - current.y) / dist * maxDistanceDelta, current.z + (target.z - current.z) / dist * maxDistanceDelta)
}
//Reflects a vector off the plane defined by a normal.
export const reflect = (inDirection: Vec3, inNormal: Vec3): Vec3 => {
    const factor = -2 * dot(inNormal, inDirection)
    return create(
        factor * inNormal.x + inDirection.x,
        factor * inNormal.y + inDirection.y,
        factor * inNormal.z + inDirection.z
    )
}
// Rotates a vector current towards target.
export const rotateTowards = () => { }
// Projects a vector onto another vector.
export const Project = (v: Vec3, onNormal: Vec3): Vec3 => {
    let sqrtMag = dot(onNormal, onNormal)
    if (sqrtMag < kEpsilon) {
        return zero()
    }
    else {
        let Dot = dot(v, onNormal)
        return create(v.x - onNormal.x * Dot / sqrtMag, v.y - onNormal.y * Dot / sqrtMag, v.z - onNormal.z * Dot / sqrtMag)
    }
}
//Projects a vector onto a plane defined by a normal orthogonal to the plane.
export const ProjectOnPlane = (v: Vec3, planeNormal: Vec3): Vec3 => {
    let sqrtMag = dot(planeNormal, planeNormal)
    if (sqrtMag < kEpsilon) {
        return v
    }
    else {
        let Dot = dot(v, planeNormal)
        return create(planeNormal.x * Dot / sqrtMag, planeNormal.y * Dot / sqrtMag, planeNormal.z * Dot / sqrtMag)
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

    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

    let change_x = current.x - target.x;
    let change_y = current.y - target.y;
    let change_z = current.z - target.z;
    const og = create()
    const originalTo = copy(og, target);

    // Clamp maximum speed
    const maxChange = maxSpeed * smoothTime;

    const maxChangeSq = maxChange * maxChange;
    const sqrmag = change_x * change_x + change_y * change_y + change_z * change_z;
    if (sqrmag > maxChangeSq) {
        const mag = Math.sqrt(sqrmag);
        change_x = change_x / mag * maxChange;
        change_y = change_y / mag * maxChange;
        change_z = change_z / mag * maxChange;
    }

    target.x = current.x - change_x;
    target.y = current.y - change_y;
    target.z = current.z - change_z;

    const temp_x = (currentVelocity.x + omega * change_x) * deltaTime;
    const temp_y = (currentVelocity.y + omega * change_y) * deltaTime;
    const temp_z = (currentVelocity.z + omega * change_z) * deltaTime;

    currentVelocity.x = (currentVelocity.x - omega * temp_x) * exp;
    currentVelocity.y = (currentVelocity.y - omega * temp_y) * exp;
    currentVelocity.z = (currentVelocity.z - omega * temp_z) * exp;

    output_x = target.x + (change_x + temp_x) * exp;
    output_y = target.y + (change_y + temp_y) * exp;
    output_z = target.z + (change_z + temp_z) * exp;

    // Prevent overshooting
    const origMinusCurrent_x = originalTo.x - current.x;
    const origMinusCurrent_y = originalTo.y - current.y;
    const origMinusCurrent_z = originalTo.z - current.z;
    const outMinusOrig_x = output_x - originalTo.x;
    const outMinusOrig_y = output_y - originalTo.y;
    const outMinusOrig_z = output_z - originalTo.z;

    if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y + origMinusCurrent_z * outMinusOrig_z > 0) {
        output_x = originalTo.x;
        output_y = originalTo.y;
        output_z = originalTo.z;

        currentVelocity.x = (output_x - originalTo.x) / deltaTime;
        currentVelocity.y = (output_y - originalTo.y) / deltaTime;
        currentVelocity.z = (output_z - originalTo.z) / deltaTime;
    }

    return create(output_x, output_y, output_z);
}
//Returns a vector that is made from the largest components of two vectors.
export const max = (lhs: vec3, rhs: vec3): vec3 => creates(Math.max(lhs[0], rhs[0]), Math.max(lhs[1], rhs[1]), Math.max(lhs[2], rhs[2]))
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: vec3, rhs: vec3): vec3 => creates(Math.min(lhs[0], rhs[0]), Math.min(lhs[1], rhs[1]), Math.min(lhs[2], rhs[2]))
