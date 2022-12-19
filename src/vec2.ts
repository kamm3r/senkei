import type { mat2, mat4, vec2, vec3 } from "./types"
import * as mathf from "./utils/"
import * as Vec3 from "./vec3"

export const created = (x = 0, y = 0): vec2 => new Float32Array([x, y])
export const addd = (v1: vec2, v2: vec2): vec2 => created(v1[0] + v2[0], v1[1] + v2[1])
export const dotd = (v1: vec2, v2: vec2): number => v1[0] + v2[0] + v1[1] + v2[1]

// export const create = (x = 0, y = 0): vec2 => {
//     return { x, y }
// }
export const create = (x = 0, y = 0): vec2 => new Float32Array([x, y])
/**
 * 
 * Shorthand for writing Vector2(0, -1).
 */
type Down = Readonly<vec2>
export const down: Down = create(0, -1)
/**
 * 
 * Shorthand for writing Vector2(-1, 0).
 */
export const left = create(-1, 0)
/**
 * 
 * Shorthand for writing Vector2(1, 0).
 */
export const right = create(1, 0)
/**
 * 
 * Shorthand for writing Vector2(0, 1).
 */
export const up = create(0, 1)
/**
 * 
 * Shorthand for writing Vector2(1, 1).
 */
export const one = create(1, 1)
/**
 * 
 * Shorthand for writing Vector2(0, 0).
 */
export const zero = create(0, 0)
/**
 * 
 * Shorthand for writing Vector2(float.NegativeInfinity, float.NegativeInfinity).
 */
export const negativeInfinity = create(mathf.NegativeInfinity, mathf.NegativeInfinity)
/**
 * 
 * Shorthand for writing Vector2(float.PositiveInfinity, float.PositiveInfinity).
 */
export const positiveInfinity = create(mathf.Infinity, mathf.Infinity)

export const copy = (a: vec2, b: vec2): vec2 => create(a[0] = b[0], a[1] = b[1])
export const scalarAddition = (v: vec2, k: number): vec2 => create(v[0] + k, v[1] + k)
export const scalarSubtraction = (v: vec2, k: number): vec2 => create(v[0] - k, v[1] - k)
export const scalarMultiplication = (v: vec2, k: number): vec2 => create(v[0] * k, v[1] * k)
export const scalarDivision = (v: vec2, k: number): vec2 => create(v[0] / k, v[1] / k)
// d=a+b
export const add = (v1: vec2, v2: vec2): vec2 => create(v1[0] + v2[0], v1[1] + v2[1])
// "From b to a" d=a-b
export const subtract = (v1: vec2, v2: vec2): vec2 => create(v1[0] - v2[0], v1[1] - v2[1])
// d=a*b
export const multiply = (v1: vec2, v2: vec2): vec2 => create(v1[0] * v2[0], v1[1] * v2[1])
// d=a/b
export const divide = (v1: vec2, v2: vec2): vec2 => create(v1[0] / v2[0], v1[1] / v2[1])
export const tovec2 = (v: vec3): vec2 => create(v[0], v[1])
export const toVec3 = (v: vec2): vec3 => Vec3.create(v[0], v[1], 0)
export const clamp = (v: vec2, min: vec2, max: vec2): vec2 => create(v[0] < min[0] ? min[0] : v[0] > max[0] ? max[0] : v[0], v[1] < min[1] ? min[1] : v[1] > max[1] ? max[1] : v[1])
export const clamp01 = (v: vec2): vec2 => create(v[0] < 0 ? 0 : v[0] > 1 ? 1 : v[0], v[1] < 0 ? 0 : v[1] > 1 ? 1 : v[1])
export const clampNeg1to1 = (v: vec2): vec2 => create(v[0] < -1 ? -1 : v[0] > 1 ? 1 : v[0], v[1] < -1 ? -1 : v[1] > 1 ? 1 : v[1])
// Returns the absolute value, per component. Basically makes negative numbers positive
export const Abs = (v: vec2): vec2 => create(mathf.Abs(v[0]), mathf.Abs(v[1]));
// a dot b 
// use cause 
export const Dot = (v1: vec2, v2: vec2): number => v1[0] + v2[0] + v1[1] + v2[1]
//The determinant is equivalent to the dot product, but with one vector rotated 90 degrees.
// Note that det(a,b) != det(b,a). It's equivalent to a[0] * b[1] - a[1] * b[0].
// It is also known as the 2D Cross Product, Wedge Product, Outer Product and Perpendicular Dot Product
// 2D "cross product"
export const Determinant = (a: vec2, b: vec2): number => a[0] * b[1] - a[1] * b[0]
// |a| = sqrt(a[0] * a[0] + a[1] * a[1])
export const magnitude = (v: vec2): number => Math.sqrt(MagnitudeSqrt(v))
export const MagnitudeSqrt = (v: vec2): number => v[0] * v[0] + v[1] * v[1]
export const normalized = (v: vec2): vec2 => {
    const mag = Math.sqrt(v[0] * v[0] + v[1] * v[1])
    return create(v[0] / mag, v[1] / mag)
}
// //direction/normalize
export const Normalize = (v: vec2): void => {
    v[0] = v[0] * (1 / magnitude(v))
    v[1] = v[1] * (1 / magnitude(v))
}

