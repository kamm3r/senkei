import { Quat } from "../types";
import { normalized, Vec2 } from "../vec2";
import { clamp01 } from "./clamp";
import { PI, TAU } from "./constants";
import { inverseLerpClamped } from "./interpolation";
import { Repeat } from "./rangeRepeat";

export const angToDir = (aRad: number): Vec2 => ({ x: Math.cos(aRad), y: Math.sin(aRad) })
export const dirToAng = (v: Vec2): number => Math.atan2(v.y, v.x)
export const DirToOrientation = (v: Vec2): Quat => {
    v = normalized(v)
    v.x += 1
    v = normalized(v)
    return { x: 0, y: 0, z: v.y, w: v.x }
}

export const lerpAngle = (a: number, b: number, t: number): number => {
    let delta = Repeat((b - a), TAU)
    if (delta > Math.PI) delta -= TAU
    return a + delta * clamp01(t)
}
export const inverseLerpAngle = (a: number, b: number, v: number): number => {
    const angBetween = deltaAngle(b, a)
    b = a + angBetween
    const h = a + angBetween * 0.5
    v = h + deltaAngle(h, v)
    return inverseLerpClamped(a, b, v)
}
// Calculates the shortest difference between two given angles.
export const deltaAngle = (a: number, b: number): number => Repeat((b - a + PI), TAU) - PI
