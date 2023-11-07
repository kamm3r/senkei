import { Vec2 } from "../Vec2";
import { Vec3 } from "../Vec3";
import { Vec4 } from "../Vec4";
import { Abs } from "./abs";
import { clamp } from "./clamp";
import { Floor } from "./signRounding";

export function Frac(x: number): number {
    return x - Floor(x)
}
export function Frac2(v: Vec2): Vec2 {
    return new Vec2(v.x - Floor(v.x), v.y - Floor(v.y))
}
export function Frac3(v: Vec3): Vec3 {
    return new Vec3(v.x - Floor(v.x), v.y - Floor(v.y), v.z - Floor(v.z))
}
export function Frac4(v: Vec4): Vec4 {
    return new Vec4(v.x - Floor(v.x), v.y - Floor(v.y), v.z - Floor(v.z), v.w - Floor(v.w))
}
export function Repeat(value: number, length: number): number {
    return clamp(value - Math.floor(value / length) * length, 0.0, length)
}
export function Mod(value: number, length: number): number {
    return value >= 0 ? value % length : (value % length + length) % length;
}
export function PingPong(t: number, length: number): number {
    return length - Abs(Repeat(t, length * 2) - length);
}
export function TriangleWave(t: number, period = 1): number {
    const x = t / period
    return 1 - Abs(2 * (x - Floor(x)) - 1)
}

// export const Gcd = (a: number, b: number): number => {
//     // special case bc we can't negate int.MinValue
//     if (a == Number.MIN_VALUE || b == Number.MIN_VALUE) {
//         if (a == Number.MIN_VALUE && b == Number.MIN_VALUE) Number.MIN_VALUE; // the only negative return value, bc we can't negate this number
//         let v = Math.max(a, b)
//         v = Math.abs(v)
//         return v & -v;
//     }

//     if (a == b) Abs(a);
//     (a, b) = (Math.abs(a), Math.abs(b));
//     while (a != 0 && b != 0) {
//         _ = a > b ? a %= b : b %= a;
//     }
//     return a | b;
// }
