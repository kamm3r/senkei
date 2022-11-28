import { Vec2 } from "../vec2";
import { Vec3 } from "../vec3";
import { Vec4 } from "../vec4";
import { Abs } from "./abs";
import { clamp } from "./clamp";
import { Floor } from "./signRounding";

export const Frac = (x: number): number => x - Floor(x)
export const Frac2 = (v: Vec2): Vec2 => ({ x: v.x - Floor(v.x), y: v.y - Floor(v.y) })
export const Frac3 = (v: Vec3): Vec3 => ({ x: v.x - Floor(v.x), y: v.y - Floor(v.y), z: v.z - Floor(v.z) })
export const Frac4 = (v: Vec4): Vec4 => ({ x: v.x - Floor(v.x), y: v.y - Floor(v.y), z: v.z - Floor(v.z), w: v.w - Floor(v.w) })
export const Repeat = (value: number, length: number): number => clamp(value - Math.floor(value / length) * length, 0.0, length)
export const Mod = (value: number, length: number): number => value >= 0 ? value % length : (value % length + length) % length;
export const PingPong = (t: number, length: number): number => length - Abs(Repeat(t, length * 2) - length);
export const TriangleWave = (t: number, period = 1): number => {
    const x = t / period
    return 1 - Abs(2 * (x - Floor(x)) - 1)
}

export const Gcd = (a: number, b: number): number => {
    // special case bc we can't negate int.MinValue
    if (a == Number.MIN_VALUE || b == Number.MIN_VALUE) {
        if (a == Number.MIN_VALUE && b == Number.MIN_VALUE) Number.MIN_VALUE; // the only negative return value, bc we can't negate this number
        let v = Math.max(a, b)
        v = Math.abs(v)
        return v & -v;
    }

    if (a == b) Abs(a);
    (a, b) = (Math.abs(a), Math.abs(b));
    while (a != 0 && b != 0) {
        _ = a > b ? a %= b : b %= a;
    }
    return a | b;
}