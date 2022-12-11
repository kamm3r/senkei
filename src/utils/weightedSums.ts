import { Vec2, Vec3, Vec4 } from "../types";
import * as vec2 from "../vec2";
import * as vec3 from "../vec3";
import * as vec4 from "../vec4";

/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by <c>w.x</c>
 * @param b The second value, weighted by <c>w.y</c>
 */
export const WeightedSum2 = (w: Vec2, a: number, b: number): number => a * w.x + b * w.y;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
export const WeightedSum3 = (w: Vec3, a: number, b: number, c: number): number => a * w.x + b * w.y + c * w.z;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
/// <param name="d">The fourth value, weighted by <c>w.w</c></param>
export const WeightedSum4 = (w: Vec4, a: number, b: number, c: number, d: number) => a * w.x + b * w.y + c * w.z + d * w.w;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>		
export const WeightedSumVec2 = (w: Vec2, a: Vec2, b: Vec2): Vec2 => {
    const wx = a.x * w.x + b.x * w.y
    const wy = a.y * w.x + b.y * w.y
    return vec2.create(wx, wy)
}
// export const WeightedSumVec2 = (w: Vec2, a: Vec2, b: Vec2): Vec2 => a * w.x + b * w.y;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
export const WeightedSumBnH = (w: Vec3, a: Vec2, b: Vec2, c: Vec2): Vec2 => {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z
    const wy = a.y * w.x + b.y * w.y + c.y * w.z
    return vec2.create(wx, wy)
}
// export const WeightedSumBnH = (w: Vec3, a: Vec2, b: Vec2, c: Vec2): Vec2 => a * w.x + b * w.y + c * w.z;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
/// <param name="d">The fourth value, weighted by <c>w.w</c></param>
export const WeightedSumSoHo = (w: Vec4, a: Vec2, b: Vec2, c: Vec2, d: Vec2): Vec2 => {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z + d.x * w.w
    const wy = a.y * w.x + b.y * w.y + c.y * w.z + d.y * w.w
    return vec2.create(wx, wy)
}
// export const WeightedSumSoHo = (w: Vec4, a: Vec2, b: Vec2, c: Vec2, d: Vec2): Vec2 => a * w.x + b * w.y + c * w.z + d * w.w;

/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w.x
 * @param b The second value, weighted by w.y
 */
export const WeightedSumWtf = (w: Vec3, a: Vec3, b: Vec3): Vec3 => {
    const wx = a.x * w.x + b.x * w.y
    const wy = a.y * w.x + b.y * w.y
    const wz = a.z * w.x + b.z * w.y
    return vec3.create(wx, wy, wz)
}
// export const WeightedSumWtf = (w: Vec3, a: Vec3, b: Vec3): Vec3 => a * w.x + b * w.y;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
export const WeightedSumVec3 = (w: Vec3, a: Vec3, b: Vec3, c: Vec3): Vec3 => {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z;
    const wy = a.y * w.x + b.y * w.y + c.y * w.z;
    const wz = a.z * w.x + b.z * w.y + c.z * w.z;
    return vec3.create(wx, wy, wz)
}
// export const WeightedSumVec3 = (w: Vec3, a: Vec3, b: Vec3, c: Vec3): Vec3 => a * w.x + b * w.y + c * w.z;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
/// <param name="d">The fourth value, weighted by <c>w.w</c></param>
export const WeightedSumZara = (w: Vec4, a: Vec3, b: Vec3, c: Vec3, d: Vec3): Vec3 => {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z + d.x * w.w;
    const wy = a.y * w.x + b.y * w.y + c.y * w.z + d.y * w.w;
    const wz = a.z * w.x + b.z * w.y + c.z * w.z + d.z * w.w;
    return vec3.create(wx, wy, wz)
}
// export const WeightedSumZara = (w: Vec4, a: Vec3, b: Vec3, c: Vec3, d: Vec3): Vec3 => a * w.x + b * w.y + c * w.z + d * w.w;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
export const WeightedSumYo = (w: Vec4, a: Vec4, b: Vec4): Vec4 => {
    const wx = a.x * w.x + b.x * w.y
    const wy = a.y * w.x + b.y * w.y
    const wz = a.z * w.x + b.z * w.y
    const ww = a.w * w.x + b.w * w.y

    return vec4.create(wx, wy, wz, ww)
}
// export const WeightedSumYo = (w: Vec4, a: Vec4, b: Vec4): Vec4 => a * w.x + b * w.y;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
export const WeightedSumSup = (w: Vec4, a: Vec4, b: Vec4, c: Vec4): Vec4 => {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z
    const wy = a.y * w.x + b.y * w.y + c.y * w.z
    const wz = a.z * w.x + b.z * w.y + c.z * w.z
    const ww = a.w * w.x + b.w * w.y + c.w * w.z

    return vec4.create(wx, wy, wz, ww)
}
// export const WeightedSumSup = (w: Vec4, a: Vec4, b: Vec4, c: Vec4): Vec4 => a * w.x + b * w.y + c * w.z;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
/// <param name="d">The fourth value, weighted by <c>w.w</c></param>
export const WeightedSumBruh = (w: Vec4, a: Vec4, b: Vec4, c: Vec4, d: Vec4): Vec4 => {
    const wx = a.x * w.x + b.x * w.y + c.x * w.z + d.x * w.w
    const wy = a.y * w.x + b.y * w.y + c.y * w.z + d.y * w.w
    const wz = a.z * w.x + b.z * w.y + c.z * w.z + d.z * w.w
    const ww = a.w * w.x + b.w * w.y + c.w * w.z + d.w * w.w

    return vec4.create(wx, wy, wz, ww)
}
// export const WeightedSumBruh = (w: Vec4, a: Vec4, b: Vec4, c: Vec4, d: Vec4): Vec4 => a * w.x + b * w.y + c * w.z + d * w.w;

