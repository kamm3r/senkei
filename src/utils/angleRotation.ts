import { Vec2 } from "../Vec2";
import { Quaternion } from "../Quat";
import { clamp01 } from "./clamp";
import { PI, TAU } from "./constants";
import { InverseLerpClamped } from "./interpolation";
import { Repeat } from "./rangeRepeat";
import { Acos, Atan2, Cos, Sin } from "./trigonometry";
import { Sign } from "./signRounding";
import { clampNeg1to1 } from "./Mathf";
import { Determinant } from "./vectorMath";

/**
 *
 * @param aRad The input angle, in radains
 * @returns Returns the direction of the input angle, as a normalized vector
 */
export function AngToDir(aRad: number): Vec2 {
    return new Vec2(Cos(aRad), Sin(aRad))
}
/**
 *
 * @param v The vector to get the angle of. it does not have to be normalized
 * @returns Returns the angle of the vector, in radians. You can also use vector.Angle()
 */
export function DirToAng(v: Vec2): number {
    return Atan2(v.y, v.x)
}
/**
 *
 * @param v The direction to create a 2D orientation from (does not have to be normalized)
 * @returns Returns a 2D orientation from a vector, representing the X axis
 */
export function DirToOrientation(v: Vec2): Quaternion {
    v = v.normalize
    v.x += 1
    v = v.normalize
    return new Quaternion(0, 0, v.y, v.x)
}

/**
 *
 * @param velocity velocity The first derivative of the point in the curve
 * @param acceleration accelerationThe second derivative of the point in the curve
 * @returns Returns the signed curvature at a point in a curve, in radians per distance unit (equivalent to the reciprocal radius of the osculating circle)
 */
export function GetCurvature(velocity: Vec2, acceleration: Vec2): number {
    const dMag = velocity.magnitude
    return Determinant(velocity, acceleration) / (dMag * dMag * dMag)
}
//Returns the signed angle between a and b, in the range -tau/2 to tau/2 (-pi to pi)
export function SignedAngle(a: Vec2, b: Vec2): number {
    return AngleBetween(a, b) * Sign(Determinant(a, b))
}
//Returns the shortest angle between a and b, in the range 0 to tau/2 (0 to pi)
export function AngleBetween(a: Vec2, b: Vec2): number {
    return clampNeg1to1(Acos(Vec2.Dot(a.normalize, b.normalize)))
}
//Returns the clockwise angle between from and to, in the range 0 to tau (0 to 2*pi)
export function AngleFromToCW(from: Vec2, to: Vec2): number {
    return Determinant(from, to) < 0 ? AngleBetween(from, to) : TAU - AngleBetween(from, to)
}
// Returns the counterclockwise angle between from and to, in the range 0 to tau (0 to 2*pi)
export function AngleFromToCCW(from: Vec2, to: Vec2): number {
    return Determinant(from, to) > 0 ? AngleBetween(from, to) : TAU - AngleBetween(from, to)
}
/**
 *
 * @param a The start value, in radians
 * @param b The end value, in radians
 * @param t The t-value between 0 and 1
 * @returns Blends between the aRad and bRad angles, based on the input t-value between 0 and 1
 */
export function LerpAngle(aRad: number, bRad: number, t: number): number {
    let delta = Repeat((bRad - aRad), TAU)
    if (delta > Math.PI) delta -= TAU
    return aRad + delta * clamp01(t)
}
// Returns the shortest angle between the two input angles, in radians
export function DeltaAngle(a: number, b: number): number {
    return Repeat((b - a + PI), TAU) - PI
}
/**
 *
 * @param a The start angle of the range (in radians), where it would return 0
 * @param b The end angle of the range (in radians), where it would return 1
 * @param v An angle between a and b
 * @returns Given an angle between a and b, returns its normalized location in that range, as a t-value (interpolant) from 0 to 1
 */
export function InverseLerpAngle(a: number, b: number, v: number): number {
    const angBetween = DeltaAngle(b, a)
    b = a + angBetween
    const h = a + angBetween * 0.5
    v = h + DeltaAngle(h, v)
    return InverseLerpClamped(a, b, v)
}
