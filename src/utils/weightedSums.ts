import type { vec2, vec3, vec4 } from "../types";
import * as Vec2 from "../vec2";
import * as Vec3 from "../vec3";
import * as Vec4 from "../vec4";

/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by <c>w[0]</c>
 * @param b The second value, weighted by <c>w[1]</c>
 */
export const WeightedSum2 = (w: vec2, a: number, b: number): number => a * w[0] + b * w[1];
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export const WeightedSum3 = (w: vec3, a: number, b: number, c: number): number => a * w[0] + b * w[1] + c * w[2];
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 * @param d The fourth value, weighted by w[3]
 *
 */
export const WeightedSum4 = (w: vec4, a: number, b: number, c: number, d: number) => a * w[0] + b * w[1] + c * w[2] + d * w[3];
/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 */
export const WeightedSumvec2 = (w: vec2, a: vec2, b: vec2): vec2 => {
    const wx = a[0] * w[0] + b[0] * w[1]
    const wy = a[1] * w[0] + b[1] * w[1]
    return Vec2.create(wx, wy)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export const WeightedSumBnH = (w: vec3, a: vec2, b: vec2, c: vec2): vec2 => {
    const wx = a[0] * w[0] + b[0] * w[1] + c[0] * w[2]
    const wy = a[1] * w[0] + b[1] * w[1] + c[1] * w[2]
    return Vec2.create(wx, wy)
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
export const WeightedSumSoHo = (w: vec4, a: vec2, b: vec2, c: vec2, d: vec2): vec2 => {
    const wx = a[0] * w[0] + b[0] * w[1] + c[0] * w[2] + d[0] * w[3]
    const wy = a[1] * w[0] + b[1] * w[1] + c[1] * w[2] + d[1] * w[3]
    return Vec2.create(wx, wy)
}
/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 */
export const WeightedSumWtf = (w: vec3, a: vec3, b: vec3): vec3 => {
    const wx = a[0] * w[0] + b[0] * w[1]
    const wy = a[1] * w[0] + b[1] * w[1]
    const wz = a[2] * w[0] + b[2] * w[1]
    return Vec3.create(wx, wy, wz)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export const WeightedSumvec3 = (w: vec3, a: vec3, b: vec3, c: vec3): vec3 => {
    const wx = a[0] * w[0] + b[0] * w[1] + c[0] * w[2];
    const wy = a[1] * w[0] + b[1] * w[1] + c[1] * w[2];
    const wz = a[2] * w[0] + b[2] * w[1] + c[2] * w[2];
    return Vec3.create(wx, wy, wz)
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
export const WeightedSumZara = (w: vec4, a: vec3, b: vec3, c: vec3, d: vec3): vec3 => {
    const wx = a[0] * w[0] + b[0] * w[1] + c[0] * w[2] + d[0] * w[3];
    const wy = a[1] * w[0] + b[1] * w[1] + c[1] * w[2] + d[1] * w[3];
    const wz = a[2] * w[0] + b[2] * w[1] + c[2] * w[2] + d[2] * w[3];
    return Vec3.create(wx, wy, wz)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 *
 */
export const WeightedSumYo = (w: vec4, a: vec4, b: vec4): vec4 => {
    const wx = a[0] * w[0] + b[0] * w[1]
    const wy = a[1] * w[0] + b[1] * w[1]
    const wz = a[2] * w[0] + b[2] * w[1]
    const ww = a[3] * w[0] + b[3] * w[1]

    return Vec4.create(wx, wy, wz, ww)
}
/**
 * Multiplies each component of w by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w[0]
 * @param b The second value, weighted by w[1]
 * @param c The third value, weighted by w[2]
 *
 */
export const WeightedSumSup = (w: vec4, a: vec4, b: vec4, c: vec4): vec4 => {
    const wx = a[0] * w[0] + b[0] * w[1] + c[0] * w[2]
    const wy = a[1] * w[0] + b[1] * w[1] + c[1] * w[2]
    const wz = a[2] * w[0] + b[2] * w[1] + c[2] * w[2]
    const ww = a[3] * w[0] + b[3] * w[1] + c[3] * w[2]

    return Vec4.create(wx, wy, wz, ww)
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
export const WeightedSumBruh = (w: vec4, a: vec4, b: vec4, c: vec4, d: vec4): vec4 => {
    const wx = a[0] * w[0] + b[0] * w[1] + c[0] * w[2] + d[0] * w[3]
    const wy = a[1] * w[0] + b[1] * w[1] + c[1] * w[2] + d[1] * w[3]
    const wz = a[2] * w[0] + b[2] * w[1] + c[2] * w[2] + d[2] * w[3]
    const ww = a[3] * w[0] + b[3] * w[1] + c[3] * w[2] + d[3] * w[3]

    return Vec4.create(wx, wy, wz, ww)
}