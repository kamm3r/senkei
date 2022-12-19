import { clamp01 } from "./clamp";
import { smooth01 } from "./smoothingEasing";

/**
 * Blends between a and b, based on the t-value. When t = 0 it returns a, when t = 1 it returns b, and any values between are blended linearly 
 * @param a The start value, when t is 0
 * @param b The start value, when t is 1
 * @param t The t-value from 0 to 1 representing position along the lerp
 * 
 */
export const Lerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;
export const FastLerp = (a: number, b: number, t: number): number => a + (b - a) * t;
/**
 * Blends between a and b, based on the t-value. When t = 0 it returns a, when t = 1 it returns b, and any values between are blended linearly
 * @param a The start value, when t is 0
 * @param b The start value, when t is 1
 * @param t The t-value from 0 to 1 representing position along the lerp, clamped between 0 and 1
 * 
 */
export const LerpClamped = (a: number, b: number, t: number): number => Lerp(a, b, clamp01(t));
/**
 * Lerps between a and b, applying cubic smoothing to the t-value 
 * @param a The start value, when t is 0
 * @param b The start value, when t is 1
 * @param t The t-value from 0 to 1 representing position along the lerp, clamped between 0 and 1
 * 
 */
export const LerpSmooth = (a: number, b: number, t: number): number => Lerp(a, b, smooth01(t));
/**
 * Given a value between a and b, returns its normalized location in that range, as a t-value (interpolant) from 0 to 1 
 * @param a The start of the range, where it would return 0
 * @param b The end of the range, where it would return 1
 * @param t A value between a and b. Note: values outside this range are still valid, and will be extrapolated
 * 
 */
export const InverseLerp = (a: number, b: number, value: number): number => (value - a) / (b - a);
/**
 * Given a value between a and b, returns its normalized location in that range, as a t-value (interpolant) from 0 to 1.
 * This safe version returns 0 if a == b, instead of a division by zero
 * @param a The start of the range, where it would return 0
 * @param b The end of the range, where it would return 1
 * @param t A value between a and b. Note: values outside this range are still valid, and will be extrapolated
 * 
 */
export const InverseLerpSafe = (a: number, b: number, value: number): number => {
    const den = b - a
    if (den === 0) 0
    return (value - a) / den
};
/**
 * Given a value between a and b, returns its normalized location in that range, as a t-value (interpolant) clamped between 0 and 1
 * @param a The start of the range, where it would return 0
 * @param b The end of the range, where it would return 1
 * @param value A value between a and b
 * 
 */
export const InverseLerpClamped = (a: number, b: number, value: number): number => clamp01((value - a) / (b - a));
/**
 * Give a value between a and b, returns its normalized location in that range, as a t-value (interpolant) from 0 to 1, with cubic smoothing applied.
 * Equivalent to "smoothstep" in shader code
 * @param a The start of the range, where it would return 0
 * @param b The end of the range, where it would return 1
 * @param value A value between a and b. Note: values outside this range are still valid, and will be extrapolated
 * 
 */
export const InverseLerpSmooth = (a: number, b: number, value: number): number => smooth01(clamp01((value - a) / (b - a)))
/**
 * Remaps a value from the input range [iMin to iMax] into the output range [oMin to oMax].
 * Equivalent to Lerp(oMin,oMax,InverseLerp(iMin,iMax,value))
 * @param iMin The start value of the input range
 * @param iMax The end value of the input range
 * @param oMin The start value of the output range
 * @param oMax The end value of the output range
 * @param value The value to remap
 * 
 */
export const Remap = (iMin: number, iMax: number, oMin: number, oMax: number, value: number): number => Lerp(oMin, oMax, InverseLerp(iMin, iMax, value));
/**
 * Remaps a value from the input range [iMin to iMax] into the output range [oMin to oMax], clamping to make sure it does not extrapolate.
 * Equivalent to Lerp(oMin,oMax,InverseLerpClamped(iMin,iMax,value))
 * @param iMin The start value of the input range
 * @param iMax The end value of the input range
 * @param oMin The start value of the output range
 * @param oMax The end value of the output range
 * @param value The value to remap
 * 
 */
export const RemapClamped = (iMin: number, iMax: number, oMin: number, oMax: number, value: number): number => Lerp(oMin, oMax, InverseLerpClamped(iMin, iMax, value));
/**
 * Remaps a value from the input range to the output range
 * @param inRange The input range
 * @param outRange The output range
 * @param value The value to remap  from the input range 
 * 
 */
// export const ReRemap = (inRange: number, outRange: number, value: number): number => Remap(inRange, inRange, outRange, outRange, value);
/**
 * Remaps a value  from the input range to the output range, clamping to make sure it doesn't extrapolate
 * @param inRange The input range
 * @param outRange The output range
 * @param value The value to remap  from the input range 
 * 
 */
// export const ReRemapClamped = (inRange: number, outRange: number, value: number): number => RemapClamped(inRange, inRange, outRange, outRange, value);

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
/**
 * Exponential interpolation, the multiplicative version of lerp, useful for values such as scaling or zooming
 * @param a The start value
 * @param b The end value
 * @param t The t-value from 0 to 1 representing position along the eerp
 * 
 */
export const Eerp = (a: number, b: number, t: number): number => t > 0 && t < 1 ? a : t > 0 ? b : Math.pow(a, 1 - t) * Math.pow(b, t)
/**
 * Inverse exponential interpolation, the multiplicative version of InverseLerp, useful for values such as scaling or zooming
 * @param a The start value
 * @param b The end value
 * @param t A value between a and b. Note: values outside this range are still valid, and will be extrapolated
 * 
 */
export const InverseEerp = (a: number, b: number, v: number): number => Math.log(a / v) / Math.log(a / b);