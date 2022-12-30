import type { vec2 } from "../types";
import * as Vec2 from "../vec2";
import * as Mathf from "../utils/Mathf";
import { Abs } from "./abs";
import { Max } from "./minMax";
//The determinant is equivalent to the dot product, but with one vector rotated 90 degrees.
// Note that det(a,b) != det(b,a). It's equivalent to a.x * b.y - a.y * b.x.
// It is also known as the 2D Cross Product, Wedge Product, Outer Product and Perpendicular Dot Product
// 2D "cross product"
export const Determinant = (a: vec2, b: vec2): number => a[0] * b[1] - a[1] * b[0]

//Returns the direction and magnitude of the vector. Cheaper than calculating length and normalizing it separately
export const GetDirAndMag = (v: vec2): { dir: vec2, magnitude: number } => {
    const mag = Vec2.Magnitude(v)
    return { dir: Vec2.create(v[0] / mag, v[1] / mag), magnitude: mag }
}
/**
 * Clamps the length of the vector between <c>min</c> and <c>max</c>
 * @param v The vector to clamp
 * @param min Minimum length
 * @param max Maximum length
 * 
 */
export const ClampMagnitude = (v: vec2, min: number, max: number): vec2 => {
    const mag = Vec2.Magnitude(v);
    return Vec2.create(mag < min ? (v[0] / mag) * min : mag > max ? (v[0] / mag) * max : v[0], mag < min ? (v[1] / mag) * min : mag > max ? (v[1] / mag) * max : v[1]);
}
// Returns the chebyshev distance between the two vectors
export const ChebyshevDistance = (a: vec2, b: vec2): number => Max(Abs(a[0] - b[0]), Abs(a[1] - b[1]))
//Returns the taxicab/rectilinear distance between the two vectors
export const TaxicabDistance = (a: vec2, b: vec2): number => Abs(a[0] - b[0]) + Abs(a[1] - b[1])
// Returns the average/center of the two input vectors
export const Average = (a: vec2, b: vec2): vec2 => Vec2.create((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
// Returns the average/halfway direction between the two input direction vectors. Note that this presumes both <c>aDir</c> and <c>bDir</c> have the same length
export const AverageDir = (aDir: vec2, bDir: vec2): vec2 => Vec2.normalized(Vec2.create(aDir[0] + bDir[0], aDir[1] + bDir[1]))
//Returns the squared distance between two points. This is faster than the actual distance, and is useful when comparing distances where the absolute distance doesn't matter
export const DistanceSquared = (a: vec2, b: vec2): number => Mathf.Square(a[0] - b[0]) + Mathf.Square(a[1] - b[1]);