import { Vec2 } from "../Vec2";
import { Vec3 } from "../Vec3";
import { Vec4 } from "../Vec4";
//TODO:Rename to WeightedSum functions to be more clearer
/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by <c>w[0]</c>
 * @param b The second value, weighted by <c>w[1]</c>
 */
export function WeightedSum2(w: Vec2, a: number, b: number): number {
    return a * w.x + b * w.y;
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export function WeightedSum3(w: Vec3, a: number, b: number, c: number): number {
    return a * w.x + b * w.y + c * w.z;
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 * @param d The fourth value, weighted by w[3]
 *
 */
export function WeightedSum4(w: Vec4, a: number, b: number, c: number, d: number) {
    return a * w.x + b * w.y + c * w.z + d * w.w;
}
/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 */
export function WeightedSumvec2(w: Vec2, a: Vec2, b: Vec2): Vec2 {
    const wx = a.x * w.x + b.x * w.y
    const wy = a.y * w.x + b.y * w.y
    return new Vec2(wx, wy)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export function WeightedSumBnH(w: Vec3, a: Vec2, b: Vec2, c: Vec2): Vec2 {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z
    const wy = a.y * w.x + b.y * w.y + c.y * w.z
    return new Vec2(wx, wy)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 * @param d The fourth value, weighted by w[3]
 *
 */
export function WeightedSumSoHo(w: Vec4, a: Vec2, b: Vec2, c: Vec2, d: Vec2): Vec2 {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z + d.x * w.w
    const wy = a.y * w.x + b.y * w.y + c.y * w.z + d.y * w.w
    return new Vec2(wx, wy)
}
/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 */
export function WeightedSumWtf(w: Vec3, a: Vec3, b: Vec3): Vec3 {
    const wx = a.x * w.x + b.x * w.y
    const wy = a.y * w.x + b.y * w.y
    const wz = a.z * w.x + b.z * w.y
    return new Vec3(wx, wy, wz)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export function WeightedSumvec3(w: Vec3, a: Vec3, b: Vec3, c: Vec3): Vec3 {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z;
    const wy = a.y * w.x + b.y * w.y + c.y * w.z;
    const wz = a.z * w.x + b.z * w.y + c.z * w.z;
    return new Vec3(wx, wy, wz)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 * @param d The fourth value, weighted by w[3]
 *
 */
export function WeightedSumZara(w: Vec4, a: Vec3, b: Vec3, c: Vec3, d: Vec3): Vec3 {
    const wx = a.x * w.x + b.x * w.y + c.x * w.y + d.x * w.w;
    const wy = a.y * w.x + b.y * w.y + c.y * w.y + d.y * w.w;
    const wz = a.z * w.x + b.z * w.y + c.z * w.y + d.z * w.w;
    return new Vec3(wx, wy, wz)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 *
 */
export function WeightedSumYo(w: Vec4, a: Vec4, b: Vec4): Vec4 {
    const wx = a.x * w.x + b.x * w.y
    const wy = a.y * w.x + b.y * w.y
    const wz = a.z * w.x + b.z * w.y
    const ww = a.w * w.x + b.w * w.y

    return new Vec4(wx, wy, wz, ww)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export function WeightedSumSup(w: Vec4, a: Vec4, b: Vec4, c: Vec4): Vec4 {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z
    const wy = a.y * w.x + b.y * w.y + c.y * w.z
    const wz = a.z * w.x + b.z * w.y + c.z * w.z
    const ww = a.w * w.x + b.w * w.y + c.w * w.z

    return new Vec4(wx, wy, wz, ww)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 * @param d The fourth value, weighted by w[3]
 *
 */
export function WeightedSumBruh(w: Vec4, a: Vec4, b: Vec4, c: Vec4, d: Vec4): Vec4 {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z + d.x * w.w
    const wy = a.y * w.x + b.y * w.y + c.y * w.z + d.y * w.w
    const wz = a.z * w.x + b.z * w.y + c.z * w.z + d.z * w.w
    const ww = a.w * w.x + b.w * w.y + c.w * w.z + d.w * w.w

    return new Vec4(wx, wy, wz, ww)
}
