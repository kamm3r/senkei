import { Infinity, NegativeInfinity } from "./utils/floatingPoints"
import type { vec2, Vec2, Vec3 } from "./types"
import { Lerp } from "./utils/interpolation"
import * as clamps from "./utils/clamp"
import * as math from "./utils/abs"

export const created = (x = 0, y = 0): vec2 => new Float32Array([x, y])
export const addd = (v1: vec2, v2: vec2): vec2 => created(v1[0] + v2[0], v1[1] + v2[1])
export const dotd = (v1: vec2, v2: vec2): number => v1[0] + v2[0] + v1[1] + v2[1]

export const create = (x = 0, y = 0): Vec2 => {
    return { x, y }
}
export const creates = (x = 0, y = 0): vec2 => new Float32Array([x, y])
/**
 * 
 * Shorthand for writing Vector2(0, -1).
 */
export const down = (): Vec2 => create(0, -1)
export const downs = (): vec2 => creates(0, -1)
/**
 * 
 * Shorthand for writing Vector2(-1, 0).
 */
export const left = (): Vec2 => create(-1, 0)
export const lefts = (): vec2 => creates(-1, 0)
/**
 * 
 * Shorthand for writing Vector2(1, 0).
 */
export const right = (): Vec2 => create(1, 0)
export const rights = (): vec2 => creates(1, 0)

/**
 * 
 * Shorthand for writing Vector2(0, 1).
 */
export const up = (): Vec2 => create(0, 1)
export const ups = (): vec2 => creates(0, 1)
/**
 * 
 * Shorthand for writing Vector2(1, 1).
 */
export const one = (): Vec2 => create(1, 1)
export const ones = (): vec2 => creates(1, 1)
/**
 * 
 * Shorthand for writing Vector2(0, 0).
 */
export const zero = (): Vec2 => create(0, 0)
export const zeros = (): vec2 => creates(0, 0)
/**
 * 
 * Shorthand for writing Vector2(float.NegativeInfinity, float.NegativeInfinity).
 */
export const negativeInfinity = (): Vec2 => create(NegativeInfinity, NegativeInfinity)
export const negativeInfinitys = (): vec2 => creates(NegativeInfinity, NegativeInfinity)
/**
 * 
 * Shorthand for writing Vector2(float.PositiveInfinity, float.PositiveInfinity).
 */