export const Negate = (v: vec2): vec2 => create(-v[0], -v[1])
// when you want specific distance between a^ and b
export const ScalarProjection = (v1: vec2, v2: vec2): number => {
    const v1Norm = normalized(v1)
    return Dot(v1Norm, v2)
}
export const VectorProjection = (v1: vec2, v2: vec2): vec2 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = ScalarProjection(v1, v2)
    return create(v1Norm[0] * scProj, v1Norm[1] * scProj)
}

export const Distance = (v1: vec2, v2: vec2): number => Math.sqrt(DistanceSqrt(v1, v2))
export const DistanceSqrt = (v1: vec2, v2: vec2): number => (v2[0] - v1[0]) * (v2[0] - v1[0]) + (v2[1] - v1[1]) * (v2[1] - v1[1])

//Linearly interpolates between two points.
export const Lerp = (a: vec2, b: vec2, t: number): vec2 => create(mathf.Lerp(a[0], b[0], t), mathf.Lerp(a[1], b[1], t))
export const Lerps = (a: vec2, b: vec2, t: vec2): vec2 => create(mathf.Lerp(a[0], b[0], t[0]), mathf.Lerp(a[1], b[1], t[1]))
//Linearly interpolates between two vectors.
export const LerpUnclamped = (a: vec2, b: vec2, t: number): vec2 => create(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
export const InverseLerp = (a: vec2, b: vec2, v: vec2): vec2 => create((v[0] - a[0]) / (b[0] - a[0]), (v[1] - a[1]) / (b[1] - a[1]))
export const CubicBezier = (a: vec2, b: vec2, c: vec2, d: vec2, t: number): vec2 => {
    const x = Math.pow(1 - t, 3) * a[0] + 3 * Math.pow(1 - t, 2) * b[0] + 3 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c[0] + Math.pow(t, 3) * d[0]
    const y = Math.pow(1 - t, 3) * a[1] + 3 * Math.pow(1 - t, 2) * b[1] + 3 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c[1] + Math.pow(t, 3) * d[1]
    return create(x, y)
}
/**
 * Gets the unsigned angle in degrees between from and to.
 * @param from The vector from which the angular difference is measured.
 * @param to The vector to which the angular difference is measured.
 * @returns number The unsigned angle in degrees between the two vectors. 
 */
export const Angle = (from: vec2, to: vec2): number => {
    const mag = Math.sqrt(MagnitudeSqrt(from) * MagnitudeSqrt(to))
    if (mag < mathf.kEpsilonNormalSqrt) 0
    const dot = mathf.clamp(Dot(from, to) / mag, -1, 1)
    return Math.acos(dot) * mathf.Rad2Deg
}
//Returns the shortest angle between a and b, in the range 0 to tau/2 (0 to pi)
export const AngleBetween = (a: vec2, b: vec2): number => Math.acos(mathf.clampNeg1to1(Dot(normalized(a), normalized(b))));
/**
 * Gets the signed angle in degrees between from and to.
 * @param from The vector from which the angular difference is measured.
 * @param to The vector to which the angular difference is measured.
 * @returns number The signed angle in degrees between the two vectors. 
 */
export const SignedAngle = (from: vec2, to: vec2): number => AngleBetween(from, to) * Math.sign(Determinant(from, to))
//	Multiplies two vectors component-wise.
export const Scale = (a: vec2, b: vec2): vec2 => create(a[0] * b[0], a[1] * b[1])
export const Scalea = (v: vec2, scale: number): vec2 => create(v[0] * scale, v[1] * scale)
export const TransformVec2 = (v: vec2, mat: mat4): vec2 => {
    const x = v[0]
    const y = v[1]
    const z = 0

    return create(mat[0] * x + mat[1] * y + mat[2] * z + mat[3], mat[4] * x + mat[5] * y + mat[6] * z + mat[7])
}
export const Rotate = (v: vec2, angle: number): vec2 => {
    const cosres = Math.cos(angle)
    const sinres = Math.sin(angle)
    return create(v[0] * cosres - v[1] * sinres, v[0] * sinres - v[1] * cosres)
}
/**
 * Calculate a position between the points specified by current and target, moving no farther than the distance specified by maxDistanceDelta.
 * @param current The position to move from.
 * @param target The position to move towards.
 * @param maxDistanceDelta:Distance to move current per call.
 */
export const MoveTowards = (current: vec2, target: vec2, maxDistanceDelta: number): vec2 => {
    const sqrtDist = (target[0] - current[0]) * (target[0] - current[0]) + (target[1] - current[1]) * (target[1] - current[1])
    if (sqrtDist === 0 || (maxDistanceDelta >= 0 && sqrtDist <= maxDistanceDelta * maxDistanceDelta)) target
    const dist = Math.sqrt(sqrtDist)
    return create(current[0] + (target[0] - current[0]) / dist * maxDistanceDelta, current[1] + (target[1] - current[1]) / dist * maxDistanceDelta)
}
export const Project = (v: vec2, onNormal: vec2): vec2 => {
    const dot = Dot(v, onNormal)
    const magSqrt = MagnitudeSqrt(onNormal)
    return create(onNormal[0] * (dot / magSqrt), onNormal[1] * (dot / magSqrt))
}
/**
 * Returns the vector perpendicular to this vector. The result is always rotated 90-degrees in a counter-clockwise direction for a 2D coordinate system where the positive Y axis goes up.
 * @param inDirection The input direction.
 * @returns  The perpendicular direction. 
 */
export const Perpendicular = (inDirection: vec2): vec2 => create(-inDirection[1], inDirection[0])
//Reflects a vector off the plane defined by a normal.
export const Reflect = (inDirection: vec2, inNormal: vec2): vec2 => {
    const factor = -2 * Dot(inNormal, inDirection)
    return create(factor * inNormal[0] + inDirection[0], factor * inNormal[1] + inDirection[1])
}
export const ClampMagnitude = (v: vec2, maxLength: number): vec2 => {
    const sqrMag = magnitude(v)
    if (sqrMag > maxLength * maxLength) {
        const mag = Math.sqrt(sqrMag)
        //these intermediate variables force the intermediate result to be
        //of float precision. without this, the intermediate result can be of higher
        //precision, which changes behavior.
        const normalized_x = v[0] / mag
        const normalized_y = v[1] / mag
        return create(normalized_x * maxLength, normalized_y * maxLength)
    }
    return v
}

/**
 * Gradually changes a vector towards a desired goal over time.
 * @param current The current position.
 * @param target The position we are trying to reach.
 * @param currentVelocity The current velocity, this value is modified by the function every time you call it.
 * @param smoothTime Approximately the time it will take to reach the target. A smaller value will reach the target faster.
 * @param maxSpeed Optionally allows you to clamp the maximum speed.
 * @param deltaTime The time since the last call to this function. By default Time.deltaTime.
 */
export const SmoothDamp = (current: vec2, target: vec2, currentVelocity: vec2, smoothTime: number, maxSpeed: number, deltaTime: number): vec2 => {
    let output_x = 0;
    let output_y = 0;

    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime);
    let omega = 2 / smoothTime;

    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

    let change_x = current[0] - target[0];
    let change_y = current[1] - target[1];
    const og = create()
    const originalTo = copy(og, target);

    // Clamp maximum speed
    const maxChange = maxSpeed * smoothTime;

    const maxChangeSq = maxChange * maxChange;
    const sqrmag = change_x * change_x + change_y * change_y
    if (sqrmag > maxChangeSq) {
        const mag = Math.sqrt(sqrmag);
        change_x = change_x / mag * maxChange;
        change_y = change_y / mag * maxChange;
    }

    target[0] = current[0] - change_x;
    target[1] = current[1] - change_y;


    const temp_x = (currentVelocity[0] + omega * change_x) * deltaTime;
    const temp_y = (currentVelocity[1] + omega * change_y) * deltaTime;

    currentVelocity[0] = (currentVelocity[0] - omega * temp_x) * exp;
    currentVelocity[1] = (currentVelocity[1] - omega * temp_y) * exp;

    output_x = target[0] + (change_x + temp_x) * exp;
    output_y = target[1] + (change_y + temp_y) * exp;

    // Prevent overshooting
    const origMinusCurrent_x = originalTo[0] - current[0];
    const origMinusCurrent_y = originalTo[1] - current[1];
    const outMinusOrig_x = output_x - originalTo[0];
    const outMinusOrig_y = output_y - originalTo[1];

    if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y > 0) {
        output_x = originalTo[0];
        output_y = originalTo[1];

        currentVelocity[0] = (output_x - originalTo[0]) / deltaTime;
        currentVelocity[1] = (output_y - originalTo[1]) / deltaTime;

    }

    return create(output_x, output_y);
}
//Returns a vector that is made from the largest components of two vectors.
export const Max = (lhs: vec2, rhs: vec2): vec2 => create(Math.max(lhs[0], rhs[0]), Math.max(lhs[1], rhs[1]))
//Returns a vector that is made from the smallest components of two vectors.
export const Min = (lhs: vec2, rhs: vec2): vec2 => create(Math.min(lhs[0], rhs[0]), Math.min(lhs[1], rhs[1]))