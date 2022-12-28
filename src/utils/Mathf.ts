import * as Vec3 from "../vec3";
import type { vec3 } from "../types";

// Returns the absolute value. Basically makes negative numbers positive
export const Abs = (value: number) => Math.abs(value);
/**
 * 
 * @param {number} value current value
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number} Returns the value clamped between min and max
 */
export const clamp = (value: number, min: number, max: number): number => value < min ? min : value > max ? max : value;
//Returns the value clamped between 0 and 1
export const clamp01 = (value: number): number => value < 0 ? 0 : value > 1 ? 1 : value;
// Clamps the value between -1 and 1
export const clampNeg1to1 = (value: number): number => value < -1 ? -1 : value > 1 ? 1 : value;
// export const clamps = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

export const Square = (v: number) => v * v;

export const saturate = (x: number): number => clamp(x, 0.0, 1.0)

export const smoothstep = (xMin: number, xMax: number, x: number): number => {
    const t = saturate((x - xMin) / (xMax - xMin));
    return t * t * (3.0 - (2.0 * t));
}

// export const reflect=(i:vec3, n:vec3):vec3 => i - 2 * n * dot(i, n)
export const reflects = (i: vec3, n: vec3): vec3 => Vec3.create(i[0] - 2 * n[0] * Vec3.dot(i, n), i[1] - 2 * n[1] * Vec3.dot(i, n), i[2] - 2 * n[2] * Vec3.dot(i, n))