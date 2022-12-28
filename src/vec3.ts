import type { mat4, vec3 } from "./types"
import * as mathf from "./utils/"

// export type vec3 = Float32Array

// export const create = (x = 0, y = 0, z = 0): vec3 => {
//     return { x, y, z }
// }
export const create = (x = 0, y = 0, z = 0): vec3 => new Float32Array([x, y, z])

export const back = create(0, 0, -1)
export const down = create(0, -1, 0)
export const forward = create(0, 0, 1)
export const left = create(-1, 0, 0)
export const right = create(1, 0, 0)
export const up = create(0, 1, 0)
export const one = create(1, 1, 1)
export const zero = create(0, 0, 0)
export const negativeInfinity = create(mathf.NegativeInfinity, mathf.NegativeInfinity, mathf.NegativeInfinity)
export const positiveInfinity = create(mathf.Infinity, mathf.Infinity, mathf.Infinity)

//TODO:get and set function these
export const x = (x: number): vec3 => create(x)
export const y = (y: number): vec3 => create(y)
export const z = (z: number): vec3 => create(z)

export const copy = (a: vec3, b: vec3): vec3 => create(a[0] = b[0], a[1] = b[1], a[2] = b[2])
export const printVec = (v: vec3): void => console.log(`"vec3( ${v[0]},${v[1]},${v[2]});`)

//Returns true if the given vector is exactly equal to this vector.
export const exactEquals = (v1: vec3, v2: vec3): boolean => v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2]
//operator =! Returns true if vectors are different.
export const differentEquals = (v1: vec3, v2: vec3): boolean => v1[0] !== v2[0] && v1[1] !== v2[1] && v1[2] !== v2[2]
//operator == Returns true if two vectors are approximately equal.
export const approximatelyEquals = (v1: vec3, v2: vec3): boolean => {
    return (Math.abs(v1[0] - v2[0]) <=
        mathf.EPSILON * Math.max(1.0, Math.abs(v1[0]), Math.abs(v2[0])) &&
        Math.abs(v1[1] - v2[1]) <=
        mathf.EPSILON * Math.max(1.0, Math.abs(v1[1]), Math.abs(v2[1])) &&
        Math.abs(v1[2] - v2[2]) <=
        mathf.EPSILON * Math.max(1.0, Math.abs(v1[2]), Math.abs(v2[2]))
    );
}
// maybe??? probably not though
export const approximatelyEqual = (v1: vec3, v2: vec3): boolean => v1[0] == v2[0] && v1[1] == v2[1] && v1[2] == v2[2]

export const scalarAddition = (v: vec3, k: number): vec3 => create(v[0] + k, v[1] + k, v[2] + k)

export const scalarSubtraction = (v: vec3, k: number): vec3 => create(v[0] - k, v[1] - k, v[2] - k)

export const scalarMultiplication = (v: vec3, k: number): vec3 => create(v[0] * k, v[1] * k, v[2] * k)

export const scalarDivision = (v: vec3, k: number): vec3 => create(v[0] / k, v[1] / k, v[2] / k)

export const add = (v1: vec3, v2: vec3): vec3 => create(v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2])

export const subtract = (v1: vec3, v2: vec3): vec3 => create(v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2])

export const multiply = (v1: vec3, v2: vec3): vec3 => create(v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2])

