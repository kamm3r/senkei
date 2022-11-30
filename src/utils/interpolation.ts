import { Vec2, Vec3, Vec4 } from "../types";
import { clamp01 } from "./clamp";
import { smooth01 } from "./smoothingEasing";

export const lerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;
export const lerp2 = (a: Vec2, b: Vec2, t: Vec2): Vec2 => ({ x: lerp(a.x, b.x, t.x), y: lerp(a.y, b.y, t.y) });
export const lerp3 = (a: Vec3, b: Vec3, t: Vec3): Vec3 => ({ x: lerp(a.x, b.x, t.x), y: lerp(a.y, b.y, t.y), z: lerp(a.z, b.z, t.z) });
export const lerp4 = (a: Vec4, b: Vec4, t: Vec4): Vec4 => ({ x: lerp(a.x, b.x, t.x), y: lerp(a.y, b.y, t.y), z: lerp(a.z, b.z, t.z), w: lerp(a.w, b.w, t.w) });
export const lerpClamped = (a: number, b: number, t: number): number => lerp(a, b, clamp01(t));
export const lerpSmooth = (a: number, b: number, t: number): number => lerp(a, b, smooth01(t));
export const inverseLerp = (a: number, b: number, value: number): number => (value - a) / (b - a);
export const inverseLerpSafe = (a: number, b: number, value: number): number => {
    const den = b - a
    if (den === 0) 0
    return (value - a) / den
};
export const inverseLerp2 = (a: Vec2, b: Vec2, t: Vec2): Vec2 => ({ x: lerp(a.x, b.x, t.x), y: lerp(a.y, b.y, t.y) });
export const inverseLerp3 = (a: Vec3, b: Vec3, t: Vec3): Vec3 => ({ x: lerp(a.x, b.x, t.x), y: lerp(a.y, b.y, t.y), z: lerp(a.z, b.z, t.z) })
export const inverseLerp4 = (a: Vec4, b: Vec4, t: Vec4): Vec4 => ({ x: lerp(a.x, b.x, t.x), y: lerp(a.y, b.y, t.y), z: lerp(a.z, b.z, t.z), w: lerp(a.w, b.w, t.w) });
export const inverseLerpClamped = (a: number, b: number, value: number): number => clamp01((value - a) / (b - a));
export const inverseLerpSmooth = (a: number, b: number, value: number): number => smooth01(clamp01((value - a) / (b - a)))

// export const Eerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;