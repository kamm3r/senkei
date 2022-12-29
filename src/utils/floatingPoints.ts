import type { color, vec2, vec3, vec4 } from "../types"
import { Max } from "./minMax"
import { Abs } from "./abs"

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
export const Approximately = (a: number, b: number): boolean => Abs(b - a) < Max(kEpsilon * Max(Abs(a), Abs(a)), kEpsilon * 8)
export const Approximately2 = (a: vec2, b: vec2): boolean => Approximately(a[0], b[0]) && Approximately(a[1], b[1])
export const Approximately3 = (a: vec3, b: vec3): boolean => Approximately(a[0], b[0]) && Approximately(a[1], b[1]) && Approximately(a[2], b[2])
export const Approximately4 = (a: vec4, b: vec4): boolean => Approximately(a[0], b[0]) && Approximately(a[1], b[1]) && Approximately(a[2], b[2]) && Approximately(a[3], b[3])
export const ApproximatelyColor = (a: color, b: color): boolean => Approximately(a[0], b[0]) && Approximately(a[1], b[1]) && Approximately(a[2], b[2]) && Approximately(a[3], b[3])