export const divide = (v1: vec3, v2: vec3): vec3 => create(v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2])
export const clamp = (v: vec3, min: vec3, max: vec3): vec3 => create(v[0] < min[0] ? min[0] : v[0] > max[0] ? max[0] : v[0], v[1] < min[1] ? min[1] : v[1] > max[1] ? max[1] : v[1], v[2] < min[2] ? min[2] : v[2] > max[2] ? max[2] : v[2])
export const clamp01 = (v: vec3): vec3 => create(v[0] < 0 ? 0 : v[0] > 1 ? 1 : v[0], v[1] < 0 ? 0 : v[1] > 1 ? 1 : v[1], v[2] < 0 ? 0 : v[2] > 1 ? 1 : v[2])
export const clampNeg1to1 = (v: vec3): vec3 => create(v[0] < -1 ? -1 : v[0] > 1 ? 1 : v[0], v[1] < -1 ? -1 : v[1] > 1 ? 1 : v[1], v[2] < -1 ? -1 : v[2] > 1 ? 1 : v[2])
// Returns the absolute value, per component. Basically makes negative numbers positive
export const Abs = (v: vec3): vec3 => create(mathf.Abs(v[0]), mathf.Abs(v[1]), mathf.Abs(v[2]))
// Dot Product of two vectors.
export const dot = (v1: vec3, v2: vec3): number => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
// export const orthogonal = (v1: vec3, v2: vec3): boolean => {
//     return false
// }
//	Cross Product of two vectors.
export const Cross = (v1: vec3, v2: vec3): vec3 => create((v1[1] * v2[2]) - (v1[2] * v2[1]), (v1[0] * v2[2]) - (v1[2] * v2[0]), (v1[0] * v2[1]) - (v1[1] * v2[0]))
// also know as exterior product
// {x:0,y:0,z:0 w:wedget product}
export const wedge = (v1: vec3, v2: vec3): number => v1[0] * v2[1] - v1[1] * v2[0]
// Returns the length of this vector
export const magnitude = (v: vec3): number => Math.sqrt(magnitudeSqrt(v))
//	Returns the squared length of this vector
export const magnitudeSqrt = (v: vec3): number => v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
//	Returns a copy of vector with its magnitude clamped to maxLength.
export const clampMagnitude = (v: vec3, maxLength: number): vec3 => {
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
// export const clampMagnitude = (v: vec3, min: number, max: number): vec3 => {
//     let mag = magnitudeSqrt(v)
//     return mag < min ? ({ x: v[0] / mag, y: v[1] / mag, z: v[2] / mag }) * min : mag > max ? (v / mag) * max : v;
// }
//Returns this vector with a magnitude of 1
export const normalized = (v: vec3): vec3 => magnitude(v) > mathf.kEpsilon ? create(v[0] / magnitude(v), v[1] / magnitude(v), v[2] / magnitude(v)) : zero
//Makes this vector have a magnitude of 1.
export const normalize = (v: vec3): void => {
    const mag = magnitude(v)
    if (mag > 0.00001) {
        { v[0] / mag, v[1] / mag, v[2] / mag }
    } else {
        zero
    }
}
type Negate = (v: vec3) => vec3
export const negate: Negate = (v) => create(-v[0], -v[1], -v[2])
// when you want specific distance between a^ and b
export const scalarProjection = (v1: vec3, v2: vec3): number => dot(normalized(v1), v2)
export const VectorProjection = (v1: vec3, v2: vec3): vec3 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    return create(v1Norm[0] * scProj, v1Norm[1] * scProj, v1Norm[2] * scProj)
}
//Returns the distance between a and b.
type Distance = (v1: vec3, v2: vec3) => number
export const distance: Distance = (v1, v2) => Math.sqrt(distanceSqrt(v1, v2))
// export const distance = (v1: vec3, v2: vec3): number => Math.sqrt(distanceSqrt(v1, v2))
export const distanceSqrt = (v1: vec3, v2: vec3): number => (v2[0] - v1[0]) * (v2[0] - v1[0]) + (v2[1] - v1[1]) * (v2[1] - v1[1]) + (v2[2] - v1[2]) * (v2[2] - v1[2])
//Linearly interpolates between two points.
export const Lerp = (a: vec3, b: vec3, t: number): vec3 => create(mathf.Lerp(a[0], b[0], t), mathf.Lerp(a[1], b[1], t), mathf.Lerp(a[2], b[2], t))
export const Lerps = (a: vec3, b: vec3, t: vec3): vec3 => create(mathf.Lerp(a[0], b[0], t[0]), mathf.Lerp(a[1], b[1], t[1]), mathf.Lerp(a[2], b[2], t[2]))
//Linearly interpolates between two vectors.
export const LerpUnclamped = (a: vec3, b: vec3, t: number): vec3 => create(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t)
export const inverseLerp = (a: vec3, b: vec3, v: vec3): vec3 => create((v[0] - a[0]) / (b[0] - a[0]), (v[1] - a[1]) / (b[1] - a[1]), (v[2] - a[2]) / (b[2] - a[2]))
// Spherically interpolates between two vectors??points.
export const Slerp = (a: vec3, b: vec3, t: number): vec3 => {
    return create()
}
//Spherically interpolates between two vectors.
export const SlerpUnclamped = (a: vec3, b: vec3, t: number): vec3 => {
    return create()
}
//	Calculates the angle between vectors from and.
export const Angle = (from: vec3, to: vec3): number => {
    const denominator = Math.sqrt(magnitudeSqrt(from) * magnitudeSqrt(to))
    let Dot = mathf.clamp(dot(from, to) / denominator, -1, 1)
    return Math.acos(Dot) * mathf.Rad2Deg
}
//Calculates the signed angle between vectors from and to in relation to axis.
export const SignedAngle = (from: vec3, to: vec3, axis: vec3): number => {
    const unsignedAngle = Angle(from, to);
    const cx = from[1] * to[2] - from[2] * to[1];
    const cy = from[2] * to[0] - from[0] * to[2];
    const cz = from[0] * to[1] - from[1] * to[0];
    const sign = Math.sign(axis[0] * cx + axis[1] * cy + axis[2] * cz);
    return unsignedAngle * sign
}
//	Multiplies two vectors component-wise.
export const Scale = (a: vec3, b: vec3): vec3 => create(a[0] * b[0], a[1] * b[1], a[2] * b[2])
export const Scales = (v: vec3, scale: number): vec3 => create(v[0] * scale, v[1] * scale, v[2] * scale)
// Orthonormalize provided vectors
// Makes vectors normalized and orthogonal to each other
// Gram-Schmidt function implementation
export const OthoNormalize = (normal: vec3, tangent: vec3): void => {
    let length = 0
    let ilength = 0

    let v = normal

    length = Math.sqrt(magnitudeSqrt(v))
    if (length === 0) length = 1
    ilength = 1 / length
    normal[0] *= ilength
    normal[1] *= ilength
    normal[2] *= ilength

    let vn1 = Cross(normal, tangent)
    v = vn1
    length = Math.sqrt(magnitudeSqrt(v))
    if (length === 0) length = 1
    ilength = 1 / length
    vn1[0] *= ilength
    vn1[1] *= ilength
    vn1[2] *= ilength

    let vn2 = Cross(vn1, normal)

    tangent = vn2

}
export const TransformVec3 = (v: vec3, mat: mat4): vec3 => {
    const x = v[0]
    const y = v[1]
    const z = v[2]

    return create(mat[0] * x + mat[1] * y + mat[2] * z + mat[3], mat[4] * x + mat[5] * y + mat[6] * z + mat[7], mat[8] * x + mat[9] * y + mat[10] * z + mat[11])
}
//Calculate a position between the points specified by current and target, moving no farther than the distance specified by maxDistanceDelta.
/**
 * 
 * @param current The position to move from.
 * @param target The position to move towards.
 * @param maxDistanceDelta:Distance to move current per call.
 * @returns 
 */
