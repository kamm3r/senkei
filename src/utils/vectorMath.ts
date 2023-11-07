import { Vec2 } from "../Vec2";
import { Square } from "./Mathf";
import { Abs } from "./abs";
import { Max } from "./minMax";
//The determinant is equivalent to the dot product, but with one vector rotated 90 degrees.
// Note that det(a,b) != det(b,a). It's equivalent to a.x * b.y - a.y * b.x.
// It is also known as the 2D Cross Product, Wedge Product, Outer Product and Perpendicular Dot Product
// 2D "cross product"
export function Determinant(a: Vec2, b: Vec2): number {
    return a.x * b.y - a.y * b.x;
}
//Returns the direction and magnitude of the vector. Cheaper than calculating length and normalizing it separately
export function GetDirAndMag(v: Vec2): { dir: Vec2, magnitude: number } {
    const mag = v.magnitude;
    return { dir: new Vec2(v.x / mag, v.y / mag), magnitude: mag }
}
/**
 * Clamps the length of the vector between <c>min</c> and <c>max</c>
 * @param v The vector to clamp
 * @param min Minimum length
 * @param max Maximum length
 *
 */
export function ClampMagnitude(v: Vec2, min: number, max: number): Vec2 {
    const mag = v.magnitude;
    return new Vec2(mag < min ? (v.x / mag) * min : mag > max ? (v.x / mag) * max : v.x, mag < min ? (v.y / mag) * min : mag > max ? (v.y / mag) * max : v.y);
}
// Returns the chebyshev distance between the two vectors
export function ChebyshevDistance(a: Vec2, b: Vec2): number {
    return Max(Abs(a.x - b.x), Abs(a.y - b.y))
}
//Returns the taxicab/rectilinear distance between the two vectors
export function TaxicabDistance(a: Vec2, b: Vec2): number {
    return Abs(a.x - b.x) + Abs(a.y - b.y)
}
// Returns the average/center of the two input vectors
export function Average(a: Vec2, b: Vec2): Vec2 {
    return new Vec2((a.x + b.x) / 2, (a.y + b.y) / 2)
}
// Returns the average/halfway direction between the two input direction vectors. Note that this presumes both <c>aDir</c> and <c>bDir</c> have the same length
export function AverageDir(aDir: Vec2, bDir: Vec2): Vec2 {
    return new Vec2(aDir.x + bDir.x, aDir.y + bDir.y).normalize
}
//Returns the squared distance between two points. This is faster than the actual distance, and is useful when comparing distances where the absolute distance doesn't matter
export function DistanceSquared(a: Vec2, b: Vec2): number {
    return Square(a.x - b.x) + Square(a.y - b.y);
}
