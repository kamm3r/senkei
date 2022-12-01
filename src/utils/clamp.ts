import { Vec2, Vec3, Vec4 } from "../types";

/**
 * 
 * @param {number} value current value
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number} Returns the value clamped between min and max
 */
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)
export const clamps = (value: number, min: number, max: number): number => value < min ? min : value > max ? max : value;

//Returns the value clamped between 0 and 1
export const clamp01 = (value: number): number => value < 0 ? 0 : value > 1 ? 1 : value;
export const clamp012 = (v: Vec2): Vec2 => ({ x: v.x < 0 ? 0 : v.x > 1 ? 1 : v.x, y: v.y < 0 ? 0 : v.y > 1 ? 1 : v.y })
export const clamp013 = (v: Vec3): Vec3 => ({ x: v.x < 0 ? 0 : v.x > 1 ? 1 : v.x, y: v.y < 0 ? 0 : v.y > 1 ? 1 : v.y, z: v.z < 0 ? 0 : v.z > 1 ? 1 : v.z })
export const clamp014 = (v: Vec4): Vec4 => ({ x: v.x < 0 ? 0 : v.x > 1 ? 1 : v.x, y: v.y < 0 ? 0 : v.y > 1 ? 1 : v.y, z: v.z < 0 ? 0 : v.z > 1 ? 1 : v.z, w: v.w < 0 ? 0 : v.w > 1 ? 1 : v.w })
// Clamps the value between -1 and 1
export const clampNeg1to1 = (value: number): number => value < -1 ? -1 : value > 1 ? 1 : value;
export const clampNeg1to12 = (v: Vec2): Vec2 => ({ x: v.x < -1 ? -1 : v.x > 1 ? 1 : v.x, y: v.y < -1 ? -1 : v.y > 1 ? 1 : v.y })
export const clampNeg1to13 = (v: Vec3): Vec3 => ({ x: v.x < -1 ? -1 : v.x > 1 ? 1 : v.x, y: v.y < -1 ? -1 : v.y > 1 ? 1 : v.y, z: v.z < -1 ? -1 : v.z > 1 ? 1 : v.z })
export const clampNeg1to14 = (v: Vec4): Vec4 => ({ x: v.x < -1 ? -1 : v.x > 1 ? 1 : v.x, y: v.y < -1 ? -1 : v.y > 1 ? 1 : v.y, z: v.z < -1 ? -1 : v.z > 1 ? 1 : v.z, w: v.w < -1 ? -1 : v.w > 1 ? 1 : v.w })