export const MoveTowards = (current: vec3, target: vec3, maxDistanceDelta: number): vec3 => {
    const sqrtDist = (target[0] - current[0]) * (target[0] - current[0]) + (target[1] - current[1]) * (target[1] - current[1]) + (target[2] - current[2]) * (target[2] - current[2]);
    if (sqrtDist === 0 || (maxDistanceDelta >= 0 && sqrtDist <= maxDistanceDelta * maxDistanceDelta)) target
    const dist = Math.sqrt(sqrtDist)
    return create(current[0] + (target[0] - current[0]) / dist * maxDistanceDelta, current[1] + (target[1] - current[1]) / dist * maxDistanceDelta, current[2] + (target[2] - current[2]) / dist * maxDistanceDelta)
}
//Reflects a vector off the plane defined by a normal.
export const Reflect = (inDirection: vec3, inNormal: vec3): vec3 => {
    const factor = -2 * dot(inNormal, inDirection)
    return create(
        factor * inNormal[0] + inDirection[0],
        factor * inNormal[1] + inDirection[1],
        factor * inNormal[2] + inDirection[2]
    )
}
/**
 * Rotates a vector current towards target
 * @param current The vector being managed
 * @param target The vector
 * @param maxRadiansDelta The maximum angle in radians allowed for this rotation
 * @param maxMagnitudeDelta The maximum allowed change in vector magnitude for this rotation
 * @returns Vector3 The location that RotateTowards generates
 */
export const RotateTowards = (current: vec3, target: vec3, maxRadiansDelta: number, maxMagnitudeDelta: number): vec3 => {
    const angle = Angle(current, target)
    if (angle === 0) target
    // not finished
    return LerpUnclamped(current, target, Math.min(1, maxRadiansDelta / angle))
}
// Projects a vector onto another vector.
export const Project = (v: vec3, onNormal: vec3): vec3 => {
    let sqrtMag = dot(onNormal, onNormal)
    if (sqrtMag < mathf.kEpsilon) {
        return zero
    }
    else {
        let Dot = dot(v, onNormal)
        return create(v[0] - onNormal[0] * Dot / sqrtMag, v[1] - onNormal[1] * Dot / sqrtMag, v[2] - onNormal[2] * Dot / sqrtMag)
    }
}
/**
 * Projects a vector onto a plane defined by a normal orthogonal to the plane
 * @param planeNormal The direction from the vector towards the plane
 * @param v The location of the vector above the plane
 * @returns Vector3 The location of the vector on the plane
 */
