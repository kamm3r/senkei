import { Color, Vec2, Vec3, Vec4 } from "../types"

//A very small value, used for various floating point inaccuracy thresholds
export const EPSILON = Number.EPSILON
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
export const Approximately = (a: number, b: number): boolean => Math.abs(b - a) < Math.max(kEpsilon * Math.max(Math.abs(a), Math.abs(a)), kEpsilon * 8)
export const Approximately2 = (a: Vec2, b: Vec2): boolean => Approximately(a.x, b.x) && Approximately(a.y, b.y)
export const Approximately3 = (a: Vec3, b: Vec3): boolean => Approximately(a.x, b.x) && Approximately(a.y, b.y) && Approximately(a.z, b.z)
export const Approximately4 = (a: Vec4, b: Vec4): boolean => Approximately(a.x, b.x) && Approximately(a.y, b.y) && Approximately(a.z, b.z) && Approximately(a.w, b.w)
export const ApproximatelyColor = (a: Color, b: Color): boolean => Approximately(a.r, b.r) && Approximately(a.g, b.g) && Approximately(a.b, b.b) && Approximately(a.a, b.a)