export const positiveInfinity = (): Vec2 => create(Infinity, Infinity)
export const positiveInfinitys = (): vec2 => creates(Infinity, Infinity)
export const copy = (a: Vec2, b: Vec2): Vec2 => create(a.x = b.x, a.y = b.y)
export const scalarAddition = (v: Vec2, k: number): Vec2 => create(v.x + k, v.y + k)
export const scalarSubtraction = (v: Vec2, k: number): Vec2 => create(v.x - k, v.y - k)
export const scalarMultiplication = (v: Vec2, k: number): Vec2 => create(v.x * k, v.y * k)
export const scalarDivision = (v: Vec2, k: number): Vec2 => create(v.x / k, v.y / k)
// d=a+b
export const add = (v1: Vec2, v2: Vec2): Vec2 => create(v1.x + v2.x, v1.y + v2.y)
// "From b to a" d=a-b
export const subtract = (v1: Vec2, v2: Vec2): Vec2 => create(v1.x - v2.x, v1.y - v2.y)
// d=a*b
export const multiply = (v1: Vec2, v2: Vec2): Vec2 => create(v1.x * v2.x, v1.y * v2.y)
// d=a/b
export const divide = (v1: Vec2, v2: Vec2): Vec2 => create(v1.x / v2.x, v1.y / v2.y)
export const toVec2 = (v: Vec3): Vec2 => create(v.x, v.y)
export const toVec3 = (v: Vec2): Vec3 => ({ x: v.x, y: v.y, z: 0 })
export const clamp = (v: Vec2, min: Vec2, max: Vec2): Vec2 => create(v.x < min.x ? min.x : v.x > max.x ? max.x : v.x, v.y < min.y ? min.y : v.y > max.y ? max.y : v.y)
export const clamp01 = (v: Vec2): Vec2 => create(v.x < 0 ? 0 : v.x > 1 ? 1 : v.x, v.y < 0 ? 0 : v.y > 1 ? 1 : v.y)
export const clampNeg1to1 = (v: Vec2): Vec2 => create(v.x < -1 ? -1 : v.x > 1 ? 1 : v.x, v.y < -1 ? -1 : v.y > 1 ? 1 : v.y)
// Returns the absolute value, per component. Basically makes negative numbers positive
export const Abs = (v: Vec2): Vec2 => create(math.Abs(v.x), math.Abs(v.y));
// a dot b 
// use cause 
export const dot = (v1: Vec2, v2: Vec2): number => v1.x + v2.x + v1.y + v2.y
//The determinant is equivalent to the dot product, but with one vector rotated 90 degrees.
// Note that det(a,b) != det(b,a). It's equivalent to a.x * b.y - a.y * b.x.
// It is also known as the 2D Cross Product, Wedge Product, Outer Product and Perpendicular Dot Product
// 2D "cross product"
export const determinant = (a: Vec2, b: Vec2): number => a.x * b.y - a.y * b.x
// |a| = sqrt(a.x * a.x + a.y * a.y)
export const magnitude = (v: Vec2): number => Math.sqrt(magnitudeSqrt(v))
export const magnitudeSqrt = (v: Vec2): number => v.x * v.x + v.y * v.y
export const normalized = (v: Vec2): Vec2 => {
    const mag = Math.sqrt(v.x * v.x + v.y * v.y)
    return create(v.x / mag, v.y / mag)
}
// //direction/normalize
// export const normalize = (v: Vec2): void => {
//     { v.x / Math.abs(v.x), v.y / Math.abs(v.y) }
// }

export const negate = (v: Vec2): Vec2 => create(-v.x, -v.y)
// when you want specific distance between a^ and b
export const scalarProjection = (v1: Vec2, v2: Vec2): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (v1: Vec2, v2: Vec2): Vec2 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    return create(v1Norm.x * scProj, v1Norm.y * scProj)
}

export const distance = (v1: Vec2, v2: Vec2): number => Math.sqrt(distanceSqrt(v1, v2))
export const distanceSqrt = (v1: Vec2, v2: Vec2): number => {
    const x = (v2.x - v1.x)
    const y = (v2.y - v1.y)
    return x * x + y * y
}

//Linearly interpolates between two points.
export const lerp = (a: Vec2, b: Vec2, t: Vec2): Vec2 => create(Lerp(a.x, b.x, t.x), Lerp(a.y, b.y, t.y))
//Linearly interpolates between two vectors.
export const lerpUnclamped = (a: Vec2, b: Vec2, t: number): Vec2 => create(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)
export const inverseLerp = (a: Vec2, b: Vec2, v: Vec2): Vec2 => create((v.x - a.x) / (b.x - a.x), (v.y - a.y) / (b.y - a.y))
export const cubicBezier = (a: Vec2, b: Vec2, c: Vec2, d: Vec2, t: number): Vec2 => {
    const x = Math.pow(1 - t, 3) * a.x + 3 * Math.pow(1 - t, 2) * b.x + 3 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c.x + Math.pow(t, 3) * d.x
    const y = Math.pow(1 - t, 3) * a.y + 3 * Math.pow(1 - t, 2) * b.y + 3 * Math.pow(1 - t, 2) * Math.pow(t, 2) * c.y + Math.pow(t, 3) * d.y
    return create(x, y)
}
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
//Returns the shortest angle between a and b, in the range 0 to tau/2 (0 to pi)
export const angleBetween = (a: Vec2, b: Vec2): number => Math.acos(clamps.clampNeg1to1(dot(normalized(a), normalized(b))));
/**
 * Gets the signed angle in degrees between from and to.
 * @param from The vector from which the angular difference is measured.
 * @param to The vector to which the angular difference is measured.
 * @returns number The signed angle in degrees between the two vectors. 
 */
