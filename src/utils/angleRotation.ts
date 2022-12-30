import * as Vec2 from "../vec2";
import * as Quat from "../quat";
import type { quat, vec2 } from "../types";
import { clamp01 } from "./clamp";
import { PI, TAU } from "./constants";
import { InverseLerpClamped } from "./interpolation";
import { Repeat } from "./rangeRepeat";
import * as mathf from './'

/**
 * 
 * @param aRad The input angle, in radains
 * @returns Returns the direction of the input angle, as a normalized vector
 */
export const AngToDir = (aRad: number): vec2 => Vec2.create(mathf.Cos(aRad), mathf.Sin(aRad))
/**
 * 
 * @param v The vector to get the angle of. it does not have to be normalized
 * @returns Returns the angle of the vector, in radians. You can also use vector.Angle()
 */
export const DirToAng = (v: vec2): number => mathf.Atan2(v[1], v[0])
/**
 * 
 * @param v The direction to create a 2D orientation from (does not have to be normalized)
 * @returns Returns a 2D orientation from a vector, representing the X axis
 */
export const DirToOrientation = (v: vec2): quat => {
    v = Vec2.normalized(v)
    v[0] += 1
    v = Vec2.normalized(v)
    return Quat.create(0, 0, v[1], v[0])
}

/**
 * 
 * @param velocity velocity The first derivative of the point in the curve
 * @param acceleration accelerationThe second derivative of the point in the curve
 * @returns Returns the signed curvature at a point in a curve, in radians per distance unit (equivalent to the reciprocal radius of the osculating circle)
 */
export const GetCurvature = (velocity: vec2, acceleration: vec2): number => {
    const dMag = Vec2.Magnitude(velocity)
    return Vec2.Determinant(velocity, acceleration) / (dMag * dMag * dMag)
}
//Returns the signed angle between a and b, in the range -tau/2 to tau/2 (-pi to pi)
export const SignedAngle = (a: vec2, b: vec2): number => AngleBetween(a, b) * mathf.Sign(Vec2.Determinant(a, b))
//>Returns the shortest angle between a and b, in the range 0 to tau/2 (0 to pi)
export const AngleBetween = (a: vec2, b: vec2): number => mathf.clampNeg1to1(mathf.Acos(Vec2.Dot(Vec2.normalized(a), Vec2.normalized(b))))
//Returns the clockwise angle between from and to, in the range 0 to tau (0 to 2*pi)
export const AngleFromToCW = (from: vec2, to: vec2): number => Vec2.Determinant(from, to) < 0 ? AngleBetween(from, to) : mathf.TAU - AngleBetween(from, to)
// Returns the counterclockwise angle between from and to, in the range 0 to tau (0 to 2*pi)
export const AngleFromToCCW = (from: vec2, to: vec2): number => Vec2.Determinant(from, to) > 0 ? AngleBetween(from, to) : mathf.TAU - AngleBetween(from, to)
/**
 * 
 * @param a The start value, in radians
 * @param b The end value, in radians
 * @param t The t-value between 0 and 1
 * @returns Blends between the aRad and bRad angles, based on the input t-value between 0 and 1
 */
export const LerpAngle = (aRad: number, bRad: number, t: number): number => {
    let delta = Repeat((bRad - aRad), mathf.TAU)
    if (delta > Math.PI) delta -= mathf.TAU
    return aRad + delta * clamp01(t)
}
// Returns the shortest angle between the two input angles, in radians
export const DeltaAngle = (a: number, b: number): number => Repeat((b - a + PI), TAU) - PI
/**
 * 
 * @param a The start angle of the range (in radians), where it would return 0
 * @param b The end angle of the range (in radians), where it would return 1
 * @param v An angle between a and b
 * @returns Given an angle between a and b, returns its normalized location in that range, as a t-value (interpolant) from 0 to 1
 */
export const InverseLerpAngle = (a: number, b: number, v: number): number => {
    const angBetween = DeltaAngle(b, a)
    b = a + angBetween
    const h = a + angBetween * 0.5
    v = h + DeltaAngle(h, v)
    return InverseLerpClamped(a, b, v)
}