export const ProjectOnPlane = (planeNormal: vec3, v: vec3): vec3 => {
    const sqrtMag = dot(planeNormal, planeNormal)
    if (sqrtMag < mathf.kEpsilon) {
        return v
    }
    else {
        const Dot = dot(v, planeNormal)
        return create(planeNormal[0] * Dot / sqrtMag, planeNormal[1] * Dot / sqrtMag, planeNormal[2] * Dot / sqrtMag)
    }
}
/**
 * Gradually changes a vector towards a desired goal over time
 * The vector is smoothed by some spring-damper like function, which will never overshoot. The most common use is for smoothing a follow camera
 * @param current The current position
 * @param target The position we are trying to reach
 * @param currentVelocity The current velocity, this value is modified by the function every time you call it
 * @param smoothTime Approximately the time it will take to reach the target. A smaller value will reach the target faster
 * @param maxSpeed Optionally allows you to clamp the maximum speed
 * @param deltaTime The time since the last call to this function. By default deltaTime
 * @returns add return descriptions
 */
export const smoothDamps = (current: vec3, target: vec3, currentVelocity: vec3, smoothTime: number, maxSpeed: number, deltaTime: number): vec3 => {
    let output_x = 0;
    let output_y = 0;
    let output_z = 0;

    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime);
    let omega = 2 / smoothTime;

    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

    let change_x = current[0] - target[0];
    let change_y = current[1] - target[1];
    let change_z = current[2] - target[2];
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

    target[0] = current[0] - change_x;
    target[1] = current[1] - change_y;
    target[2] = current[2] - change_z;

    const temp_x = (currentVelocity[0] + omega * change_x) * deltaTime;
    const temp_y = (currentVelocity[1] + omega * change_y) * deltaTime;
    const temp_z = (currentVelocity[2] + omega * change_z) * deltaTime;

    currentVelocity[0] = (currentVelocity[0] - omega * temp_x) * exp;
    currentVelocity[1] = (currentVelocity[1] - omega * temp_y) * exp;
    currentVelocity[2] = (currentVelocity[2] - omega * temp_z) * exp;

    output_x = target[0] + (change_x + temp_x) * exp;
    output_y = target[1] + (change_y + temp_y) * exp;
    output_z = target[2] + (change_z + temp_z) * exp;

    // Prevent overshooting
    const origMinusCurrent_x = originalTo[0] - current[0];
    const origMinusCurrent_y = originalTo[1] - current[1];
    const origMinusCurrent_z = originalTo[2] - current[2];
    const outMinusOrig_x = output_x - originalTo[0];
    const outMinusOrig_y = output_y - originalTo[1];
    const outMinusOrig_z = output_z - originalTo[2];

    if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y + origMinusCurrent_z * outMinusOrig_z > 0) {
        output_x = originalTo[0];
        output_y = originalTo[1];
        output_z = originalTo[2];

        currentVelocity[0] = (output_x - originalTo[0]) / deltaTime;
        currentVelocity[1] = (output_y - originalTo[1]) / deltaTime;
        currentVelocity[2] = (output_z - originalTo[2]) / deltaTime;
    }

    return create(output_x, output_y, output_z);
}
//Returns a vector that is made from the largest components of two vectors.
export const max = (lhs: vec3, rhs: vec3): vec3 => create(Math.max(lhs[0], rhs[0]), Math.max(lhs[1], rhs[1]), Math.max(lhs[2], rhs[2]))
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: vec3, rhs: vec3): vec3 => create(Math.min(lhs[0], rhs[0]), Math.min(lhs[1], rhs[1]), Math.min(lhs[2], rhs[2]))
// bezier curvers
//Bernstein polynomial form
export const bernstein = (t: number) => {
    const p0 = -(t * t * t) + 3 * (t * t) - 3 * t + 1
    const p1 = 3 * (t * t * t) - 6 * (t * t) - 3 * t
    const p2 = -3 * (t * t * t) + 3 * (t * t)
    const p3 = (t * t * t)
    return p0 + p1 + p2 + p3
}
// cubic bezier curve
export const cubicBezier = (p0: vec3, p1: vec3, p2: vec3, p3: vec3, t: number): vec3 => {
    const a = Lerp(p0, p1, t)
    const b = Lerp(p1, p2, t)
    const c = Lerp(p2, p3, t)
    const d = Lerp(a, b, t)
    const e = Lerp(b, c, t)
    return Lerp(d, e, t)
}
// quadratic bezier curve
export const quadBezier = (p0: vec3, p1: vec3, p2: vec3, p3: vec3, p4: vec3, t: number): vec3 => {
    const a = Lerp(p0, p1, t)
    const b = Lerp(p1, p2, t)
    const c = Lerp(p2, p3, t)
    const d = Lerp(p3, p4, t)

    const e = Lerp(a, b, t)
    const f = Lerp(c, d, t)

    return Lerp(e, f, t)
}