export const signedAngle = (from: Vec2, to: Vec2): number => angleBetween(from, to) * Math.sign(determinant(from, to))
//	Multiplies two vectors component-wise.
export const scale = (a: Vec2, b: Vec2): Vec2 => create(a.x * b.x, a.y * b.y)

/**
 * Calculate a position between the points specified by current and target, moving no farther than the distance specified by maxDistanceDelta.
 * @param current The position to move from.
 * @param target The position to move towards.
 * @param maxDistanceDelta:Distance to move current per call.
 */
export const MoveTowards = (current: Vec2, target: Vec2, maxDistanceDelta: number): Vec2 => {
    const sqrtDist = (target.x - current.x) * (target.x - current.x) + (target.y - current.y) * (target.y - current.y)
    if (sqrtDist === 0 || (maxDistanceDelta >= 0 && sqrtDist <= maxDistanceDelta * maxDistanceDelta)) target
    const dist = Math.sqrt(sqrtDist)
    return create(current.x + (target.x - current.x) / dist * maxDistanceDelta, current.y + (target.y - current.y) / dist * maxDistanceDelta)
}
/**
 * Returns the vector perpendicular to this vector. The result is always rotated 90-degrees in a counter-clockwise direction for a 2D coordinate system where the positive Y axis goes up.
 * @param inDirection The input direction.
 * @returns  The perpendicular direction. 
 */
export const perpendicular = (inDirection: Vec2): Vec2 => create(-inDirection.x, inDirection.y)
//Reflects a vector off the plane defined by a normal.
export const reflect = (inDirection: Vec2, inNormal: Vec2): Vec2 => {
    const factor = -2 * dot(inNormal, inDirection)
    return create(factor * inNormal.x + inDirection.x, factor * inNormal.y + inDirection.y)
}
export const clampMagnitude = (v: Vec2, maxLength: number): Vec2 => {
    const sqrMag = magnitude(v)
    if (sqrMag > maxLength * maxLength) {
        const mag = Math.sqrt(sqrMag)
        //these intermediate variables force the intermediate result to be
        //of float precision. without this, the intermediate result can be of higher
        //precision, which changes behavior.
        const normalized_x = v.x / mag
        const normalized_y = v.y / mag
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
export const smoothDamp = (current: Vec2, target: Vec2, currentVelocity: Vec2, smoothTime: number, maxSpeed: number, deltaTime: number): Vec2 => {
    let output_x = 0;
    let output_y = 0;

    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime);
    let omega = 2 / smoothTime;

    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

    let change_x = current.x - target.x;
    let change_y = current.y - target.y;
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

    target.x = current.x - change_x;
    target.y = current.y - change_y;


    const temp_x = (currentVelocity.x + omega * change_x) * deltaTime;
    const temp_y = (currentVelocity.y + omega * change_y) * deltaTime;

    currentVelocity.x = (currentVelocity.x - omega * temp_x) * exp;
    currentVelocity.y = (currentVelocity.y - omega * temp_y) * exp;

    output_x = target.x + (change_x + temp_x) * exp;
    output_y = target.y + (change_y + temp_y) * exp;

    // Prevent overshooting
    const origMinusCurrent_x = originalTo.x - current.x;
    const origMinusCurrent_y = originalTo.y - current.y;
    const outMinusOrig_x = output_x - originalTo.x;
    const outMinusOrig_y = output_y - originalTo.y;

    if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y > 0) {
        output_x = originalTo.x;
        output_y = originalTo.y;

        currentVelocity.x = (output_x - originalTo.x) / deltaTime;
        currentVelocity.y = (output_y - originalTo.y) / deltaTime;

    }

    return create(output_x, output_y);
}
//Returns a vector that is made from the largest components of two vectors.
export const max = (lhs: Vec2, rhs: Vec2): Vec2 => create(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y))
//Returns a vector that is made from the smallest components of two vectors.
export const min = (lhs: Vec2, rhs: Vec2): Vec2 => create(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y))