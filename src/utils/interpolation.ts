import { clamp01 } from "./clamp";
import { smooth01 } from "./smoothingEasing";

export const Lerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;;
export const lerpClamped = (a: number, b: number, t: number): number => Lerp(a, b, clamp01(t));
export const lerpSmooth = (a: number, b: number, t: number): number => Lerp(a, b, smooth01(t));
export const inverseLerp = (a: number, b: number, value: number): number => (value - a) / (b - a);
export const inverseLerpSafe = (a: number, b: number, value: number): number => {
    const den = b - a
    if (den === 0) 0
    return (value - a) / den
};
export const inverseLerpClamped = (a: number, b: number, value: number): number => clamp01((value - a) / (b - a));
export const inverseLerpSmooth = (a: number, b: number, value: number): number => smooth01(clamp01((value - a) / (b - a)))

// export const Eerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;

/**
 * Exponential interpolation, the multiplicative version of lerp, useful for values such as scaling or zooming
 * @param a The start value
 * @param b The end value
 * @param t The t-value from 0 to 1 representing position along the eerp
 * 
 */
// export const Eerp = (a: number, b: number, t: number): number => {
//     switch (t) {
//         case 0:
//             return a;
//             break;
//         case 1:
//             return b;
//             break;
//         default:
//             return Math.pow(a, 1 - t) * Math.pow(b, t)
//             break;
//     }
// }
export const Eerp = (a: number, b: number, t: number): number => t > 0 && t < 1 ? a : t > 0 ? b : Math.pow(a, 1 - t) * Math.pow(b, t)
export const InverseEerp = (a: number, b: number, v: number): number => Math.log(a / v) / Math.log(a / b);