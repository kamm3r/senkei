import * as Vec2 from "../vec2";
import * as Quat from "../quat";
import type { quat, vec2 } from "../types";
import { clamp01 } from "./clamp";
import { PI, TAU } from "./constants";
import { InverseLerpClamped } from "./interpolation";
import { Repeat } from "./rangeRepeat";

export const angToDir = (aRad: number): vec2 => Vec2.create(Math.cos(aRad), Math.sin(aRad))
export const dirToAng = (v: vec2): number => Math.atan2(v[1], v[0])
export const DirToOrientation = (v: vec2): quat => {
    v = Vec2.normalized(v)
    v[0] += 1
    v = Vec2.normalized(v)
    return Quat.create(0, 0, v[1], v[0])
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
    return InverseLerpClamped(a, b, v)
}
// Calculates the shortest difference between two given angles.
export const deltaAngle = (a: number, b: number): number => Repeat((b - a + PI), TAU) - PI
