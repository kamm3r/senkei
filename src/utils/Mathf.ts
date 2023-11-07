import {Vec3} from "../Vec3";

// Returns the absolute value. Basically makes negative numbers positive
export const Abs = (value: number) => Math.abs(value);
/**
 *
 * @param {number} value current value
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number} Returns the value clamped between min and max
 */
export function clamp(value: number, min: number, max: number): number{
    return value < min ? min : value > max ? max : value;
}
//Returns the value clamped between 0 and 1
export function clamp01(value: number): number{
    return value < 0 ? 0 : value > 1 ? 1 : value;
}
// Clamps the value between -1 and 1
export function clampNeg1to1(value: number): number{
    return value < -1 ? -1 : value > 1 ? 1 : value;
}
// export const clamps = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

export function Square(v: number): number{
    return v * v;
}

export function saturate(x: number): number{
    return clamp(x, 0.0, 1.0)
}

export function smoothstep(xMin: number, xMax: number, x: number): number {
    const t = saturate((x - xMin) / (xMax - xMin));
    return t * t * (3.0 - (2.0 * t));
}

// export const reflect=(i:vec3, n:vec3):vec3 => i - 2 * n * dot(i, n)
export function reflects(i: Vec3, n: Vec3): Vec3 {
 return new Vec3(i.x - 2 * n.x * Vec3.Dot(i, n), i.y - 2 * n.y * Vec3.Dot(i, n), i.z - 2 * n.z * Vec3.Dot(i, n))
}
