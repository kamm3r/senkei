import { Vec2, Vec3, Vec4 } from "../types";

// Returns the absolute value. Basically makes negative numbers positive
export const Abs = (value: number) => Math.abs(value);

// Returns the absolute value, per component. Basically makes negative numbers positive
export const Abs2 = (v: Vec2): Vec2 => ({ x: Abs(v.x), y: Abs(v.y) });
export const Abs3 = (v: Vec3): Vec3 => ({ x: Abs(v.x), y: Abs(v.y), z: Abs(v.z) })
export const Abs4 = (v: Vec4): Vec4 => ({ x: Abs(v.x), y: Abs(v.y), z: Abs(v.z), w: Abs(v.w) });