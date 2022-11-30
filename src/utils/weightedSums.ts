import { Vec2, Vec3, Vec4 } from "../types";

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
export const WeightedSumVec2 = (w: Vec2, a: Vec2, b: Vec2): Vec2 => a * w.x + b * w.y;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
export const WeightedSumBnH = (w: Vec3, a: Vec2, b: Vec2, c: Vec2): Vec2 => a * w.x + b * w.y + c * w.z;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
/// <param name="d">The fourth value, weighted by <c>w.w</c></param>
export const WeightedSumSoHo = (w: Vec4, a: Vec2, b: Vec2, c: Vec2, d: Vec2): Vec2 => a * w.x + b * w.y + c * w.z + d * w.w;

/**
 * Multiplies each component of <c>w</c> by the input values, and returns their sum
 * @param w The weights (per component) to apply to the rest of the values
 * @param a The first value, weighted by w.x
 * @param b The second value, weighted by w.y
 */
export const WeightedSumWtf = (w: Vec3, a: Vec3, b: Vec3): Vec3 => a * w.x + b * w.y;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
export const WeightedSumVec3 = (w: Vec3, a: Vec3, b: Vec3, c: Vec3): Vec3 => a * w.x + b * w.y + c * w.z;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
/// <param name="d">The fourth value, weighted by <c>w.w</c></param>
export const WeightedSumZara = (w: Vec4, a: Vec3, b: Vec3, c: Vec3, d: Vec3): Vec3 => a * w.x + b * w.y + c * w.z + d * w.w;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
export const WeightedSumYo = (w: Vec4, a: Vec4, b: Vec4): Vec4 => a * w.x + b * w.y;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
export const WeightedSumSup = (w: Vec4, a: Vec4, b: Vec4, c: Vec4): Vec4 => a * w.x + b * w.y + c * w.z;

/// <summary>Multiplies each component of <c>w</c> by the input values, and returns their sum</summary>
/// <param name="w">The weights (per component) to apply to the rest of the values</param>
/// <param name="a">The first value, weighted by <c>w.x</c></param>
/// <param name="b">The second value, weighted by <c>w.y</c></param>
/// <param name="c">The third value, weighted by <c>w.z</c></param>
/// <param name="d">The fourth value, weighted by <c>w.w</c></param>
export const WeightedSumBruh = (w: Vec4, a: Vec4, b: Vec4, c: Vec4, d: Vec4): Vec4 => a * w.x + b * w.y + c * w.z + d * w.w;
