import { Max } from "./minMax"
import { Abs } from "./abs"
import { Vec2 } from "../Vec2"
import { Vec3 } from "../Vec3"
import { Vec4 } from "../Vec4"

//A very small value, used for various floating point inaccuracy thresholds
export const Epsilon = Number.EPSILON
export const kEpsilon = 0.000001
export const kEpsilonNormalSqrt = 1e-15
// Positive Infinity
export const Infinity = Number.POSITIVE_INFINITY
// Negative Infinity
export const NegativeInfinity = Number.NEGATIVE_INFINITY
/**
 *
 * @param a The first value to compar
 * @param b The second value to compar
 * @returns Returns whether or not two values are approximately equal. They are considered equal if they are within a Epsilon*8 or max(a,b)*0.000001f range of each other
 */
export function Approximately(a: number, b: number): boolean {
    return Abs(b - a) < Max(kEpsilon * Max(Abs(a), Abs(a)), kEpsilon * 8)
}
export function Approximately2(a: Vec2, b: Vec2): boolean {
    return Approximately(a.x, b.x) && Approximately(a.y, b.y)
}
export function Approximately3(a: Vec3, b: Vec3): boolean {
    return Approximately(a.x, b.x) && Approximately(a.y, b.y) && Approximately(a.z, b.z)
}
export function Approximately4(a: Vec4, b: Vec4): boolean {
    return Approximately(a.x, b.x) && Approximately(a.y, b.y) && Approximately(a.z, b.z) && Approximately(a.w, b.w)
}
